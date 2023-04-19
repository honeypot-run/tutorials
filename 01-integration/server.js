const express = require('express');
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the index.html file when the root route is requested
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});