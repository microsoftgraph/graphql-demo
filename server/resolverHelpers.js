const request = require('request-promise');

const { graphRoot }  = require('./constants');

function makeRequest(path, authorization, isSecondary) {
  var options = {
      url: path,
      headers: {
          'Authorization': 'bearer ' + authorization
      }
  };
  return request(options).then(function (requestBody, error) {
      if (!error) {
          let body = JSON.parse(requestBody);
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
              body['__path'] = path;
              body['__session'] = authorization;
              if (isSecondary) {
                  body['__secondary'] = true;
              }
              return body;
          }
      } else {
          console.log(error);
          return 'error';
      }
  });
}

function graphqlResolve(obj, name) {
  return parseOrRequest(obj, name).then(response => {
    if (Object.keys(response).includes('value')) {
      var next = response['value'];
      if (Array.isArray(next)) {
        next.map(value => value['__path'] = path);
      }
      return next;
    } else if (Object.keys(response).includes('__secondary') || Array.isArray(response)) {
      return response;
    } else {
      return response[name];
    }
  });
}
function parseOrRequest(obj, currentProperty) {
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
    let resp = makeRequest(nextPath, auth, true);
    return resp;
  }
}

module.exports = {
  graphqlResolve,
  parseOrRequest,
  graphRoot,
  makeRequest
}