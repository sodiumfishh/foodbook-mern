require("dotenv").config()

const express = require("express")
const app = express()
const path = require("path")

const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const fileUpload = require("express-fileupload")

// Import Routes
const recipeRouter = require("./routes/recipe")

const PORT = process.env.PORT || 5000

app.use(fileUpload())
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_URL, () => console.log("Connected to Database"))

app.use("/api/recipes", recipeRouter)

// Serve static assets if in production
if(process.env.NODE_ENV === "production") {
	//Set static folder
	app.use(express.static('client/build'))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	})
}

app.listen(PORT, () => console.log(`Connected to port ${PORT}`))

