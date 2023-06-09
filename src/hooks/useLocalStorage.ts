import { Dispatch, SetStateAction, useEffect, useState } from "react";

const decode = (value: string): any => {
  return JSON.parse(value);
};

const encode = (value: any): string => {
  return JSON.stringify(value);
};

const useLocalStorage = <T>(
  key: string,
  defaultState: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? decode(storedValue) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(key, encode(value));
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };
