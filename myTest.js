let express = require('express');
let port = process.env.PORT || 3000;
let app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/login page.html');
});

app.listen(port, () => {
	console.log('App listening on port %d!', port);
});
