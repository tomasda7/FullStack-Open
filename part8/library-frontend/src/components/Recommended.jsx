import { useEffect, useState } from "react";
import Menu from "./Menu";
import { BOOKS_BYGENRE, USER_INFO } from "../queries";
import { useQuery } from "@apollo/client";
const Recommended = ({ setToken }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const user = useQuery(USER_INFO);

  useEffect(() => {
    if (user.data) setSelectedGenre(user.data.me.favoriteGenre);
  }, [user.data]);

  const byGenre = useQuery(BOOKS_BYGENRE, {
    variables: { selectedGenre },
  });

  if (byGenre.loading || user.loading) {
    return <div>Loading Books...</div>;
  }

  return (
    <>
      <Menu setToken={setToken} />
      <h2>Recommendations</h2>

      <span>
        books on your favorite genre <strong>{selectedGenre}</strong>
      </span>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {byGenre.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommended;
