//Node.js body parsing middleware.Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyparser = require("body-parser");
//Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
const cookieparser = require("cookie-parser");
const express = require("express");
const app = express();
const mysql = require("mysql");
const routes = require("./src/routes/routes");
var cors = require("cors");
var multer = require("multer");
var upload = multer();
const fileUpload = require("express-fileupload");
var fs = require("fs");
app.use(cors());

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
//DB CONNECTION
var mySqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sct",
  port: 3306,
});

mySqlcon.connect((err) => {
  if (!err) {
    console.log("DB Connection okay");
  } else {
    console.log("DB Connection Error");
  }
});

app.listen(3000, () => {
  console.log("server running port 3000");
});
//GET ALL PRODUCTS
app.get("/products", (req, res) => {
  mySqlcon.query("SELECT * FROM products", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});
//GET SINGLE PRODUCTS
app.get("/products/:id", (req, res) => {
  mySqlcon.query(
    "SELECT * FROM products WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        var user = rows.find((x) => x.id == req.params.id);
        console.log(user);
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});
let user;
function detail(data) {
  user = data;
  mySqlcon.query(
    "SELECT * FROM products WHERE id = ?",
    [user],
    (err, rows, fields) => {
      if (!err) {
        var u = rows.find((x) => x.id == user);
        var filePath = "images/";
        filePath = filePath.concat(u.image).toString();
        console.log(filePath);
        fs.unlink(filePath, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      } else {
        console.log(err);
      }
    }
  );
  return user;
}
// DELETE PRODUCT
app.delete("/products/delete/:id", (req, res) => {
  let user = req.params.id;
  // detail(req.params.id);
  mySqlcon.query(
    "SELECT * FROM products WHERE id = ?",
    [user],
    (err, rows, fields) => {
      if (!err) {
        var u = rows.find((x) => x.id == user);
        var filePath = "images/";
        filePath = filePath.concat(u.image).toString();
        console.log(filePath);
        fs.unlink(filePath, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
        });
      } else {
        console.log(err);
      }
    }
  );
  mySqlcon.query(
    "DELETE FROM products WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send("Product deleted ");
      } else {
        console.log(err);
      }
    }
  );
  //
});
//IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

upload = multer({ storage: storage });

//INSERT PRODUCT
app.post("/products/create", upload.single("image"), (req, res) => {
  if (!req.file || Object.keys(req.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  console.log("image : " + req.file.filename);
  let pname = req.body.p_name;
  let pdetails = req.body.p_details;
  let pcategory = req.body.p_category;
  let price = req.body.p_price;
  let image = req.file.filename;
  // console.log(req.body);
  // console.log(req.file);


  mySqlcon.query(
    "INSERT INTO products (p_name,p_details,p_category,p_price,image) VALUES (?,?,?,?,?)",
    [pname, pdetails, pcategory, price, image],
    (err, rows, fields) => {
      if (!err) {
        let data = {
          "p_name": pname,
          "p_details": pdetails,
          "p_category": pcategory,
          "p_price" : price,
          "image": image,
          "id": rows.insertId
        }
        res.send(data);
        console.log("Created");

      } else {
        console.log(err);
        console.log("No data");
      }
    }
  );
});

//UPDATE PRODUCTS
app.put("/products/update/:id", upload.single("image"), (req, res) => {
  console.log(req.file);
  let image = "";
  if (req.file) {
    console.log(req.file);
    let user = req.params.id;
  // detail(req.params.id);
  mySqlcon.query(
    "SELECT * FROM products WHERE id = ?",
    [user],
    (err, rows, fields) => {
      if (!err) {
        var u = rows.find((x) => x.id == user);
        var filePath = "images/";
        filePath = filePath.concat(u.image).toString();
        console.log(filePath);
        fs.unlink(filePath, function (err) {
          if (err) return console.log(err);
          console.log("file deleted successfully");
          console.log(req.file.filename);
          let sql =
            "UPDATE `products` SET `p_name`= ?,`p_details`= ?,`p_category`= ?,`p_price`= ?,`image`= ? WHERE id = ?";
          mySqlcon.query(
            sql,
            [req.body.p_name, req.body.p_details, req.body.p_category, req.body.p_price, req.file.filename, req.params.id],
            (err, rows, fields) => {
              if (!err) {
                let data = {
                  "p_name": req.body.p_name,
                  "p_details": req.body.p_details,
                  "p_category": req.body.p_category,
                  "p_price" : req.body.p_price,
                  "image": req.file.filename,
                  "id": req.params.id
                }
                res.send(data);
                console.log("UPDATED");
              } else {
                console.log(err);
              }
            }
          );
        });
      } else {
        console.log(err);
      }
    });
  }  if (!req.file) {
    let user = req.params.id;
  // detail(req.params.id);
  mySqlcon.query(
    "SELECT * FROM products WHERE id = ?",
    [user],
    (err, rows, fields) => {
      if (!err) {
        var u = rows.find((x) => x.id == user);
        var filePath = "images/";
        filePath = filePath.concat(u.image).toString();
        console.log("image jdi na thakte",u.image);
        image = u.image;
          let sql =
    "UPDATE `products` SET `p_name`= ?,`p_details`= ?,`p_category`= ?,`p_price`= ?,`image`= ? WHERE id = ?";
  mySqlcon.query(
    sql,
    [req.body.p_name, req.body.p_details, req.body.p_category, req.body.p_price, u.image, req.params.id],
    (err, rows, fields) => {
      if (!err) {
        let data = {
          "p_name": req.body.p_name,
          "p_details": req.body.p_details,
          "p_category": req.body.p_category,
          "p_price" : req.body.p_price,
          "image": u.image,
          "id": req.params.id
        }
        res.send(data);
        console.log("UPDATED");
      } else {
        console.log(err);
      }
    }
  );
      } else {
        console.log(err);
      }
    }
  );
  }
  

});








//INSERT PRODUCT DEMO
app.post("/products/demo", upload.single("image"), (req, res) => {
  // console.log("image : " + req.file.filename);
  let jsonData = req.body;
  // res.send(jsonData);
  console.log(jsonData);
  console.log(req.body.p_name);
});


