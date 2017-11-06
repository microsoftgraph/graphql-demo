/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

const _ = require('lodash');
const fs = require('fs');
const acorn = require('acorn');
const astring = require('astring');
const request = require('request');
const xmlConverter = require('xml-js');

const { graphNameSpace, graphRoot }  = require('./constants');

const primitiveTypeMapping = {
        'Edm.Binary' : 'String',
        'Edm.Stream' : 'String',
        'Edm.String' : 'String',
        'Edm.Int16' : 'Int',
        'Edm.Byte' : 'Int',
        'Edm.Int32' : 'Int',
        'Edm.Int64' : 'String',
        'Edm.Double' : 'Float',
        'Edm.Boolean' : 'Boolean',
        'Edm.Guid': 'String',
        'Edm.DateTimeOffset': 'String',
        'Edm.Date': 'String',
        'Edm.Duration': 'String',
        'Edm.TimeOfDay': 'String',
        'Edm.Single': 'Float'
};

const additionalScalarTypes = ['\nscalar Date', '\nscalar DateTimeOffset'];

fetchMetadata();

function fetchMetadata(){
    request(graphRoot+'/$metadata', function (error, response, body) {
        if (!error){
            parseMetadata(body);
        }
    });
}

function parseMetadata(metadata){
    let result = xmlConverter.xml2json(metadata, {compact: true, spaces: 4});
    let json = JSON.parse(result);
    let schema = json['edmx:Edmx']['edmx:DataServices']['Schema'];
    let enums = parseEnums(schema['EnumType']); //mapping from name to definition (node -> def)
    let complexResponse =  parseTypes(schema['ComplexType'], false); //mapping from name to schema (node -> set of properties)
    let entityResponse = parseTypes(schema['EntityType'], true);
    let complexTypes = complexResponse['complexMapping'];
    let complexDependence = complexResponse['complexDependence'];
    let entities = entityResponse['entityMapping']
    let entityDependence = entityResponse['entityDependence'];
    let entityContainer = schema['EntityContainer'];
    let entityAnnotations = entityResponse['entityAnnotation'];
    let complexAnnotations = complexResponse['complexAnnotation'];
    let entitySets = parseEntitySets(entityContainer['EntitySet']); //mapping from name to type of root level entity set 
    let singletons = parseSingletons(entityContainer['Singleton']); //mapping from name to type of root level singletons
    let dependence = _.merge(complexDependence, entityDependence);
    let annotations = _.merge(complexAnnotations, entityAnnotations);
    generator(dependence, entities, complexTypes, enums, entitySets, singletons, annotations);
}

function parseEnums(enums){
    let enumMapping = {}; 
    for (let graphEnum of enums) {
        let name = graphEnum['_attributes']['Name'];
        let defs = graphEnum['Member']
        let mapping = {};
        for (let def of defs){
            let name = def['_attributes']['Name'];
            let value = def['_attributes']['Value'];
            mapping[name] = value;
        }
        enumMapping[name] = mapping;
    }
    return enumMapping;
}

function parseTypes(types, hasIdentity){
    let typeDependence = {}; //key is child type
    let typeMapping = {};
    let typeAnnotationMapping = {};
    for (let type of types){
        let name = type['_attributes']['Name'];
        let baseType = type['_attributes']['BaseType'];
        let properties = type['Property'];
        let navigationProperties = type['NavigationProperty'];
        if (baseType != null){
            typeDependence[name] = convertTypeToGQL(false, baseType);
        }
        let mapping = {};
        let annotationMapping = {};
        if (properties != null && properties.length > 0){
            for (let property of properties){
                let name = property['_attributes']['Name'];
                let dataType = property['_attributes']['Type'];
                mapping[name] = dataType;
                let annotation = null;
                if (property['Annotation']){
                    annotation = property['Annotation']['_attributes']['String'];
                }
                annotationMapping[name] = annotation;
            }
        } else if (properties != null){
            let name = properties['_attributes']['Name'];
            let dataType = properties['_attributes']['Type'];
            mapping[name] = dataType;
            let annotation = null;
                if (properties['Annotation']){
                    annotation = properties['Annotation']['_attributes']['String'];
                }
            annotationMapping[name] = annotation;
        } else {
            mapping['extension'] = 'String'
        }
        if (navigationProperties != null && navigationProperties.length > 0){
            for (let navigationProperty of navigationProperties){
                let name = navigationProperty['_attributes']['Name'];
                let dataType = navigationProperty['_attributes']['Type'];
                mapping[name] = dataType;
                let annotation = null;
                if (navigationProperty['Annotation']){
                    annotation = navigationProperty['Annotation']['_attributes']['String'];
                }
                annotationMapping[name] = annotation;
            }
        }
        if (hasIdentity){
            mapping['id'] = 'ID'; 
        }
        typeAnnotationMapping[name] = annotationMapping;
        typeMapping[name] = mapping;
    }
    if (hasIdentity){
        return {
                "entityMapping": typeMapping,
                "entityDependence": typeDependence,
                "entityAnnotation": typeAnnotationMapping
        };
    } else {
        return {
                "complexMapping": typeMapping,
                "complexDependence": typeDependence,
                "complexAnnotation": typeAnnotationMapping
        };
    }
}

