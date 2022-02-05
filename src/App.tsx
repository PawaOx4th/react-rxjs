import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { IPokemon, pokemonsWithPower$ } from "./store/state";

function Search() {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const resultFilter = useMemo(
    () =>
      pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, pokemons]
  );
  useEffect(() => {
    const sub = pokemonsWithPower$.subscribe(setPokemons);

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <div>
      <input
        type='text'
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: "0.4rem",
          marginTop: "1rem",
          fontFamily: "Architects Daughter",
          fontWeight: "bold",
          fontSize: "1.75rem",
        }}
      />
      <hr />
      <div>
        {resultFilter.length > 0 ? (
          <ul>
            {resultFilter.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <div className='content'>
        <Search />
      </div>
    </div>
  );
}

export default App;
