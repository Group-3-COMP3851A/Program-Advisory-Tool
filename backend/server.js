const express = require('express');
const cors = require('cors');
const app = express();

// Can be modified at a later date
const port = 3001;

// TODO: Remove the need for cors, as currently this is a potential security concern, as the ports are public :/
// Cors is enabled to bypass certain network configurations which may affect testing
app.use(cors());

app.get('/api', (req, res) => {
  // TODO: Setup/Add API framework
  // Currently only basic API calls are implemented
  res.send('Hello World!');
});

// Just confirms that the server is running :)
app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});

