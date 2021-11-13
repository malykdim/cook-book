import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  
  const postData = (postData) => {
    setOptions({
      method: "POST", 
      headers: {
        "X-Parse-Application-Id": "B4TdQQdUgCC2idycrrsGXkDKyo2jRmTmxQwzIZY8",
        "X-Parse-REST-API-Key": "rQ6VNPGPlZh2nL8WGeT6Jg6kgM4ZO4T1E84nsbKr", 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }
  
  const putData = (putData) => {
    setOptions({
      method: "PUT", 
      headers: {
        "X-Parse-Application-Id": "B4TdQQdUgCC2idycrrsGXkDKyo2jRmTmxQwzIZY8",
        "X-Parse-REST-API-Key": "rQ6VNPGPlZh2nL8WGeT6Jg6kgM4ZO4T1E84nsbKr", 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(putData)
    })
  }

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);
      
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
        
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        
        const data = await res.json();

        setIsPending(false);
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError('Could not fetch the data');
        }
      }
    }

    if (method === "GET") {
      fetchData();      
    }
    if (method === "POST" && options) {
      fetchData(options);      
    }
    if (method === "PUT" && options) {
      fetchData(options);      
    }

    return () => {
      controller.abort();
    }

  }, [url, options, method]);

  return { data, isPending, error, postData, putData };
}