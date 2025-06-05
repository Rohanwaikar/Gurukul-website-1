import { useState, useEffect, useCallback } from "react";
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearData(){
    setData(initialData); 
    setLoading(false);
    setError(null);
  }

  const fetchData = useCallback(async (bodyData) => {
    setLoading(true);
    setError(null);
    try {
    console.log("Sending request to:", url);
    console.log("Request config:", config);
    console.log("Request bodyData:", bodyData);

      const response = await fetch(url, {
        ...config,
        body: bodyData ? JSON.stringify(bodyData) : undefined,
      });
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      console.log("Response URL:", response.url);
      console.log("Response type:", response.type);
      console.log("Response redirected:", response.redirected);
      console.log("Response ok:", response.ok);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
      console.log("Response data:", result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(config)]);

  useEffect(() => {
    if (!config || (config && (!config.method || config.method === "GET"))) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData, clearData };
}
