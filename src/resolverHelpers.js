const request = require('request-promise');

const { graphRoot } = require('./constants');

function makeRequest(path, authorization, args, isSecondary) {
  let url = path
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
          next.map(value => value['__session'] = authorization);
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
        if (args.id != null) {
          body['__path'] = path + '/' + args.id;
          if (!Array.isArray(body)) {
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
  }).catch(function (err) {
    return {}; // return empty object 
  });
}

function graphqlResolve(obj, name, args) {
  return parseOrRequest(obj, name, args).then(response => {
    if (Object.keys(response).includes('value')) {
      var next = response['value'];
      if (Array.isArray(next)) {
        next.map(value => value['__path'] = path);
      }
      return next;
    } else if (Object.keys(response).includes('__secondary') || Array.isArray(response)) {
      if (Object.keys(response).includes('@odata.null')) {
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

module.exports = {
  graphqlResolve,
  parseOrRequest,
  graphRoot,
  makeRequest
}
