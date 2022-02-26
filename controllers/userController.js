const User = require("../models/User");
const Street = require("../models/Street");
const City = require("../models/City");
const Status = require("../models/Status");

// Register a User
module.exports.register = (reqBody) => {
  const { UID, NAME, STREET_ID, BIRTHDAY, HEALTH_STATUS_ID } = reqBody;

  return User.findOne({ NAME }).then((result, error) => {
    if (error) {
      return error;
    } else if (result !== null) {
      return "name already used! please try again";
    } else {
      const newUser = new User({
        UID: UID,
        NAME: NAME,
        STREET_ID: STREET_ID,
        BIRTHDAY: BIRTHDAY,
        HEALTH_STATUS_ID: HEALTH_STATUS_ID,
      });

      return newUser.save().then((result, error) => {
        if (result) {
          console.log(`registration successful`);
          return true;
        } else {
          return error;
        }
      });
    }
  });
};

module.exports.getAllUsers = () => {
  return User.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};

module.exports.getSpecificUser = (name) => {
  return User.find(name).then((result, error) => {
    if (result !== null) {
      const { UID, NAME, STREET_ID, BIRTHDAY, HEALTH_STATUS_ID } = result[0];

      let name = NAME;

      let dob = new Date(BIRTHDAY);
      let month_diff = Date.now() - dob.getTime();
      let age_dt = new Date(month_diff);
      let year = age_dt.getUTCFullYear();
      let age = Math.abs(year - 1970);

      return Street.find({ UID: STREET_ID }).then((result, error) => {
        let street = result[0].STREET_NAME;
        let cityId = result[0].CITY_ID;

        if (result !== null) {
          return City.find({ UID: cityId }).then((result, error) => {
            if (result !== null) {
              let city = result[0].CITY_NAME;
              let birthday = BIRTHDAY;
              let hsi = HEALTH_STATUS_ID;
              let streetCity = `${street}-${city}`;

              return Status.find({ UID: hsi }).then((result, error) => {
                if (result !== null) {
                  let severity = result[0].SEVERITY;
                  let cough = result[0].COUGH;
                  let cold = result[0].COLD;
                  let fever = result[0].FEVER;

                  let output = {
                    name,
                    age,
                    streetCity,
                    birthday,
                    severity,
                    cough,
                    cold,
                    fever,
                  };
                  return output;
                } else {
                  return error;
                }
              });
            } else {
              return error;
            }
          });
        } else {
          return error;
        }
      });
    } else {
      return error;
    }
  });
};
