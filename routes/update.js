var pool = require('./database');
//Upload a image and its information to the database
module.exports = app => {
	app.post("/tag/update", async (req, res) => {
		try {
			var pointD = req.body.location;
			if(!pointD){
				var pointD = "0 0";
			}
			var point = 'POINT(' + pointD + ')';
			//changes the JSON format ('$' instead of '.') for the image name back to dots
			var iuNew = req.body.iu.split("$").join(".");
			var body = [req.body.qid, req.body.eventNumber, req.body.dateTime, point, req.body.offence, iuNew];
			var tags = req.body.tags;
			//insert the image and its data into the database
			var insertImage = await pool.query('INSERT INTO Images (qid, event_number, _datetime, location, offence, image_name) VALUES(?, ?, ?, ST_PointFromText(?), ?, ?)', body);
			var imageId = insertImage.insertId;

			//upload the tags to the database
			for (var i = 0; i < tags.length; i++) {
				var tag1 = tags[i].text.split(" ");
				var item = tag1[0];
				var colour = tag1[1];
				//query to select a colour by its id
				var selectColour = await pool.query('SELECT ID FROM Colours WHERE colour = ?', [colour]);
				//if the array is empty insert and return insertId, else make select colour equal to the colour we selected
				if(!selectColour.length){
					//query to insert colour and return its id
					var insertColour = await pool.query('INSERT INTO Colours (colour) VALUES(?)', [colour]);
					selectColour = insertColour.insertId;
				}else{
					selectColour = selectColour[0].ID;
				}

				//query to select item
				var selectItem = await pool.query('SELECT ID FROM Items WHERE item = ?', [item]);
				//if the array is empty insert and return insertId, else make select colour equal to the colour we selected
				if(!selectItem.length){
					//query to insert colour and return its id
					var insertItem = await pool.query('INSERT INTO Items (item) VALUES(?)', [item]);
					selectItem = insertItem.insertId;
				}else{
					selectItem = selectItem[0].ID;
				}

				//link id's
				var insertLink = await pool.query('INSERT INTO Link (imageID, itemID, colourID) VALUES(?, ?, ?)', [imageId, selectItem, selectColour]);

			}

		} catch (e) {
			throw new Error(e);
		}

	});
};
