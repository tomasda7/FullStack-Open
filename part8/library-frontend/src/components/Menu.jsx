import { useApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";

const Menu = ({ setToken }) => {
  const client = useApolloClient();

  const logout = () => {
    localStorage.clear();
    client.resetStore(); //resets apollo client cache
    setToken(null);
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
      <Link to={"/recommended"}>
        <button type="button">recommended</button>
      </Link>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default Menu;
