const mongoose = require("mongoose");
const employeeModel = require("../employee/employee.model");

exports.employees_get_all = (req, res, next) => {
  employeeModel.find(function (err, employee) {
    if (err) {
      console.log(err);
    } else {
      res.json(employee);
    }
  });
};

exports.employees_create = (req, res, next) => {
  let employee = new employeeModel(req.body);
  employee
    .save()
    .then((result) => {
      res.status(201).json({ employee: "Employee Added Successfully",
      createdEmployee: {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phone: result.phone,
        _id: result._id  
      } 
    });
    })
    .catch((err) => {
      res.status(400).send("Something Went Wrong");
    });
};




exports.employees_get_by_id = (req, res, next) => {
  let id = req.params.id;
  employeeModel.findById(id, function (err, employee) {
    res.json(employee);
  });
};

exports.employees_update = (req, res, next) => {
  employeeModel.findById(req.params.id, function (err, employee) {
    if (!employee)
      return next(new Error("Unable To Find Employee With This Id"));
    else {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.email = req.body.email;
      employee.phone = req.body.phone;

      employee
        .save()
        .then((emp) => {
          res.json("Employee Updated Successfully");
        })
        .catch((err) => {
          res.status(400).send("Unable To Update Employee");
        });
    }
  });
};

exports.employees_delete = (req, res, next) => {
  employeeModel.findByIdAndRemove(
    { _id: req.params.id },
    function (err, employee) {
      if (err) res.json(err);
      else res.json("Employee Deleted Successfully");
    }
  );
};
