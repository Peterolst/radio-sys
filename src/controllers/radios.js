import fs from 'fs';

// load the radios defined
let Radios = {}
fs.readFile('./utils/radio-data.json', 'utf8', (err, data) => {
    if (err) {
        console.log("File read failed:", err)
        return;
    }
    Radios = JSON.parse(data);
});

// Helper function to persist our Radios object
const saveRadios = () => {
	fs.writeFile('./utils/radio-data.json', JSON.stringify(Radios), err => {
		if (err) {
			console.log('Error saving Radio profiles', err)
		} else {
			console.log('Successfully saved Radio profiles')
		}
	})
}


// get and return info on all radios
exports.getRadios = async (req, res) => {
	res.json({ status: 200, error: "", response: Radios.radios});
};


exports.storeRadioProfile = async (req, res) => {
	// grab the id from the URI
	let id = req.params.id;
	// check if radio with that id already exists
	if(Radios.radios.find(radio => radio.id === id)){
		res.json({ status: 403, error: "Radio with that ID already exists"});
		return;
	}
	// create a new radio
	let newRadio = {
		"id": id,
		"alias": req.body.alias,
		"allowed_locations": req.body.allowed_locations,
	}
	// add it to our list of radios
	Radios.radios.push(newRadio);
	// persist our radios
	saveRadios();
	// respond with the 200 OK and the new radio in response body.
	res.json({ status: 200, response: newRadio});
};

exports.setLocation = async (req, res) => {
	// grab the id from the URI
	let id = req.params.id;
	// grab the location from the body
	let location = req.body.location
	// get the radio with the id. Radio is referencing the element in the Radios array
	let radio = Radios.radios.find(radio => radio.id === id);
	if(radio.allowed_locations.includes(location)){
		// set the location
		radio.location = location;
		saveRadios();
		res.json({ status: 200, response: radio});
	}
	else{
		res.json({ status: 403, error: "Location is not allowed."});
	}	
};

exports.getLocation = async (req, res) => {
    // grab the id from the URI
	let id = req.params.id;

	// get the radio with the id. Radio is referencing the element in the Radios array
	let radio = Radios.radios.find(radio => radio.id === id);
	if(radio.location){
		res.json({ status: 200, response: radio.location});
	}
	else res.json({ status: 404, response: "No location exists yet"});
};

exports.clearAllRadios = async (req, res) => {
	// Clear all radio profiles
	Radios.radios = [];
	saveRadios();
	res.json({ status: 200, response: "Cleared all radio profiles"});
};


