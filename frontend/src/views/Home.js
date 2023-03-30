import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const fetchPokemons = async () => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon`
      );
      const data = await res.json();
      console.log(data)
      setPokemons(data.results);
    } catch (error) {
      alert(error);
    }
  };

  console.log(pokemons, "<<")
  useEffect(() => {
    fetchPokemons()
  }, []);
  return (
    <>
      <div className="d-flex no-wrap">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
}
