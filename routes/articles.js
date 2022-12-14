const { request } = require('undici');
const config = require('config');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const host = config.get('DB.host');
const user = config.get('DB.user');
const pw = config.get('DB.password');
const db = config.get('DB.database');

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: pw,
  database: db,
});

connection.connect((err) => {
  // TODO: Errorハンドルをちゃんと書く。
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM blogs', (err, result) => {
    console.log(result);
  });
  res.json({ greet: 'hello article' });
});

router.get('/:titleId?', async (req, res) => {
  const baseURL = req.baseUrl;
  console.log('here');

  const { statusCode, headers, trailers, body } = await request(`${fqdn}/${path}/${req.params.titleId}`).catch(
    async (err) => {
      // TODO: err処理
      console.log(err);
    }
  );
  const article = await body.json();

  if (statusCode >= 400) {
    console.log(`catch ${statusCode} code`);
    return res.redirect(302, baseURL);
  }

  res.json({ title: `${article.title}` });
});

module.exports = router;
