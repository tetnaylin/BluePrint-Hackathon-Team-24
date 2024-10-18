import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SignUp from './components/sign-up/SignUp'
import SocietySignUp from "./components/society-sign-up/SocietySignUp"
import AttendeeSignUp from "./components/attendee-sign-up/AttendeeSignUp"
import Landing from "./components/landing/Landing"
import AttendeeSignUp from "./components/sign-up/AttendeeSignUp"
import ManageEvent from "./pages/CreateEditEvent"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/attendee-sign-up" element={<AttendeeSignUp />} />
        <Route path="/new-attendee-sign-up" element={<SignUp />} />
        <Route path="/society-sign-up" element={<SocietySignUp />} />
        {/* <Route path="/new-society-sign-up" element={< />} /> */}
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/newevent" element={<ManageEvent/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
