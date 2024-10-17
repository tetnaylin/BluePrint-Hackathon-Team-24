import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SignUp from './components/sign-up/SignUp'
import SocietySignUp from "./components/society-sign-up/SocietySignUp"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/" element={<SignUp />} />
        <Route path="/society-sign-up" element={<SocietySignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
