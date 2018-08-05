const express = require('express');
const axios = require('axios');
const app = express();
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
