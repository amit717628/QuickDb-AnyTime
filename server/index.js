// Server //
const express = require(`express`);
require('dotenv').config()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions ={
   origin: true, 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json()) 



// Routes //

app.use('/api/', require('./database/database'))



// Port //

app.listen(8000,() => {
    const tokens = jwt.sign({
        data: "AAYANOPHEKIYABROWHTTODOBHAI",
    }, "jwtPrivateKey"); 
    console.log(`YOUR ACCESS TOKEN - ${tokens}`)
    console.log('Server Is Running')
})