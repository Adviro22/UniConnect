import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GetPublications from "./pages/GetPublications.jsx";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Authprovider } from "./context/AuthContext.jsx";
import Register from "./pages/Register.jsx";
import FormPublication from "./pages/FormPublication.jsx";
import EditPublication from "./pages/EditPublication.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { PublicationProvider } from "./context/PublicationContext.jsx";
import GetAllPublications from "./pages/GetAllPublications.jsx"

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
                <Route path="/publications" element={<GetPublications />} />
                <Route path="/add-publication" element={<FormPublication />} />
                <Route path="/publication/:id" element={<EditPublication />} />
                <Route path="/allpublications" element={<GetAllPublications />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PublicationProvider>
    </Authprovider>
  );
}

export default App;
