const express = require('express');
const cors = require('cors');
require('dotenv').config()
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload({
  abortOnLimit: true,
  uploadTimeout: 3000
}))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', async (req, res) => {
  // file uploading
  try {
    const file = await req.files.upfile
    res.json({
      name: file.name,
      type: file.mimetype,
      size: file.size
    })
  } catch (err) {
    res.json({
      error: 'something went wrong during upload'
    })
  }

})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
