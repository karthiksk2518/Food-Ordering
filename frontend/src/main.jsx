import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './Context/StoreContext.jsx';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
      <Toaster />
      <Analytics />
    </StoreContextProvider>
  </BrowserRouter>

)
