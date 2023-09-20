export const updateCache = (cache, query, addedBook) => {
  const noDuplicates = (arr) => {
    let uniqs = new Set();

    return arr.filter((el) => {
      let book = el.title;

      return uniqs.has(book) ? false : uniqs.add(book);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: noDuplicates(allBooks.concat(addedBook)),
    };
  });
};
