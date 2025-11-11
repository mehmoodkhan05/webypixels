
import useScrollReveal from "./hooks/useScrollReveal";
import "./App.css";
import ChatBot from "./components/ChatBot";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./containers/Main";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import QuotePage from "./components/QuotePage";

function App() {
  useScrollReveal();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} exact >
            <Route index element={<Main />} />
            <Route path="/quote" element={<QuotePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ChatBot />
    </>
  )
}

export default App;


