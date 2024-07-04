var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var multer = require('multer')
require('dotenv').config()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
})
  .post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    const file = req.file
    const finalSend = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    }
    res.json(finalSend)
  })
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
