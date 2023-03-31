import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/detail.css";

export default function Detail() {
  const [thePokemon, setThePokemon] = useState({});
  const [abilities, setAbilities] = useState({});
  const [description, setDescription] = useState("");
  const [typeColors, setTypeColors] = useState({
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  });
  const { id } = useParams();
  const fetchPokemon = async (pokemonName) => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
    const data = await res.json();
    setThePokemon(data);
  };
  const alphabetUpperCase = (str) => {
    const result = str.charAt(0).toUpperCase() + str.slice(1);
    return result;
  };
  const pokemonAbilities = async (pokemonName) => {
    const res = await fetch(
      "https://pokeapi.co/api/v2/characteristic/" + pokemonName
    );
    const data = await res.json();
    const filterDescription = data.descriptions.filter((theData) => {
      if (theData.language.name === "en") {
        return theData.description;
      }
    });
    setDescription(filterDescription[0].description);
    setAbilities(data);
  };

  //   console.log(abilities);
  useEffect(() => {
    fetchPokemon(id);
    pokemonAbilities(id);
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            POKEMONS
          </Link>
        </div>
      </nav>
      <div className="container-fluid" style={{ marginTop: "5px" }}>
        <div
          className="row"
          style={{
            backgroundColor: typeColors[thePokemon?.types?.[0]?.type?.name],
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            {thePokemon?.name?.toUpperCase()}
          </h1>
          <div className="col-4 d-flex justify-content-center align-items-center">
            <img
              src={thePokemon?.sprites?.other?.dream_world.front_default}
              alt="pokemon"
              style={{ backgroundColor: "white" }}
            />
          </div>
          <div className="col-4 d-flex flex-column align-items-center">
            <h2>{description}</h2>
            <div className="pokemon-details container-fluid">
              <div>
                <span
                  style={{
                    backgroundColor: "transparent",
                    fontFamily: "Roboto",
                  }}
                >
                  Height
                </span>
                <span
                  style={{
                    backgroundColor: "transparent",
                    fontFamily: "Roboto",
                  }}
                >
                  {thePokemon.height}
                </span>
              </div>
              <div>
                <span
                  style={{
                    backgroundColor: "transparent",
                    fontFamily: "Roboto",
                  }}
                >
                  Weight
                </span>
                <span
                  style={{
                    backgroundColor: "transparent",
                    fontFamily: "Roboto",
                  }}
                >
                  {thePokemon.weight}
                </span>
              </div>
              <div>
                <span
                  style={{
                    backgroundColor: "transparent",
                    fontFamily: "Roboto",
                  }}
                >
                  Abilities
                </span>
                {thePokemon?.abilities?.map((ability, index) => {
                  const str = ability.ability.name;
                  const result = str.charAt(0).toUpperCase() + str.slice(1);
                  return (
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontFamily: "Roboto",
                      }}
                      key={index}
                    >
                      {result}{" "}
                    </span>
                  );
                })}
              </div>

              <div>
                <span style={{ backgroundColor: "transparent" }}>Type</span>
                {thePokemon?.types?.map((typePokemon, index) => {
                  const str = typePokemon.type.name;
                  const result = str.charAt(0).toUpperCase() + str.slice(1);
                  return (
                    <span
                      style={{ backgroundColor: "transparent" }}
                      key={index}
                    >
                      {result}{" "}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-4">
            <h4>Base Stats</h4>
            <div className="pokemon-stats">
              {thePokemon?.stats?.map((status, index) => {
                return (
                  <div key={index} className="stat">
                    <span
                      style={{
                        backgroundColor: "transparent",
                        fontSize: "14px",
                      }}
                      className="stat-label"
                    >
                      {alphabetUpperCase(status.stat.name)}
                    </span>
                    <progress value={status.base_stat} max="200"></progress>
                    <span style={{ backgroundColor: "transparent" }}>
                      {status.base_stat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
