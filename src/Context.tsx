import React, { createContext, PropsWithChildren, useContext } from "react";
import { desk$, pokemon$, pokemonsWithPower$, selected$ } from "./store/state";

export const PokermonContext = createContext({
  pokemon$,
  pokemonsWithPower$,
  desk$,
  selected$,
});

export function PokermonStore({ children }: PropsWithChildren<unknown>) {
  const { pokemon$, pokemonsWithPower$, desk$, selected$ } =
    useContext(PokermonContext);

  return (
    <PokermonContext.Provider
      value={{ pokemon$, pokemonsWithPower$, desk$, selected$ }}
    >
      {children}
    </PokermonContext.Provider>
  );
}
