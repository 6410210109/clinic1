var express = require("express");
var cors = require("cors");
var app = express();
const crypto = require("crypto");
var bodyParser = require("body-parser"); // Import body-parser

// get the client
const mysql = require("mysql2");
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "patient",
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/api/patient_details", function (req, res, next) {
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);
  const sort_column = req.query.sort_column;
  const sort_direction = req.query.sort_direction;
  const search = req.query.search;

  const start_idx = (page - 1) * per_page;
  var params = [];
  var sql = "select * from patient_details";
  if (search) {
    sql += " WHERE first_name LIKE ?";
    params.push("%" + search + "%");
  }
  if (sort_column) {
    sql += " ORDER BY " + sort_column + " " + sort_direction;
  }
  sql += " LIMIT ?, ?";
  params.push(start_idx);
  params.push(per_page);
  console.log(sql, params);
  connection.execute(sql, params, function (err, results, fields) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(results); // results contains rows returned by server

    // simple query
    connection.query(
      "SELECT count(patient_id) as total from patient_details",
      function (err, count, fields) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!count || count.length === 0) {
          return res.status(500).json({ error: "No count result" });
        }
        const total = count[0]["total"];
        const total_pages = Math.ceil(total / per_page);
        res.json({
          page: page,
          per_page: per_page,
          total: total,
          total_pages: total_pages,
          data: results,
        });
      }
    );
  });
});

// Generate a simple token
function generateToken() {
  return crypto.randomBytes(16).toString("hex");
}

// API for user authentication
app.post("/patient/users", function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.execute(
    sql,
    [username, password],
    function (err, results, fields) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        const user = results[0];
        const accessToken = generateToken();

        // Store the token in the database (or in memory for simplicity)
        const updateSql = "UPDATE users SET accessToken = ? WHERE id = ?";
        connection.execute(updateSql, [accessToken, user.id], function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ accessToken, user });
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    }
  );
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
