import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

const App = () => {
  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]); //eslint-disable-line

  return (
    <div>
      <Routes>
        <Route
          path="/recommended"
          element={<Recommended setToken={setToken} />}
        />
        <Route path="/newbook" element={<NewBook setToken={setToken} />} />
        <Route path="/books" element={<Books setToken={setToken} />} />
        <Route path="/authors" element={<Authors setToken={setToken} />} />
        <Route path="/" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