function parseEntitySets(entitySets){
    let entitySetMapping = {};
    for (let entitySet of entitySets){
        let name = entitySet['_attributes']['Name'];
        let type = entitySet['_attributes']['EntityType'];
        entitySetMapping[name] = type;
    }
    return entitySetMapping;
}

function parseSingletons(singletons){
    let singletonMapping = {};
    for (let singleton of singletons){
        let name = singleton['_attributes']['Name'];
        let type = singleton['_attributes']['Type'];
        singletonMapping[name] = type;
    }
    return singletonMapping;
}

function generator(dependence, entities, complexTypes, enums, entitySets, singletons, annotations){
    enumDefs = generateEnumDefs(enums);
    entityDefs = generateTypeDefs(dependence, entities, annotations);
    complexDefs = generateTypeDefs(dependence, complexTypes, annotations);
    queryDefs = generateQueryDefs(entitySets, singletons);
    let defs = _.union(enumDefs, entityDefs);
    defs = _.union(defs, complexDefs);
    defs = _.union(defs, queryDefs);
    defs = _.union(defs, additionalScalarTypes);
    saveCodeToFile('src/build/schema.graphql', false, defs.join(' '));
    const resolverStr = generateResolverStr(dependence, entitySets, singletons, entities, complexTypes);
    saveCodeToFile('src/build/schema.js', true, resolverStr);
}

function saveCodeToFile(filename, format, code) {
    if (format) {
        let ast = acorn.parse(code, { ecmaVersion: 6 });
        code = astring.generate(ast);    
    }

    fs.writeFile(filename, code, (err) => {
        if (err) throw err;
        console.log(`Saved code to ${filename}`);
    });    
}

function generateQueryDefs(entitySets, singletons){
    entitySets = typeAdjustments(entitySets, true, {}, {}, null);
    singletons = typeAdjustments(singletons, false, {}, {}, null);
    let entitySetSubDefinitions = Object.keys(entitySets).map((key)=>' '+key+'(id: ID): '+entitySets[key]+' ');
    let singletonSubDefinitions = Object.keys(singletons).map((key)=>' '+key+': '+singletons[key]+' ');
    let subDefs = entitySetSubDefinitions.concat(singletonSubDefinitions);
    let queryStr = '\ntype Query {\n'+subDefs.join('\n')+'\n}'
    return [queryStr];
}

function generateEnumDefs(enums){
    let defs = [];
    for (let graphEnumName of Object.keys(enums)){
        let graphEnum = enums[graphEnumName];
        let keyNames = Object.keys(graphEnum); 
        let enumStr = '\nenum '+graphEnumName+' {\n'+keyNames.map((key)=>' '+key+' ').join('\n')+'\n}'
        defs.push(enumStr);
    }
    return defs;
}

function generateTypeDefs(dependence, types, annotations){
    let defs = [];
    for (let typeName of Object.keys(types)){
        let type = types[typeName];
        let adjustedTypes = typeAdjustments(type, false, types, dependence, typeName);
        let subDefinitions = Object.keys(adjustedTypes).map((key)=>{
            let name = key;
            let value = adjustedTypes[key];
            let isCollection = value.includes('[') && value.includes(']');
            let isEntityCollection = isCollection && checkIfEntity(value.replace('[', '').replace(']', ''), types, dependence);
            if (isEntityCollection){
                name = name + "(id: ID)"
            }
            if (annotations[typeName] && annotations[typeName][key]){
                return '#'+annotations[typeName][key]+'\n '+name+': '+value+''
            } else {
                return ' '+name+': '+value+''
        }});
        let typeStr = '\ntype ' + typeName+' {\n'+subDefinitions.join('\n')+'\n} '
        defs.push(typeStr);
    }
    return defs;
}

