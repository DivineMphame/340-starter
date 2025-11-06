/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expresslayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")

// Default locals for templates
app.use((req, res, next) => {
  res.locals.loggedin = false
  res.locals.accountData = {}
  res.locals.nav = `
    <ul class="nav-list">
      <li><a href="/">Home</a></li>
      <li><a href="/inv">Inventory</a></li>
      <li><a href="/account/login">Login</a></li>
    </ul>
  `
  next()
})

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expresslayouts)
app.set("layout", "./layouts/layout") // not at views root
app.use(static)
//Index route
app.get("/", function (req, res) {
  res.render("index", { title: "Home" })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
// Error handler (render friendly page on uncaught errors)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500)
  try {
    return res.render('errors/500', { title: 'Server Error', error: err })
  } catch (e) {
    return res.send(`Server Error: ${err.message}`)
  }
})

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
