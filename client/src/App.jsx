import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import AppRoutes from "./routes/Routes";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  const [text, setText] = useState(
    localStorage.getItem("theme") === "dark" ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>
  );

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 50,
      easing: "ease-out-cubic",
      delay: 100,
    });
  }, []);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      setText(<i className="fa-solid fa-moon"></i>);
      localStorage.setItem("theme", "light");
    } else {
      setMode("dark");
      setText(<i className="fa-solid fa-sun"></i>);
      localStorage.setItem("theme", "dark");
    }
  };

  let title = "HAMRO HOTEL";

  return (
    <>
      <Router>
        <ProductProvider>
          <AuthProvider>
            <Navbar
              title={title}
              mode={mode}
              text={text}
              toggleMode={toggleMode}
            />

            <div data-aos="fade-up">
              <AppRoutes mode={mode} />
            </div>

            <Footer mode={mode} />
          </AuthProvider>
        </ProductProvider>
      </Router>
    </>
  );
}

export default App;
