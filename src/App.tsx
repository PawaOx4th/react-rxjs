import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { IPokemon, selected$, pokemon$, desk$ } from "./store/state";

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
    const sub = pokemon$.subscribe(setPokemons);

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
              <li key={item.id}>
                <input
                  type='checkbox'
                  name='pokemon'
                  id=''
                  checked={item.selected}
                  onChange={() => {
                    if (selected$.value.includes(item.id)) {
                      selected$.next(
                        selected$.value.filter(id => id !== item.id)
                      );
                    } else {
                      selected$.next([...selected$.value, item.id]);
                    }
                  }}
                />
                {item.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function Desk() {
  const [desk, setDesk] = useState<IPokemon[]>([]);

  useEffect(() => {
    const deskSub = desk$.subscribe(setDesk);

    return () => {
      deskSub.unsubscribe();
    };
  }, []);

  return (
    <div>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {desk.map(item => (
          <li
            style={{ listStyle: "none", border: "1px solid #fff" }}
            key={item.id}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
              loading='lazy'
              alt=''
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className='App'>
      <div className='content'>
        <Search />
      </div>
      <div>
        <p
          style={{
            fontWeight: "900",
            fontSize: "2rem",
            letterSpacing: "3px",
          }}
        >
          DESK.
        </p>
        <Desk />
      </div>
    </div>
  );
}

export default App;
