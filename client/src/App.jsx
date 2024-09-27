import {BrowserRouter,Routes,Route} from "react-router-dom"

import Home from "./pages/Home"
import Header from "./components/Header"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Projects from "./pages/Projects"


function App() {


  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<SignIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/project" element={<Projects/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
