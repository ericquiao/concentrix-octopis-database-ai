const City = require("../models/City");

// Register a User
module.exports.registerCity = (reqBody) => {
  const { UID, CITY_NAME} = reqBody;

  console.log('helo')

  return City.findOne({ CITY_NAME }).then((result, error) => {
    if (error) {
      return error;
    } else if (result !== null) {
      return "city name already used! please try again";
    } else {
      const newCity = new City({
        UID: UID,
        CITY_NAME: CITY_NAME,
      });

      return newCity.save().then((result, error) => {
        if (result) {
          console.log(`City registration successful`);
          return true;
        } else {
          return error;
        }
      });
    }
  });
};

module.exports.getAllCities = () => {
  return City.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};
