const express = require('express');
const axios = require('axios');
const mysql = require('mysql');
const fs = require('fs');
const app = express();

var connection = mysql.createConnection({
	host: 'phototaggingdatabase.cxtufkjuvqzf.ap-southeast-2.rds.amazonaws.com',
	user: 'JBAkroyd',
	password: 'Jorcob021',
	ssl: {
		ca: fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem')
	}
});

if (process.env.NODE_ENV == 'production') {
	//Express will server up production assets
	// like main.js or main.css
	app.use(express.static('client/build'));
	//Express will serve up index.html if doesnt recongize route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

connection.connect(function(err){
	if(err){
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id' + connection.threadId);
});

 /*axios.get('http://hotsapi.net/api/v1/heroes')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  }); */
const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);
