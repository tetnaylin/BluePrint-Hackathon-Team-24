import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import AttendeeSignUp from "./components/sign-up/AttendeeSignUp"
import ManageEvent from "./pages/CreateEditEvent"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/" element={<AttendeeSignUp />} />
        <Route path="/newevent" element={<ManageEvent/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
