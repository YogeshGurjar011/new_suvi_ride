const express= require('express');
const bodyParser=require('body-parser');
const https= require('https');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('./database/mongodb');
const customerRouter = require('./routes/customerRaoutes/customerRoutes');
const driverRouter = require('./routes/driverRoutes/driverRoutes');
const adminScreenRouter = require('./routes/adminRoutes/adminscreenRoutes');
// const customerRidesRouter = require('./routes/rideRoutes/customerRideRoutes');
const ridesRouter = require('./routes/rideRoutes/rideRoutes');
const { Certificate } = require('crypto');
const app= express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

let options = {
    key: fs.readFileSync('../ssl/privatekey.key'),
    cert: fs.readFileSync('../ssl/certificate.pem'),
   
};

let corOption ={
    origin:['http://localhost:3000','http://localhost:5000','http://localhost:7000'],
    methods:["GET","POST","PUT","DELETE","PATCH"],
  }

const net = require('net');
const apiHits = {};
let totalHits = 0;

function logAPICalls(req, res, next) {
    const now = new Date();
    const timeZone = 'Asia/Kolkata'; // set the time zone to Indian Standard Time
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone });
    const formattedDate = formatter.format(now);
    const formattedTime = now.toLocaleTimeString('en-US', { timeZone });
  
  const ipAddress = net.isIPv4(req.ip) ? req.ip : net.isIPv6(req.ip) ? '::ffff:' + req.ip : '';
  const formattedIpAddress = ipAddress.replace('::ffff:', '');
  const apiPath = req.originalUrl;

  // Initialize the hit count array for the current day
  const dateKey = now.toLocaleDateString();
  if (!apiHits[dateKey]) {
    apiHits[dateKey] = {};
  }
  // Update the hit count for the API for the current day
  if (apiHits[dateKey][apiPath]) {
    apiHits[dateKey][apiPath]++;
  } else {
    apiHits[dateKey][apiPath] = 1;
  }
  // Update the total hit count
  totalHits++;
  console.log(`API call: ${req.method} ${apiPath} at ${formattedDate}, ${formattedTime} from ${formattedIpAddress}. Today's hits: ${apiHits[dateKey][apiPath]}. Total hits: ${totalHits}`);
  next();
}
app.use(logAPICalls);


app.use(cors(corOption));
app.options('*', cors());
app.use('/',express.static("adminImages/languageImages"))

//All Routes
app.use(adminScreenRouter);
app.use(customerRouter);
app.use(driverRouter);
app.use(ridesRouter);

// Tesr route
app.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center'>
          Wellcome to suvi ride backend  
          <br><br>
          <b style="font-size: 182px;">😃👻</b>
      </h1>`
  );
});

https.createServer(options, app).listen(7000,() => console.log("App running in port 7000 !"));

