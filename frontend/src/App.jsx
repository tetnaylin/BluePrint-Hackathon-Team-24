import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import AttendeeSignUp from "./components/sign-up/AttendeeSignUp"
import ManageEvent from "./pages/CreateEditEvent"
import EventPage from "./pages/EventPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/" element={<AttendeeSignUp />} />
        <Route path="/newevent" element={<ManageEvent/>} />
        <Route path="/eventname" element={<EventPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
