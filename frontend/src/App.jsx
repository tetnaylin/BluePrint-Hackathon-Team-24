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
import ViewAllOrUpcomingEvents from "./pages/ViewAllOrUpcomingEvents"
import ViewCurrentEvents from "./pages/ViewCurrentEvents"
import NewSocietySignUp from "./components/new-society-sign-up/NewSocietySignUp"
import Autosubmit from "./pages/autosubmit"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login/attendee" element={<AttendeeSignUp />} />
        <Route path="/signup/attendee" element={<NewAttendeeSignUp />} />
        <Route path="/login/society" element={<SocietySignUp />} />
        <Route path="/new-society-sign-up" element={<NewSocietySignUp />} />
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/scanned" element={<QrCodeScanned />} />
        <Route path="/newevent" element={<ManageEvent/>} />
        <Route path="/submitted" element={<FormSubmitted />} />
        <Route path="/eventname" element={<EventPage/>} />
        <Route path="/all-events" element={<ViewAllOrUpcomingEvents/>} />
        <Route path="/events" element={<ViewCurrentEvents/>} />
        <Route path="/submit/:formId" element={<Autosubmit/>} />
        <Route path="/forms/d/e/:formId/viewform?" element={<Autosubmit/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
