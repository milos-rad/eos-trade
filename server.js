const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { createAccount, getAccount, getBalance, adminSend, userSend, test, depositAddress, buyRamBytes, buyNetCPU, watchMyAccount } = require('./controller');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

// app.get('/createAccount', createAccount);
app.post('/getAccount', getAccount);
app.post('/getBalance', getBalance);
app.post('/adminSend', adminSend);
app.post('/userSend', userSend);
app.post('/depositAddress', depositAddress);
app.post('/buyrambytes', buyRamBytes);
app.post('/buyNetCPU', buyNetCPU);
app.get('/test', watchMyAccount);

app.listen(port, function() {
	console.log('Node app is running at localhost: ' + port);
})