import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, SET_BIRTHYEAR } from "../queries";
import { useState } from "react";
import Menu from "./Menu";

const Authors = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  const result = useQuery(ALL_AUTHORS);

  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (result.loading) {
    return <div>Loading Authors...</div>;
  }

  const updateBirthyear = (e) => {
    e.preventDefault();

    const yearToInt = Number(year);

    setBirthyear({ variables: { name, year: yearToInt } });

    setName("");
    setYear("");
  };

  return (
    <div>
      <h2>authors</h2>
      <Menu />

      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birth year</h2>
      <form onSubmit={updateBirthyear}>
        <div>
          <select
            defaultValue={result.data.allAuthors[0]}
            onChange={({ target }) => setName(target.value)}
          >
            {result.data.allAuthors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born:
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
