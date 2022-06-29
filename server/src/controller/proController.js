//DISPLAY ALL PRODUCTS
const db = require("../../index");
const displayProduct = async (req, res, next) => {
  try {
    var db = req.con;
    let results = db.query("Select * from products", function (error, rows) {
      if (error) {
        console.log("Error");
      } else {
        res.send({
          status: 1,
          message: "Successfully products displayed",
          data: rows,
        });
      }
    });
  } catch (error) {
    res.send({
      message: "Error occured",
    });
  }
};
module.exports = { displayProduct };
