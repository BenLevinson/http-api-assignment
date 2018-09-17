const respondJSON = (request, response, status, object, acceptedTypes) => {
  console.dir(acceptedTypes);
  if(acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${object.message}</message>`;
    responseXML = `${responseXML} <id>${object.id}</id>`;
    responseXML = `${responseXML} </response>`;
    response.writeHead(status, {'Content-Type': acceptedTypes[0]});
    response.write(responseXML);
    response.end();
  } else {
    response.writeHead(status, {'Content-Type': acceptedTypes[0]});
    response.write(JSON.stringify(object));
    response.end();
  }
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'Success',
  }

  //200 success status code
  respondJSON(request, response, 200, responseJSON, acceptedTypes);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'Successful Request',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    //400 bad request error
    return respondJSON(request, response, 400, responseJSON, acceptedTypes);
  }

  return respondJSON(request, response, 200, responseJSON, acceptedTypes);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'Authorized',
  };
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'Unauthorized';
    //401 unauthorized access error
    return respondJSON(request, response, 401, responseJSON, acceptedTypes);
  }
  return respondJSON(request, response, 200, responseJSON, acceptedTypes);
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have permission to access this content.',
    id: 'Forbidden',
  };

  //403 access forbidden error
  respondJSON(request, response, 403, responseJSON, acceptedTypes);
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  //404 page not found error
  respondJSON(request, response, 404, responseJSON, acceptedTypes);
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error :-( Something went wrong.',
    id: 'Internal',
  };

  //500 internal server error
  respondJSON(request, response, 500, responseJSON, acceptedTypes);
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  //501 not implemented error
  respondJSON(request, response, 501, responseJSON, acceptedTypes);
};


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internal,
  notImplemented,
};
