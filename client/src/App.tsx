
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
const App = () => {
  return (<>
  
 <Router>
  <Routes>
    <Route path="/" element={<SignUp/>}/>
    <Route path="/signin" element={<SignIn/>}/>
  </Routes>
 </Router>
  </>
  )
}

export default App