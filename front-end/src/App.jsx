import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GetPublications from "./pages/GetPublications.jsx";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Authprovider } from "./context/AuthContext.jsx";
import Register from "./pages/Register.jsx";
import FormPublication from "./pages/FormPublication.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { PublicationProvider } from "./context/PublicationContext.jsx";

function App() {
  return (
    <Authprovider>
      <PublicationProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<GetPublications />} />
                <Route path="/add-product" element={<FormPublication />} />
                <Route path="/product/:id" element={<FormPublication />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PublicationProvider>
    </Authprovider>
  );
}

export default App;
