import { useCallback, useEffect, useState } from "react";
async function sendRequest(url, config) {
  const response = await fetch(url, config);
  const resdata = await response.json();
  if (!response.ok) {
    throw new Error(resdata.message || "Failed to send http request");
  }
  return resdata;
}

export default function Usehttp(url, config, initialdata) {
  const [data, setdata] = useState(initialdata);
  const [loading, setloading] = useState("");
  const [error, seterror] = useState("");
  function cleardata() {
    setdata(initialdata);
  }
  const Request = useCallback(
    async function Request(data) {
      setloading(true);
      try {
        const responsedata = await sendRequest(url, { ...config, body: data });
        setdata(responsedata);
      } catch (err) {
        console.log(err);
        seterror(err.message || "failed to read it has error");
      }
      setloading(false);
    },
    [url, config]
  );
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      Request();
    }
  }, [Request, config]);
  return {
    data,
    loading,
    error,
    Request,
    cleardata,
  };
}
