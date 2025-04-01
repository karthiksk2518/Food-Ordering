import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom"
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { Toaster } from 'react-hot-toast';

const App = () => {

  const url = String(import.meta.env.VITE_API_URL || "");

  return (
    <div>
      <Toaster />
      <Navbar />
      <hr />
      <div className="app-content flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App