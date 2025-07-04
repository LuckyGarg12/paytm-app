import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
          <Route path="*" element={<Navigate to={"/signin"} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
