import {Link} from "react-router-dom"

function Sidebar() {
	return(
		<header className="border-b-2 border-gray-100" style={{background: "#fff"}}>
			<div className="container mx-auto py-6 flex justify-between items-center">
				<h2 className="text-4xl text-gray-800 text-center">
					<Link to="/">
						<a>FoodLogger</a>
					</Link>
				</h2>
				<nav>
					<ul className="text-center text-lg flex gap-5">
						<li className="cursor-pointer">
							<Link to="/">
								 <a className="px-4 py-4 block hover:bg-red-100 hover:text-red-600 ">Home</a>
							</Link>
						</li>
						<li className="cursor-pointer">
							<Link to="/add">
								<a className="px-4 py-4 block hover:bg-red-100 hover:text-red-600 ">Add Recipe</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

export default Sidebar