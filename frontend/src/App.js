import "./App.css";
import Home from "./screens/Home";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import Success from "./screens/Success";
import Cancel from "./screens/Cancel";


function App() {
  return (
    <>

    <CartProvider>
    <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/createuser" element={<Signup/>}/>
            <Route exact path="/myorder" element={<MyOrder/>}/>
            <Route exact path="/success" element={<Success/>}/>
            <Route exact path="/cancel" element={<Cancel/>}/>

          </Routes>
        </div>
      </Router>
    </CartProvider>
      
    </>
  );
}

export default App;
