const Status = require("../models/Status");

// Register a User
module.exports.registerStatus = (reqBody) => {
  const { UID, SEVERITY, COUGH, COLD, FEVER} = reqBody;

  console.log('helo')

  return Status.findOne({ SEVERITY }).then((result, error) => {
    if (error) {
      return error;
    } else if (result !== null) {
      return "status name already used! please try again";
    } else {
      const newStatus = new Status({
        UID: UID,
        SEVERITY: SEVERITY,
        COUGH: COUGH,
        COLD: COLD,
        FEVER:FEVER
      });

      return newStatus.save().then((result, error) => {
        if (result) {
          console.log(`Status registration successful`);
          return true;
        } else {
          return error;
        }
      });
    }
  });
};

module.exports.getAllStatuses = () => {
  return Status.find().then((result, error) => {
    if (result !== null) {
      return result;
    } else {
      return error;
    }
  });
};
