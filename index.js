const debug = require('debug')('yeps:method:override');

const methods = require('methods');

const methodExists = method => methods.includes(method.toLowerCase());

module.exports = () => async (context) => {
  debug('Method override');

  let { method } = context.req;

  debug('Original method: %s', method);

  // wrapper
  if (
    context.req.body
    && context.req.body._method
    && methodExists(context.req.body._method)
  ) {
    method = context.req.body._method.toUpperCase();
  }

  // body parser
  if (
    context.request
    && context.request.body
    && context.request.body._method
    && methodExists(context.request.body._method)
  ) {
    method = context.request.body._method.toUpperCase();
  }

  // header support
  const header = context.req.headers['x-http-method-override'];

  if (header && methodExists(header)) {
    method = header.toUpperCase();
  }

  context.req.method = method;

  debug('New method: %s', method);
};
