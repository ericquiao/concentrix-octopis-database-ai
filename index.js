const express = require('express');

const app = express();

const mongoose = require('mongoose');
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

mongoose.connect(
  'mongodb+srv://admin:1234@cluster0.b0njd.mongodb.net/e-commerce?retryWrites=true&w=majority',
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


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


let port = process.env.PORT || 7777

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});
