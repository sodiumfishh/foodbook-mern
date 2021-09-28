import {Switch, Route} from "react-router-dom"
import Recipes from "./components/recipes/Recipes"
import Add from "./components/recipes/Add"
import Sidebar from "./components/Sidebar"
import Single from "./components/recipes/Single"

function App() {
  return(
    <div className="mx-auto bg-gray-100">
      <Sidebar />
      <Switch>
        <Route path="/" exact>
          <Recipes />
        </Route>
        <Route path="/add" exact>
          <Add />
        </Route>
        <Route path="/:id" exact>
          <Single />
        </Route>
      </Switch>
    </div>
  )
}

export default App