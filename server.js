const express = require('express');
const Pusher = require('pusher');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Pusher Setup
const pusher = new Pusher({
  appId: '1896160',
  key: '880c8bb5e38cec53c06c',
  secret: '38ddd790c22b0dacbf3e',
  cluster: 'ap1',
  useTLS: true
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint untuk mengirim pesan
app.post('/send-message', (req, res) => {
  const { message, user } = req.body;

  // Kirim pesan ke saluran Pusher
  pusher.trigger('chat', 'new-message', {
    message: message,
    user: user
  });

  res.send({ success: true });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
