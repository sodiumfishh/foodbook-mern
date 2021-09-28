import {useState} from "react"
import axios from "axios"

function Add() {

	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		ingredients: [],
		chef: "",
		file: "",
		tags: []
	})

	function handleFormChange(e) {
		let {name, value} = e.target

		if(name === "tags" || name === "ingredients") {
			/* 
			-------- Tried doing comma seperated lists like reddit or stackoverflow
			-------- Needs more work -------------

			if(value.indexOf(",") !== -1) {
				arr.push(value.substr(0, value.indexOf(",")))
				setFormValues({
					...formValues,
					[name]: []
				})
				console.log(arr)
			}else {
				setFormValues({
					...formValues,
					[name]: [value]
				})				
			}

			*/

			setFormValues({
				...formValues,
				[name]: value.split(",")
			})
			console.log(value.split(","))
		}else {
			setFormValues({
				...formValues,
				[name]: value
			})
		}
	}


	// ------------ File Change Handle Func ------------------ //

	function handleFileChange(e) {
		setFormValues({
			...formValues,
			file: e.target.files[0]
		})
	}

	// ------------ HANDLE SUBMIT FUNC ------------------ //
	function handleSubmit(e) {
		e.preventDefault()
		console.log(formValues.ingredients)
		let formData = new FormData()
		formData.append("file", formValues.file)
		formData.append("name", formValues.name)
		formData.append("description", formValues.description)
		formData.append("chef", formValues.chef)
		formData.append("tags", formValues.tags)
		formData.append("ingredients", formValues.ingredients)

		axios.post("/api/recipes", formData)
			.then(res => {
				if(res.status === 201) {
					window.location = "/"
				}
			})
			.catch(err => console.log(err))
	}

	return(
		<div className="py-10 w-full">
			<h3 className="text-center text-5xl text-gray-800">Create a Recipe</h3>
			<form onSubmit={handleSubmit} className="py-10 w-7/12 mx-auto">
				<div className="mb-7 flex flex-col gap-2">
					<label htmlFor="recipe-image" className="ml-1 text-xl text-gray-800">Image <span className="ml-1 text-sm text-gray-500">(optional)</span></label>
					<input type="file" name="imgPath" value={formValues.imgPath} onChange={handleFileChange} id="recipe-image" className="text-gray-500 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-300" />
				</div>
				<div className="mb-7 flex flex-col gap-2">
					<label htmlFor="recipe-name" className="ml-1 text-xl text-gray-800">Name <span className="ml-1 text-sm text-gray-500">(required)</span></label>
					<input type="text" name="name" value={formValues.name} onChange={handleFormChange} id="recipe-name" placeholder="Enter Recipe Name" className="text-gray-500 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-300" required />
				</div>
				<div className="mb-7 flex flex-col gap-2">
					<label htmlFor="recipe-desc" className="ml-1 text-xl text-gray-800">Description <span className="ml-1 text-sm text-gray-500">(optional)</span></label>
					<textarea col="40" row="10" name="description" value={formValues.description} onChange={handleFormChange} id="recipe-desc" className="h-48 text-gray-500 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-300" placeholder="Descibe your recipe. Enter desciption."></textarea>					
				</div>
				<div className="mb-7 flex flex-col gap-2">
					<label htmlFor="recipe-chef" className="ml-1 text-xl text-gray-800">Chef <span className="ml-1 text-sm text-gray-500">(required)</span></label>
					<input type="text" name="chef" value={formValues.chef} onChange={handleFormChange} id="recipe-chef" placeholder="Enter Chef Name" className="text-gray-500 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-300" required />
				</div>
				<div className="mb-7 flex flex-col gap-2">
					<label htmlFor="recipe-ingredients" className="ml-1 text-xl text-gray-800">Ingredients <span className="ml-1 text-sm text-gray-500">(required) (comma , seperated)</span></label>
					<input type="text" name="ingredients" value={formValues.ingredients.join(",")} onChange={handleFormChange} id="recipe-ingredients" placeholder="Enter Comma (,) Seperated Recipe Ingredients List" className="text-gray-500 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-300" required />
				</div>
				<div className="mb-7 flex flex-col gap-2">
					<label htmlFor="recipe-tags" className="ml-1 text-xl text-gray-800">Tags <span className="ml-1 text-sm text-gray-500">(optional) (comma , seperated)</span></label>
					<input type="text" name="tags" value={formValues.tags.join(",")} onChange={handleFormChange} id="recipe-tags" placeholder="Enter Comma (,) Seperated Recipe Tags List" className="text-gray-500 p-2 border-2 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-300" />
				</div>
				<button type="submit" className="px-6 py-3 text-xl text-gray-50 bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:ring-2 focus:ring-blue-700">Submit</button>
			</form>
		</div>
	)
}

export default Add