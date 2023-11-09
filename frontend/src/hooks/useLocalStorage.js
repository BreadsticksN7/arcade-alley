import { useState, useEffect } from 'react';

// Provided by Colt Steele
// Creates 'item' as a state and looks in localStorage for curent value
// If not found, defaults to "firstValue"
// When item changes,  useEffect runs again
// Null items are removed, else updated
function useLocalStorage(key, firstValue = null){
  const initValue = localStorage.getItem(key) || firstValue;
  const[item, setItem] = useState(initValue);

  useEffect(function setKeyInLocalStorage(){
    console.debug("hooks useLocalStorage useEffect", "item=", item);
    if(item === null){
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);
  return [item, setItem]
};

export default useLocalStorage;