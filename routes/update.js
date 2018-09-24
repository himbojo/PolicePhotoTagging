var pool = require('./database');

module.exports = app => {
	app.post("/tag/update", async (req, res) => {
		console.log("/tag/update");
		try {
			var point = 'POINT(' + req.body.location + ')';
			var body = [req.body.qid, req.body.eventNumber, req.body.dateTime, point, req.body.offence, req.body.iu];
			console.log(body);
			var tags = req.body.tags;

			var insertImage = await pool.query('INSERT INTO Images (qid, event_number, _datetime, location, offence, image_name) VALUES(?, ?, ?, ST_PointFromText(?), ?, ?)', body);
			var imageId = insertImage.insertId;

			console.log("Image ID: " + imageId);
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
				console.log("Colour ID: " + selectColour);

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
				console.log("Item ID: " + selectItem);

				//link id's
				var insertLink = await pool.query('INSERT INTO Link (imageID, itemID, colourID) VALUES(?, ?, ?)', [imageId, selectItem, selectColour]);

			}

		} catch (e) {
			throw new Error(e);
		}

	});
};

// module.exports = app => {
// 	app.post("/tag/update", async (req, res) => {
// 		connection.connect();
// 	  console.log("/tag/update");
// 	  var tags = req.body.tags;
// 	  var image = req.body.iu;
// 	  console.log(tags);
//
// 	  for (var i = 0; i < tags.length; i++) {
// 	    var tag1 = tags[i].text.split(" ");
// 	    var item = tag1[0];
// 	    var colour = tag1[1];
// 			console.log(item + " " + colour);
// 	    Tag.findOneAndUpdate(
// 	      { type: item, "colour.name": colour },
// 	      {
// 	        $addToSet: {
// 	          "colour.$.imageName": image
// 	        }
// 	      },
// 	      function(err, doc) {}
// 	    );
// 	  }
// 	});
// };
