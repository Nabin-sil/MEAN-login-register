const config = require('config.json');
const mongoose = require('mongoose');

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions).then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
  });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Product: require('../Product/product.model'),
    Order: require('../order/order.model'),
    Post: require('../Post/post.model'),
    Employee: require('../employee/employee.model'),

    
};