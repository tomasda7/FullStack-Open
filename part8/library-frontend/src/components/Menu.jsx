import { useApolloClient } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    client.resetStore(); //resets apollo client cache
    navigate("/");
  };

  return (
    <div>
      <Link to={"/authors"}>
        <button type="button">authors</button>
      </Link>
      <Link to={"/books"}>
        <button type="button">books</button>
      </Link>
      <Link to={"/newbook"}>
        <button type="button">new book</button>
      </Link>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default Menu;
