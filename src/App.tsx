import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import List from "./components/List/List";

const data = ["React", "Angular", "Vue", "JavaScript"];

const App = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(
      data.filter((el) => el.toLowerCase().includes(value.toLocaleLowerCase()))
    );
  }, [value]);

  return (
    <div className="App">
      <div className="App-header ">
        <Search value={value} onChange={(e) => setValue(e.target.value)} />
        <List data={items} />
      </div>
    </div>
  );
};

export default App;
