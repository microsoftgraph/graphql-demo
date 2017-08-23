/* 
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const request = require('request');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');

const port = process.env.port || 1337;

const { buildSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./schema');

const app = express();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.use('/graphql/', graphqlHTTP((request) => {
    let token = parseCookies(request.headers.cookie)['token'];
    return {
        schema: schema,
        rootValue: { '__session': token },
        graphiql: true
    }
}));

function parseCookies (cookies) {
    if (cookies == null){
        return;
    } else {
        let result = {};
        let cookieParts = cookies.split(';');
        for (let cookie of cookieParts) {
            let segments = cookie.split('=');
            let name = segments.shift().trim();
            let value = segments.join('=');
            result[name] = decodeURI(value);
        }
        return result;
    }
}

app.listen(port);

console.log('GraphQL API server running on port:'+ port);
