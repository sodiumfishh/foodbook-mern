const mongoose = require('mongoose')
const {Schema} = mongoose

const recipeSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: String,
	ingredients: {
		type: String,
		required: true,
		trim: true
	},
	chef: {
		type: String,
		required: true
	},
	imgPath: String,
	tags: String
}, {
	timestamp: true
})

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe