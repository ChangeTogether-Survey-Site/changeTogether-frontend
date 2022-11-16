module.exports = 
{
    //"URI": "mongodb://localhost/book_store"
    "URI": "mongodb+srv://changetogether-survey-site:btbmbTcRUu99FByT@cluster0.qpmlaui.mongodb.net/survey?retryWrites=true&w=majority",
    "Secret": 'SomeSecret'
}



/**
 * @author: I. Alejandro Acevedo
 * @studentID: 301222234
 * @course: COMP229-F2022
 * @description: A portfolio website project
 * @filename: db.js
 * @utility: database
 */


// temporarily gets credentials from local file (not commited/temporary)

// try to open file with credentials or read from environment variables

let usr;
let pwd

try {
  // local file with credentials
  let json = require('./secrets.json');
  usr = json['user']; 
  pwd = json['password'];
  console.log('local environment');
}
catch (err) {
  // environment variables cloud
  usr = process.env.USER;
  pwd = process.env.PASSWORD;
  console.log('prod environment');
}


module.exports = {
  //local MongoDB deployment ->
  // URI: "mongodb://127.0.0.1/faculty_info",
  URI: `mongodb+srv://${usr}:${pwd}@cluster0.qpmlaui.mongodb.net/survey?retryWrites=true&w=majority`
  
};
