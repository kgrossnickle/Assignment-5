//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb://kg:russell@ds127994.mlab.com:27994/ufapp2', //place the URI of your mongo database here.
  }, 
  googleMaps: {
    key: 'AIzaSyB3kV3E2pP2i_1T7Sh0zIzX9VpGZK390yQ'
  },
  port: 8080
};

/* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */