import axios from "axios";
import "./css/App.css";
import { useEffect } from "react";

function App() {
  const callApi = async () => {
    axios.get("/api").then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
