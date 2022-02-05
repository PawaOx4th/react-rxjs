import { BehaviorSubject, combineLatestWith, map } from "rxjs";

export interface IPokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  power?: number;
  selected?: boolean;
}

export const rawPokemons$ = new BehaviorSubject<IPokemon[]>([]);

export const pokemonsWithPower$ = rawPokemons$.pipe(
  map(latesData =>
    latesData.map(rawData => ({
      ...rawData,
      power:
        rawData.attack +
        rawData.defense +
        rawData.hp +
        rawData.special_attack +
        rawData.special_defense +
        rawData.speed,
    }))
  )
);

export const selected$ = new BehaviorSubject<number[]>([]);

export const pokemon$ = pokemonsWithPower$.pipe(
  combineLatestWith(selected$),
  map(([pokemon, selected]) =>
    pokemon.map(p => ({
      ...p,
      selected: selected.includes(p.id),
    }))
  )
);

export const desk$ = pokemon$.pipe(
  map(pokermon => pokermon.filter(p => p.selected))
);

fetch("/public/pokemons.json")
  .then(res => res.json())
  .then(res => {
    rawPokemons$.next(res);
  });
