import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SignUp from './components/sign-up/SignUp'
import FormSubmitted from "./components/form-submitted/FormSubmitted"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/" element={<SignUp />} />
        <Route path="/submitted" element={<FormSubmitted />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
