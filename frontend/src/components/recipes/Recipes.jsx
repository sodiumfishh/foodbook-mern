import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

function Recipes() {
	const [recipes, setRecipes] = useState([])

	useEffect(() => {
		axios.get("/api/recipes").then(res => setRecipes(res.data))
	}, [])

	function handleDelete(e) {
		const id = e.target.id
		const userConfirmation = window.confirm("Are you sure you want to delete this recipe?")
		if(userConfirmation) {
			axios.delete(`/api/recipes/${id}`)
				.then(res => {
					window.alert("Deleted Successfully")
					window.location = "/"
				})
		}
	}

	return(
		<div>
			{
				recipes.length > 0 
				? 
				<div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
					{
						recipes.map(recipe => (
							<div key={recipe._id} className="mx-auto shadow-sm px-6 py-4" style={{background: "#fff"}}>
								<div className="mb-4"><img src={recipe.imgPath ? recipe.imgPath : "/uploads/no-image.jpg"} loading="lazy" alt={recipe.name} style={{width:"200px", height:"200px", objectFit:"cover", objectPosition: "center"}} /></div>
								<div className="pt-4">
									<h4 className="my-2 text-gray-800 text-2xl capitalize">
										<Link to={`/${recipe._id}`}>
											<a>{recipe.name}</a>
										</Link>
									</h4>
									<h4 className="text-gray-800"><span className="text-gray-500">Chef:</span> {recipe.chef}</h4>
									<ul className="my-4 flex flex-wrap gap-2">
										{
											recipe.tags
											?
											recipe.tags.split(",").map((tag, i) => (
											<li key={i} className="px-2 py-1 bg-gray-300 text-gray-700 rounded-sm">{tag}</li>
											))
											: null
										}
									</ul>
									<button id={recipe._id} className="py-2 px-6 text-gray-50 bg-red-500 rounded-md w-full hover:bg-red-600" onClick={handleDelete}>Delete Recipe</button>
								</div>
							</div>
						))
					}
				</div>
				: 
				<div className="text-center py-16 min-h-screen flex flex-col items-center gap-6">
					<h2 className="capitalize text-3xl text-gray-800">It looks like there aren't any recipes yet</h2>
					<Link to="/add">
						<a className="px-6 py-4 text-gray-50 bg-red-500 hover:bg-red-600 inline-block mt-4 rounded-md">Add Recipe</a>
					</Link>
				</div>
			}
		</div>
	)
}

export default Recipes