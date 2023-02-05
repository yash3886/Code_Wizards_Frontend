import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
// import Posts from "./Posts";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = results.slice(indexOfFirstProduct, indexOfLastProduct);

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {}, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=100&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    // setLoading(false);
    console.log(json);

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
    //Get current products
    currentProducts = json.query.search.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    console.log(currentProducts);
  };
  return (
    <div className="App2">
      <header>
        <h1 className="heading1">Code Wizards Search Engine</h1>
        <form className="search_box" onSubmit={handleSearch}>
          <input
            name="query"
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </form>
        {searchInfo.totalhits ? (
          <p>Search Results: {searchInfo.totalhits}</p>
        ) : (
          <p>Search Results: 0</p>
        )}
      </header>
      <div className="results">
        {console.log(currentProducts)};
        {currentProducts.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

          return (
            <div className="result" key={i}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
              <a href={url} target="__blank" rel="noreferrer">
                Read More
              </a>
            </div>
          );
        })}
      </div>
      {/* <Pagination
        productsPerPage={productsPerPage}
        totalProducts={results.length}
        paginate={paginate}
      /> */}
    </div>
  );
}

export default App;
