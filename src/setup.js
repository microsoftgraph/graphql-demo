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
const graphNameSpace = 'microsoft.graph.';
const endpoint = 'https://graph.microsoft.com/';
const version = 'v1.0';

fetchMetadata();

function fetchMetadata(){
    request('https://raw.githubusercontent.com/microsoftgraph/MSGraph-SDK-Code-Generator/master/metadata/v1.0_2017_08_04_descriptions.xml', function (error, response, body) {
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
    let complexResponse =  parseComplex(schema['ComplexType']); //mapping from name to schema (node -> set of properties)
    let entityResponse = parseEntities(schema['EntityType']);
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
    generator(dependence, entities, complexTypes, enums, entitySets, singletons, entityAnnotations, complexAnnotations);
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

function parseComplex(complex){
    let complexMapping = {};
    let complexAnnotationMapping = {};
    let complexDependence = {};
    for (let complexType of complex){
        let name = complexType['_attributes']['Name'];
        let properties = complexType['Property'];
        let baseType = complexType['_attributes']['BaseType'];
        if (baseType != null){
            complexDependence[name] = convertTypeToGQL(false, baseType);
        }
        let mapping = {};
        let annotationMapping = {};
        if (properties != null && properties.length > 0){
            for (let property of properties){
                let name = property['_attributes']['Name'];
                let type = property['_attributes']['Type'];
                mapping[name] = type;
                let annotation = null;
                if (property['Annotation']){
                    annotation = property['Annotation']['_attributes']['String'];
                }
                annotationMapping[name] = annotation;
            }
        } else if (properties != null){
            let name = properties['_attributes']['Name'];
            let type = properties['_attributes']['Type'];
            mapping[name] = type;
            let annotation = null;
                if (properties['Annotation']){
                    annotation = properties['Annotation']['_attributes']['String'];
                }
            annotationMapping[name] = annotation;
        } else {
            mapping['extension'] = 'String'
        }
        complexAnnotationMapping[name] = annotationMapping;
        complexMapping[name] = mapping;
    }
    return {"complexMapping": complexMapping,
            "complexDependence": complexDependence,
            "complexAnnotation": complexAnnotationMapping};
}

function parseEntities(entities){
    let entityDependence = {}; //key is child type
    let entityMapping = {};
    let entityAnnotationMapping = {};
    for (let entityType of entities){
        let name = entityType['_attributes']['Name'];
        let baseType = entityType['_attributes']['BaseType'];
        let properties = entityType['Property'];
        let navigationProperties = entityType['NavigationProperty'];
        if (baseType != null){
            entityDependence[name] = convertTypeToGQL(false, baseType);
        }
        let mapping = {};
        let annotationMapping = {};
        if (properties != null && properties.length > 0){
            for (let property of properties){
                let name = property['_attributes']['Name'];
                let type = property['_attributes']['Type'];
                mapping[name] = type;
                let annotation = null;
                if (property['Annotation']){
                    annotation = property['Annotation']['_attributes']['String'];
                }
                annotationMapping[name] = annotation;
            }
        }
        if (navigationProperties != null && navigationProperties.length > 0){
            for (let navigationProperty of navigationProperties){
                let name = navigationProperty['_attributes']['Name'];
                let type = navigationProperty['_attributes']['Type'];
                mapping[name] = type;
                let annotation = null;
                if (navigationProperty['Annotation']){
                    annotation = navigationProperty['Annotation']['_attributes']['String'];
                }
                annotationMapping[name] = annotation;
            }
        }
        mapping['id'] = 'ID';
        entityAnnotationMapping[name] = annotationMapping;
        entityMapping[name] = mapping;
    }
    return {"entityMapping": entityMapping,
            "entityDependence": entityDependence,
            "entityAnnotation": entityAnnotationMapping};
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

function generator(dependence, entities, complexTypes, enums, entitySets, singletons, entityAnnotations, complexaAnnotations){
    enumDefs = generateEnumDefs(enums);
    entityDefs = generateTypeDefs(dependence, entities, entityAnnotations);
    complexDefs = generateTypeDefs(dependence, complexTypes, complexaAnnotations);
    queryDefs = generateQueryDefs(entitySets, singletons);
    let defs = _.union(enumDefs, entityDefs);
    defs = _.union(defs, complexDefs);
    defs = _.union(defs, queryDefs);
    defs = _.union(defs, additionalScalarTypes);
    const helperStr = generateHelperStr();
    const schemaStr = generateSchemaStr(defs);
    const resolverStr = generateResolverStr(dependence, entitySets, singletons, entities, complexTypes);
    codeGen(helperStr, schemaStr, resolverStr);
}

function codeGen(helperStr, schemaStr, resolverStr){
    let code =  `\n ${schemaStr} \n ${resolverStr} \n ${helperStr} `;
    let ast = acorn.parse(code, { ecmaVersion: 6 });
    let stream = astring.generate(ast);

    fs.writeFile('build/schema.js', stream, (err)=> {
        if (err) throw err;
        console.log('Written to file');
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

function generateSchemaStr(defs){
    return `const typeDefs = \` ${defs.join(' ')} \`; `;
}

function generateResolverStr(dependence, entitySets, singletons, entities, complexTypes){
    queryDefResolvers = generateQueryDefResolvers(entitySets, singletons);
    typeDefResolvers = generateTypeDefResolvers(dependence, entities, complexTypes);
    resolvers = _.union(queryDefResolvers, typeDefResolvers);
    return `const resolvers = {\n ${resolvers.join(',')} \n}; `;
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

function generateHelperStr(){
    return `
    const graphRoot = \'${endpoint+version}\';
    const urlRoot = "https://proxy.apisandbox.msdn.microsoft.com/svc?url="
    const request = require('request-promise');
    module.exports = {
        typeDefs,
        resolvers
    }
    function makeRequest(path, authorization, args, isSecondary) {
        let url = urlRoot + encodeURIComponent(path);
        if (args.id != null) { 
            url = url + '/' + args.id;
        }
        var options = {
            url: url,
            headers: {
                'Authorization': 'Bearer ' + authorization
            }
        };
        return request(options).then(function (responseBody, error) {
            if (!error) {
                let body = JSON.parse(responseBody);
                if (Object.keys(body).includes('value')) {
                    var next = body['value'];
                    if (Array.isArray(next)) {
                        next.map(value => value['__path'] = path + '/' + value['id']);
                        next.map(value => value['__secondary'] = true);
                        next.map(value => value['__session'] =  authorization);
                    } else {
                        next['__path'] = path;
                        next['__secondary'] = true;
                        next['__session'] = authorization;
                    }
                    return next;
                } else {
                    body['__session'] = authorization;
                    if (isSecondary) {
                        body['__secondary'] = true;
                    }
                    if (args.id != null){
                        body['__path'] = path+'/'+args.id;
                        if (!Array.isArray(body)){
                            body = [body];                        
                        }
                    } else {
                        body['__path'] = path;
                    }
                    return body;
                }
            } else {
                console.log(error);
                return 'error';
            }
        }).catch(function(err){
		    return {}; // return empty object 
	    });
    }
    function graphqlResolve(obj, name, args){
        return parseOrRequest(obj, name, args).then(response => {
            if (Object.keys(response).includes('value')) {
                var next = response['value'];
                if (Array.isArray(next)) {
                    next.map(value => value['__path'] = path);
                }
                return next;
            } else if (Object.keys(response).includes('__secondary') || Array.isArray(response)) {
                if (Object.keys(response).includes('@odata.null')){
				    return (response['@odata.null'] == true) ? null : response;
                } else {
                    return response;
                }
            } else {
                return response[name];
            }
        });
    }

    function parseOrRequest(obj, currentProperty, args) {
        const nextPath = obj.__path + '/' + currentProperty;
        if (Object.keys(obj).includes(currentProperty)) {
            return new Promise((resolve, reject) => {
                resolve({
                    [currentProperty]: obj[currentProperty],
                    '__path': nextPath,
                    '__session': obj['__session']
                });
            });
        } else {
            let auth = obj['__session'];
            let resp = makeRequest(nextPath, auth, args, true);
            return resp;
        }
    }
    `;        
}
