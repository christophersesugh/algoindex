import * as React from "react";

const useLocalStorageState = (key, initialValue) => {
  // Get the initial value from local storage or use the provided initial value
  const storedValue = window.localStorage.getItem(key);
  const initial = storedValue !== null ? JSON.parse(storedValue) : initialValue;

  // Create the state using the initial value
  const [state, setState] = React.useState(initial);

  // Define a custom setter function that also updates local storage
  const setLocalStorageState = (newValue) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setState(newValue);
  };

  return [state, setLocalStorageState];
};

export { useLocalStorageState };
