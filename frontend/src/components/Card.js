import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/card.css";

export default function Card({ pokemon }) {
  const [thePokemon, setThePokemon] = useState({});
  const [pokemonId, setPokemonId] = useState();
  const fetchPokemon = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setThePokemon(data);
  };
  const getId = (url) => {
    setPokemonId(url.split("/")[6]);
  };
  const getTypeColor = (type) => {
    switch (type) {
      case "normal":
        return "#A8A77A";
      case "fire":
        return "#EE8130";
      case "water":
        return "#6390F0";
      case "electric":
        return "#F7D02C";
      case "grass":
        return "#7AC74C";
      case "ice":
        return "#96D9D6";
      case "fighting":
        return "#C22E28";
      case "poison":
        return "#A33EA1";
      case "ground":
        return "#E2BF65";
      case "flying":
        return "#A98FF3";
      case "psychic":
        return "#F95587";
      case "bug":
        return "#A6B91A";
      case "rock":
        return "#B6A136";
      case "ghost":
        return "#735797";
      case "dragon":
        return "#6F35FC";
      case "dark":
        return "#705746";
      case "steel":
        return "#B7B7CE";
      case "fairy":
        return "#D685AD";
      default:
        return "#A8A77A"; // Default to Normal type color
    }
  };
  useEffect(() => {
    fetchPokemon(pokemon.url);
    getId(pokemon.url);
  }, [pokemon]);
  return (
    <>
      {!thePokemon && (
        <>
          <div className="container-fluid loading">
            <h1>Loading</h1>
          </div>
        </>
      )}
      {thePokemon?.types && (
        <div
          className="card"
          style={{
            background: getTypeColor(thePokemon?.types?.[0]?.type?.name),
          }}
        >
          <div className="card-img" style={{ backgroundColor: "white" }}>
            <img
              src={thePokemon?.sprites?.other?.dream_world.front_default}
              alt="pokemon"
              style={{ width: "100px" }}
            />
          </div>
          <div className="desc">
            <h6 className="primary-text custom-bold">
              {pokemon.name.toUpperCase()}
            </h6>
            {thePokemon?.types?.map((theType, index) => {
              return (
                <span
                  key={index}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    marginRight: "4px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {theType?.type?.name}
                </span>
              );
            })}
          </div>
          <Link
            to={`/${pokemonId}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <button className="primary-text button-custom" style={{color: '#fff'}}>
              Pokemon Detail
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
