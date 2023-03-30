const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://localhost:27017/suvi_ride', {useNewUrlParser: true, useUnifiedTopology: true })
// .then(res => console.log(`database Connection Succesful`))
// .catch(err => console.log(`Error in DB connection `));  
// mongoose.set('strictQuery', true); 
mongoose.connect("mongodb+srv://preeti:Indore1234@cluster0.qzngd29.mongodb.net/suvi_ride_backend1?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log('Error in DB connection ')
  } else {
    console.log("database Connection Succesful")
  }
});

