const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.post('/', async (req, res) => {
  let {username, password} = req.body;
  try {
    const result = await db.pool.query("select * from auth where username=? and password=?", [username, password]);
    const dbResult = result && result[0];
    const responseToUser = dbResult
        ? {
            isAuth: true,
            customerid: dbResult.customerid,
            customername: dbResult.customername || dbResult.clustername,// DB rename to customername
            username: dbResult.username
          }
        : {isAuth: false}
    res.send(responseToUser);
  } catch (err) {
    throw err;
  }
});

module.exports = router;
