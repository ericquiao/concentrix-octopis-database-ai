const express = require('express');

const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

const port = 3100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

mongoose.connect(
  'mongodb+srv://admin:admin1234@zuitt-bootcamp.vhxdp.mongodb.net/courseBooking?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', () => {
  console.log('connected to database');
});

//Create a Schema

//Create Routes
// app.get('/users', (req,res)=>{
//  // console.log('hello')
//   res.send('Hello')
// })

// app.post('/users', (req,res)=>{
//   //console.log(req)
//   res.send(req.body.name)
// })

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
