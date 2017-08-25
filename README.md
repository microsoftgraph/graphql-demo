# MSGraphQL (DEMO)
## What is this?
This is a *demo* that enables basic querying of the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/) using [GraphQL query syntax](http://graphql.org/learn/queries/). GraphQL enables clients to request exactly the resources and properties that they need instead of making REST requests for each resource, combining and filtering the responses. This tooling makes this possible for Microsoft Graph by using OData $metadata CSDL as input and parsing for relationships. Few assumptions are made that are Graph-specific so this can likely be applied to a generic OData $metadata doc and produce reasonable output.

To get a sense, of what's possible I can query the following and get the expected result:
```graphql

{
  me {
    displayName
    directReports {
      id
    }
    events {
      subject
      start {
        dateTime
        timeZone
      }
      attendees {
        status {
          response
          time
        }
        emailAddress {
          name
        }
      }
    }
    drive {
      owner {
        user {
          id
          displayName
        }
      }
      root {
        children {
          id
          eTag
          webUrl
          size
        }
        size
      }
      driveType
      quota {
        used
      }
    }
    manager {
      id
    }
    contacts {
      displayName
    }
    calendarGroups {
      name
    }
  }
}
```

## Features
* Enables (read-only) querying MS Graph using GraphQL query syntax - get back exactly what you need
* Integrates with other GraphQL tooling
* OData inheritance is understood and implemented into the output GraphQL type definitions
* Straightforward translation from OData metadata to GraphQL schema description

## Live demo
[Try the Microsoft Graph GraphQL Demo here](https://msgraphql-demo.azurewebsites.net/)

## Installation
1. Clone the repo
2. Install dependencies (`npm install`)
3. Generate schema description and resolver code using `npm run build`
4. Navigate to the [App Registration Portal](https://apps.dev.microsoft.com/), set up a [new web app](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-app-registration)
5. Configure App Id and redirect URIs in the AppConfiguration of build/index.html
6. Run `npm start` and go to `localhost:1337`

## How it works
* src/setup.js reads in a well-formed $metadata CSDL, parses it and builds up a GraphQL schema
* src/setup.js code generates resolvers that naively issues requests to the Graph service when the previous (parent) resolver doesn't have the data at hand

## Limitations/to-dos
* Support pagination
* Implement mutations - interact with data as expected
* Enable passing arguments (like searching by name or filtering by id)
* Add heuristics for $expand to reduce number of service calls made

## Copyright
 Copyright (c) 2017 Microsoft Corporation.
