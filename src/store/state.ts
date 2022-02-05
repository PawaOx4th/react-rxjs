import { BehaviorSubject, map } from "rxjs";

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
}

export const pokemons$ = new BehaviorSubject<IPokemon[]>([]);

export const pokemonsWithPower$ = pokemons$.pipe(
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

fetch("/public/pokemons.json")
  .then(res => res.json())
  .then(res => {
    pokemons$.next(res);
  });
