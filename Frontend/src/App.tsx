import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return <><BrowserRouter>
    <Routes>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  </BrowserRouter>
  </>
}