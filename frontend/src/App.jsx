import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SignUp from './components/sign-up/SignUp'
import QrCodeScanned from './components/qr-code-scanned/QrCodeScanned'
import SocietySignUp from "./components/society-sign-up/SocietySignUp"
import AttendeeSignUp from "./components/attendee-sign-up/AttendeeSignUp"
import Landing from "./components/landing/Landing"
import NewAttendeeSignUp from "./components/sign-up/NewAttendeeSignUp"
import ManageEvent from "./pages/CreateEditEvent"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/attendee-sign-up" element={<AttendeeSignUp />} />
        <Route path="/new-attendee-sign-up" element={<NewAttendeeSignUp />} />
        <Route path="/society-sign-up" element={<SocietySignUp />} />
        {/* <Route path="/new-society-sign-up" element={< />} /> */}
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/" element={<SignUp />} />
        <Route path="/scanned" element={<QrCodeScanned />} />
        <Route path="/newevent" element={<ManageEvent/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
