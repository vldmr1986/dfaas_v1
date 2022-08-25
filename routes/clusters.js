var express = require('express');
const db = require("../db");
var router = express.Router();

/* GET clusters listing. */
router.get('/', async(req, res) => {
  const {customerid} = req.query;
  if (!customerid) {
    res.send([]);
    return;
  }
  try {
    const result = await db.pool.query("select clusterid,clustername,endpoints,clustersize,vpcid,subnetid,zone,targetcloud from clusters where customerid=? LIMIT 10 ROWS EXAMINED 10000;", [customerid]);
    res.send(result || []);
  } catch (err) {
    throw err;
  }
});

router.post('/create', async(req, res) => {
  const {zone = "", targetcloud="", clustername, customerid, endpoints="", clustersize=0, vpcid="", subnetid="", accesskey= "", secretkey = ""} = req.body;
  if (!customerid || !clustername) {
    res.send({
      status: "ERROR"
    });
  }
  try {
    const values = [Number(customerid), clustername, endpoints, Number(clustersize), vpcid, subnetid, accesskey, secretkey, zone, targetcloud];
    const result = await db.pool.query("INSERT INTO clusters(customerid, clustername, endpoints, clustersize, vpcid, subnetid, accesskey, secretkey, zone, targetcloud) values (?,?,?,?,?,?,?,?,?,?)", values);
    console.log("11111112 res", result);
    const dbResult = result && result[0];
    const responseToUser = dbResult || {status: "OK"}

    res.send(responseToUser);
  } catch (err) {
    res.send({
      status: "ERROR"
    });
    throw err;
  }
});

router.delete("/delete", async(req, res)=>{
  const  {customerid, clusterid} = req.body;
  if (!customerid || !clusterid) {
    res.send({
      status: "ERROR",
      message: "No customerid|clusterid provided"
    });
  }
  const values = [customerid, clusterid];
   const result = await db.pool.query("DELETE FROM clusters WHERE customerid=? and clusterid=?;", values);

   if (result) {
     res.send({
       status: "OK"
     });
   }

})

module.exports = router;
