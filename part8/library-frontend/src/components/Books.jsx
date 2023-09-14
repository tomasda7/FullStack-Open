import { useQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BYGENRE } from "../queries";
import Menu from "./Menu";
import { useState } from "react";

const Books = ({ setToken }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const books = useQuery(ALL_BOOKS);

  const byGenre = useQuery(BOOKS_BYGENRE, {
    variables: { selectedGenre },
    skip: !selectedGenre,
  });

  if (books.loading || byGenre.loading) {
    return <div>Loading Books...</div>;
  }

  const genres = books.data.allBooks.map((book) => book.genres).flat();

  const uniqueGenres = [...new Set(genres)];
  uniqueGenres.unshift("all");

  if (selectedGenre !== "all" && byGenre.data) {
    return (
      <div>
        <Menu setToken={setToken} />
        <h2>books</h2>

        <span>
          in genre <strong>{selectedGenre}</strong>
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

        <div>
          <select onChange={({ target }) => setSelectedGenre(target.value)}>
            {uniqueGenres.map((genre, i) => (
              <option key={i} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Menu setToken={setToken} />
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <select onChange={({ target }) => setSelectedGenre(target.value)}>
          {uniqueGenres.map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Books;
