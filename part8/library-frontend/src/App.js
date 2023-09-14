import { Routes, Route } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/newbook" element={<NewBook />} />
        <Route path="/books" element={<Books />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
