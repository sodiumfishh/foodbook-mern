const fs = require("fs")
const path = require("path")
const router = require('express').Router()
const Recipe = require("../models/recipe")

router.get("/", (req, res) => {
	Recipe.find()
		.then(response => res.status(200).json(response))
		.catch(err => rec.status(400).json("Error"))
})

router.get("/:id", (req, res) => {
	const {id} = req.params
	Recipe.findById(id).then(response => res.json(response))
})

router.post("/", (req, res) => {

	let file 
	let filename

	if(req.files === null) {
		filename = ""
	}else {
		file = req.files.file
		filename = `uploads/${Date.now()}_${file.name}`

		file.mv(path.join('__dirname', `../frontend/public/${filename}`), err => {
			if(err) {
				console.log(err)
				res.status(500).send(err)
			}
		})	
	}

	const {name, ingredients, chef, description, tags} = req.body

	const recipe = new Recipe({
		ingredients: ingredients,
		name: name,
		chef: chef,
		imgPath: filename,
		description: description,
		tags: tags
	})

	recipe.save()
		.then(response => {
			res.status(201).json(response)
		})
		.catch(err => res.json(err))
})

router.put("/:id", (req, res) => {
	const file = req.files.file
	const filename = `uploads/${Date.now()}_${file.name}`

	const {name, ingredients, chef} = req.body

	file.mv(path.join('__dirname', `../frontend/public/${filename}`), err => {
		if(err) {
			console.log(err)
			res.status(500).send(err)
		}
	})

	const {id} = req.params

	Recipe.findByIdAndUpdate(id, {
		name: name,
		ingredients: ingredients,
		imgPath: filename,
		chef: chef,
		description: req.body.description
	}, {returnOriginal: false})
		.then(response => res.json(`${response.name} updated seccessfully!`))
		.catch(err => res.json(err))
})

router.delete("/:id", (req, res) => {
	const {id} = req.params

	Recipe.findByIdAndDelete(id).then(response => {
		try{
			fs.unlinkSync(path.join(__dirname, "../frontend/public", response.imgPath))
		} catch(err) {
			return res.json({msg: "Error. Try Again"})
		}
		console.log(response.imgPath)
		res.json(`${response.name} deleted successfully`)
}	)
})

module.exports = router