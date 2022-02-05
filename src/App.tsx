import { useObservableState } from "observable-hooks";
import React, { useCallback, useContext, useMemo } from "react";
import { BehaviorSubject, combineLatestWith, map } from "rxjs";
import "./App.css";
import { PokermonContext } from "./Context";
import { selected$ } from "./store/state";

export const usePokemon = () => useContext(PokermonContext);

function Search() {
  // const [search, setSearch] = useState("");
  const { pokemon$ } = usePokemon();
  const search$ = useMemo(() => new BehaviorSubject(""), []);
  // const pokemons = useObservableState(pokemon$, []);

  const [resultFilter] = useObservableState(
    () =>
      pokemon$.pipe(
        combineLatestWith(search$),
        map(([pokemon, search]) =>
          pokemon.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      ),
    []
  );

  // const resultFilter = useMemo(
  //   () =>
  //     pokemons.filter(pokemon =>
  //       pokemon.name.toLowerCase().includes(search$.value.toLowerCase())
  //     ),
  //   [search$, pokemons]
  // );

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type='text'
          value={search$.value}
          onChange={e => search$.next(e.target.value)}
          style={{
            padding: "0.4rem",
            fontFamily: "Architects Daughter",
            fontWeight: "bold",
            fontSize: "1.75rem",
          }}
        />
        <button
          disabled={search$.value.length === 0}
          type='button'
          onClick={() => search$.next("")}
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            outline: "none",
            border: "1px transparent",
          }}
        >
          X
        </button>
      </div>
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
  const { desk$, selected$ } = usePokemon();
  const desk = useObservableState(desk$, []);

  const onClearDesk = () => {
    selected$.next([]);
  };

  const onRemoveFromDesk = useCallback((id: number) => {
    selected$.next(selected$.value.filter(item => item !== id));
  }, []);

  return (
    <div>
      <button type='button' onClick={() => onClearDesk()}>
        Clear
      </button>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {desk &&
          desk.map(item => (
            <li
              style={{ listStyle: "none", border: "1px solid #fff" }}
              key={item.id}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                loading='lazy'
                alt=''
              />
              <button type='button' onClick={() => onRemoveFromDesk(item.id)}>
                Remove.
              </button>
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
