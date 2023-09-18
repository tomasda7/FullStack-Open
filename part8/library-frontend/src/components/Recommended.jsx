import { useState, useEffect } from 'react';
import Menu from './Menu';
import { useQuery } from '@apollo/client';
import { BOOKS_BYGENRE, USER_INFO } from '../queries';
const Recommended = ({ setToken }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const user = useQuery(USER_INFO);

  const byGenre = useQuery(BOOKS_BYGENRE, {
    variables: { selectedGenre: favoriteGenre },
  });

  useEffect(() => {
    if (user.data) {
      const genre = user.data.me.favoriteGenre;

      setFavoriteGenre(genre);
    }
  }, [user.data]);

  if (byGenre.loading || user.loading) {
    return <div>Loading Books...</div>;
  }

  return (
    <>
      <Menu setToken={setToken} />
      <h2>Recommendations</h2>

      <span>
        books on your favorite genre <strong>{favoriteGenre}</strong>
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
