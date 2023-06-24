import { createContext, useContext } from "react";

const MainContext = createContext(null);
export const useMainContext = () => useContext(MainContext);

const currKey = "gravelPokeData";

const MainProvider = ({ children }) => {
  const mainGetPokemon = () => {
    if (localStorage.getItem(currKey) === null) return {};

    return JSON.parse(window.localStorage.getItem(currKey));
  };

  const mainGetPokemonByName = (name) => {
    if (localStorage.getItem(currKey) === null) return null;

    const data = JSON.parse(window.localStorage.getItem(currKey));
    if (!(name in data)) return null;

    return data[name];
  };

  const mainAddPokemon = (pokeData) => {
    const { name } = pokeData;
    const data =
      localStorage.getItem(currKey) === null
        ? {}
        : JSON.parse(window.localStorage.getItem(currKey));

    const currentPokemonData =
      name in data ? data[name] : { ...pokeData, owned: 0 };
    currentPokemonData.owned += 1;
    data[name] = currentPokemonData;
    window.localStorage.setItem(currKey, JSON.stringify(data));
  };

  const mainRemoveAllPokemon = async () => {
    window.localStorage.removeItem(currKey);
  };

  return (
    <MainContext.Provider
      value={{
        mainGetPokemon,
        mainGetPokemonByName,
        mainAddPokemon,
        mainRemoveAllPokemon,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
