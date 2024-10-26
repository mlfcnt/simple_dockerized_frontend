import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isError = !message && !isLoading;

  const serverUrl = import.meta.env.VITE_API_URL;

  if (!serverUrl) {
    throw new Error("VITE_API_URL is not defined");
  }

  useEffect(() => {
    fetch(serverUrl)
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.greeting);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Simple dockerized frontend</h1>
      <h3
        style={{
          color: isError ? "red" : "inherit",
        }}
      >
        {" "}
        {isError
          ? "Something went wrong...We cannot seem to reach the server"
          : `Message from the server : ${message}`}
      </h3>
    </div>
  );
}

export default App;
