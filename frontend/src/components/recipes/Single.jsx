import {useState, useEffect} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"

export default function Single() {
	const [single, updateSingle] = useState(null)
	const {id} = useParams()
	useEffect(() => {
		axios.get(`http://localhost:5000/api/recipes/${id}`)
			.then(res => updateSingle(res.data))
			.catch(err => console.log(err))
	}, [])

	function handleDelete() {
		const userConfirmation = window.confirm("Are you sure you want to delete this recipe?")
		if(userConfirmation) {
			axios.delete(`http://localhost:5000/api/recipes/${id}`)
				.then(res => {
					window.alert("Deleted Successfully")
					window.location = "/"
				})
		}
	}

	return(
		<div className="container mx-auto">
			{
				single !== null 
				?
				<div className="py-10 flex justify-center flex-wrap gap-20">
					<div><img src={single.imgPath ? single.imgPath : "/uploads/no-image.jpg"} alt={single.name} style={{width:"500px", height: "450px", objectFit:"cover", "objectPosition": "center"}} /></div>
					<div className="w-11/12 flex flex-col gap-5 md:w-10/12 lg:w-6/12">
						<h2 className="text-lg md:text-3xl text-gray-500"><b className="text-gray-800">Dish Name:</b> {single.name}</h2>
						<h5 className="text-2xl text-gray-500"><b className="text-gray-800">Chef:</b> {single.chef}</h5>
						<p className="text-lg text-gray-500"><b className="text-gray-800 text-2xl">Description:</b><br/>{single.description}</p>
						<h3 className="text-3xl text-gray-800">Ingredients:</h3>
						<ol className="flex gap-4">
							{
								single.ingredients.split(",").map((ingredient, i) =>(
									<li key={i} className="px-3 py-2 bg-red-300 text-red-700 rounded-sm capitalize">{ingredient}</li>
								))
							}
						</ol>
						<h3 className="text-2xl text-gray-800 mt-4">Tags:</h3>
						<ul className="my-4 flex flex-wrap gap-2">
							{
								single.tags
								?
								single.tags.split(",").map((tag, i) => (
								<li key={i} className="px-2 py-1 bg-gray-300 text-gray-700 rounded-sm">{tag}</li>
								))
								: null
							}
						</ul>
						<button className="mt-6 py-4 px-6 text-gray-50 bg-red-500 rounded-md max-w-max hover:bg-red-600" onClick={handleDelete}>Delete Recipe</button>
					</div>
				</div>
				:
				<div className="py-20">
					<h3 className="text-2xl text-center">Loading..</h3>
				</div>
			}
			{/*hello*/}
		</div>
	)
}