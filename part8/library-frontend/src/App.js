import { Routes, Route } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useState } from "react";

const App = () => {
  const [token, setToken] = useState(null);

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

  return (
    <div>
      <Routes>
        <Route path="/newbook" element={<NewBook setToken={setToken} />} />
        <Route path="/books" element={<Books setToken={setToken} />} />
        <Route path="/authors" element={<Authors setToken={setToken} />} />
      </Routes>
    </div>
  );
};

export default App;
