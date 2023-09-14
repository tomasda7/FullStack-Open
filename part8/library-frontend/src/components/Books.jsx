import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import Menu from "./Menu";

const Books = () => {
  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>Loading Books...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <Menu />

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
