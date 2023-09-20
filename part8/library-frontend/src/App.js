import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommended from './components/Recommended';
import { useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';
import { updateCache } from './helpers';

const App = () => {
  const [token, setToken] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`A new book "${addedBook.title}" was added.`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

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