function typeAdjustments(obj, implicitCollection, typeMapping, dependence, name){
    let mapping = {};
    if (obj != null && typeof Object.keys(obj) !== 'undefined'){
        for (let propertyName of Object.keys(obj)){
            let propertyValue = obj[propertyName];
            mapping[propertyName] = convertTypeToGQL(implicitCollection, propertyValue);
        }
    }
    if (Object.keys(dependence).length > 0){
        let currentDependency = dependence[name];
        while (currentDependency != null){
            let typeDef = typeMapping[currentDependency];
            for (let propertyName of Object.keys(typeDef)){
                let propertyValue = typeDef[propertyName];
                mapping[propertyName] = convertTypeToGQL(implicitCollection, propertyValue);
            }
            currentDependency = dependence[currentDependency];
        }
    } 
    return mapping;
}

function checkIfEntity(name, typeMapping, dependence){
    if (Object.keys(dependence).length > 0){
        let currentDependency = dependence[name];
        while (currentDependency != null){
            let typeDef = typeMapping[currentDependency];
            if (typeDef != null){
                if (Object.keys(typeDef).includes('id')){
                    return true;
                }
                currentDependency = dependence[currentDependency];
            } else {
                break;
            }
        }
    } 
    return false;
}

function convertTypeToGQL(implicitCollection, propertyValue){
    let collection = implicitCollection;
    if (propertyValue.includes('Collection')){
        propertyValue = propertyValue
                .replace('Collection', '')
                .replace('(', '')
                .replace(')', '');
            
        collection = true;
    } 
    if (Object.keys(primitiveTypeMapping).includes(propertyValue)){
        propertyValue = propertyValue.replace(propertyValue, primitiveTypeMapping[propertyValue]);
    }
    if (propertyValue.includes(graphNameSpace)){
        propertyValue = propertyValue.replace(graphNameSpace, '');
    }
    if (collection){
        propertyValue = '['+propertyValue+']';
    }
    return propertyValue
}

function generateResolverStr(dependence, entitySets, singletons, entities, complexTypes) {
    queryDefResolvers = generateQueryDefResolvers(entitySets, singletons);
    typeDefResolvers = generateTypeDefResolvers(dependence, entities, complexTypes);
    resolvers = _.union(queryDefResolvers, typeDefResolvers);
    return `
        const { graphqlResolve, parseOrRequest, makeRequest, graphRoot } = require('../resolverHelpers');
        const resolvers = {
             ${resolvers.join(',')}
        };
        module.exports = {
            resolvers
        }
    `;
}

function generateQueryDefResolvers(entitySets, singletons){
    entitySets = typeAdjustments(entitySets, true, {}, {}, null);
    singletons = typeAdjustments(singletons, false, {}, {}, null);
    let defs = _.merge(entitySets, singletons);
    let subDefinitions = Object.keys(defs).map((key)=>
    ` ${key} (obj, args, context){ 
        const name = \'${key}\';
        const requestUrl = graphRoot + "/" + name;
        return makeRequest(requestUrl, obj['__session'], args, false);
    }`);
    let queryStr = `\nQuery: {\n ${subDefinitions.join(',\n')} \n }`;
    return [queryStr];
}

function generateTypeDefResolvers(dependence, entities, complexTypes){
    let defs = [];
    generateTypeDefResolversHelper(entities, dependence, defs);
    generateTypeDefResolversHelper(complexTypes, dependence, defs);
    return defs;
}

function generateTypeDefResolversHelper(typeCollection, dependence, defs){
    for (let typeName of Object.keys(typeCollection)){
        let type = typeCollection[typeName];
        let adjustedTypes = typeAdjustments(type, false, typeCollection, dependence, typeName);
        let subDefinitions = Object.keys(adjustedTypes).map((key)=>
            `   ${key} (obj, args, context){
                const name = \'${key}\';
                return graphqlResolve(obj, name, args);\n  }\n`);
        let typeStr = `\n${typeName}: {\n ${subDefinitions.join(',\n')}} `;
        defs.push(typeStr);
    }
}
