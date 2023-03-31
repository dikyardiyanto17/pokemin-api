import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import ReactPaginate from "react-paginate";
import "../css/react-paginate.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [loading, setLoading] = useState(false);
  let totalPages = Math.ceil(totalPokemons / 20);
  const handlePageClick = (event) => {
    const display = 12 * event.selected;
    fetchPokemonsByPage(display);
  };
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12`);
      const data = await res.json();
      setLoading(false);
      setTotalPokemons(data.count);
      setPokemons(data.results);
    } catch (error) {
      alert(error);
    }
  };

  const fetchPokemonsByPage = async (page) => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=12`
      );
      const data = await res.json();
      setTotalPokemons(data.count);
      setPokemons(data.results);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchPokemons();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">POKEMONS</Link>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row justify-content-center">
          {loading && <h1>Loading</h1>}
          {pokemons.length !== 0 && (
            <>
              {pokemons.map((pokemon, index) => {
                return (
                  <div key={index} className="col-md-3 mb-4">
                    <Card pokemon={pokemon} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <ReactPaginate
        className="react-paginate"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageCount={totalPages}
        previousLabel="<"
      />
    </>
  );
}
