
  let port = process.env.PORT
  let mongoUrl = process.env.BLOGIDB_URI
  
  if (process.env.NODE_ENV === 'test') {
    port = process.env.TEST_PORT
    mongoUrl = process.env.TEST_BLOGIDB_URI
  }
  
  module.exports = {
    mongoUrl,
    port
  }