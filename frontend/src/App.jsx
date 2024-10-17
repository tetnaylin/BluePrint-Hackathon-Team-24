import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import SignUp from './components/sign-up/SignUp'
import QrCodeScanned from './components/qr-code-scanned/QrCodeScanned'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        {/* to change to "/sign-up" afterwards */}
        <Route path="/" element={<SignUp />} />
        <Route path="/scanned" element={<QrCodeScanned />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
