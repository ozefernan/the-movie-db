import { createContext, useEffect, useState } from "react";

export const PeapleContext = createContext([]);

export function PeapleProvider({ children }) {
  const [error, setError] = useState(false);
  const [peaple, setPeaple] = useState({});
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;
  const baseUrl = process.env.REACT_APP_MOVIE_DB_BASE_URL;

  const handlePeaple = async (peapleId) => {
    let url = new URL(`${baseUrl}/person/${peapleId}`);
    url.search = new URLSearchParams({
      api_key: apiKey,
    });

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then(setPeaple)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <PeapleContext.Provider
      value={{
        error,
        peaple,
        loading,
        setPeaple,

        handlePeaple,
      }}
    >
      {children}
    </PeapleContext.Provider>
  );
}
