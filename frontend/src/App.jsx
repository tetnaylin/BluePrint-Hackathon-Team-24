import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import QrCodeScanned from './components/qr-code-scanned/QrCodeScanned'
import SocietySignUp from "./components/society-sign-up/SocietySignUp"
import AttendeeSignUp from "./components/attendee-sign-up/AttendeeSignUp"
import Landing from "./components/landing/Landing"
import NewAttendeeSignUp from "./components/sign-up/NewAttendeeSignUp"
import ManageEvent from "./pages/CreateEditEvent"
import FormSubmitted from "./components/form-submitted/FormSubmitted"
import EventPage from "./pages/EventPage"

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
        <Route path="/scanned" element={<QrCodeScanned />} />
        <Route path="/newevent" element={<ManageEvent/>} />
        <Route path="/submitted" element={<FormSubmitted />} />
        <Route path="/eventname" element={<EventPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
