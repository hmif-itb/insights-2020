exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World! Secret is " + (process.env.GEN_SECRET || 'hmif-itb'),
  });
};
