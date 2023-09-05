import { useQuery, gql } from "@apollo/client";

const Books = ({ show }) => {
  const ALL_BOOKS = gql`
    query {
      allBooks {
        title
        author
        published
      }
    }
  `;

  const result = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading Books...</div>;
  }

  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
