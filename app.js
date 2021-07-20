const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();

app.use(morgan('dev'));
app.use(express.json())
app.use(express.static(__dirname + '/public'));

console.log('hello world  ')

app.post('/post', function (req, res) {
  const output = write(req.body.text);
  return res.json(output);
});

app.get('/post', function (req, res) {
  return res.json(JSON.parse(fs.readFileSync('db.json', 'utf8')));
});

function write(text = null) {
  if (!text) {
    throw 'No data to write';
  }
  try {
    let data = {
      db: []
    };
    const db = fs.readFileSync('db.json', 'utf8').trim();
    if (db !== '') {
      data = JSON.parse(db);
    }

    data.db.push({
      text,
    });

    fs.writeFileSync('db.json', JSON.stringify(data));

    return JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  } catch (e) {
    console.log(e)
  }
}

app.listen(8080, function() {
  console.log('Server listening on port 8080');
});
