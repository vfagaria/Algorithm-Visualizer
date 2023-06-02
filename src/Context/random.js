import { useState, useContext, createContext} from "react";


const RandomContext = createContext();
const RandomProvider = ({ children }) => {
  const [array, setArray] = useState([]);

  return (
    <RandomContext.Provider value={[array, setArray]}>
      {children}
    </RandomContext.Provider>
  );
};

// custom hook
const useArray = () => useContext(RandomContext);

export { useArray, RandomProvider };