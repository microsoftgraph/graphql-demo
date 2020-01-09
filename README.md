# [ARCHIVED] GraphQL for Microsoft Graph (DEMO)

**Note:** This repo is archived and no longer actively maintained. Security vulnerabilities may exist in the project, or its dependencies. If you plan to reuse or run any code from this repo, be sure to perform appropriate security checks on the code or dependencies first.

## Call to action
We are looking for feedback from developers interested in integrating with Microsoft Graph via GraphQL. To share your thoughts and scenarios, please leave a comment on [UserVoice](https://officespdev.uservoice.com/forums/224641-feature-requests-and-feedback/suggestions/16819672-graphql-api-for-the-microsoft-graph). 

## About
This is a *demo* that enables basic, read-only querying of the [Microsoft Graph API](https://developer.microsoft.com/en-us/graph/) using [GraphQL query syntax](http://graphql.org/learn/queries/). GraphQL enables clients to request exactly the resources and properties that they need instead of making REST requests for each resource and consolidating the responses. To create a GraphQL service, this demo translates the [Microsoft Graph OData $metadata document](https://graph.microsoft.com/v1.0/$metadata) to a GraphQL schema and generates the necessary resolvers. Please note we are providing this demo code for evaluation as-is. 

![Animation of sample request](./graphql-demo.gif)

## Live demo
[Try the Microsoft Graph GraphQL Demo here](https://graphql-demo.azurewebsites.net/)

## Installation
1. Clone the repo
2. Install dependencies (`npm install`)
3. Generate schema description and resolver code using `npm run build`
4. Navigate to the [App Registration Portal](https://apps.dev.microsoft.com/), set up a [new web app](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-app-registration)
5. Configure App Id and redirect URIs in the AppConfiguration of build/index.html
6. Run `npm start` and go to `localhost:1337`

## Sample requests
#### Fetch recent emails

```graphql

{
  me {
    displayName
    officeLocation
    skills
    messages {
      subject
      isRead
      from {
        emailAddress {
          address
        }
      }
    }
  }
}
```


#### Fetch groups and members
```graphql
{
  groups {
    displayName
    description
    members {
      id
    }
  }
}
```

#### Fetch files from OneDrive
```graphql
{
  me {
    drives {
      quota {
        used
        remaining
      }
      root {
        children {
          name
          size
          lastModifiedDateTime
          webUrl
        }
      }
    }
  }
}
```

## How it works
* src/setup.js reads in a well-formed $metadata CSDL, parses it and builds up a GraphQL schema
* src/setup.js code generates resolvers that naively issues requests to the Graph service when the previous (parent) resolver doesn't have the data at hand

## Limitations/to-dos
* [x] Translate OData inheritance relationships
* [x] Enable passing arguments (id for indexing into collections)
* [ ] Support pagination
* [ ] Implement mutations
* [ ] Enable passing arguments for sort, filter
* [ ] Add heuristics for $expand to reduce number of service calls made

## Code of conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Copyright
 Copyright (c) 2017 Microsoft Corporation.
