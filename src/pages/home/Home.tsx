import { useState, useEffect } from "react";
import Search from "../../components/search/Search";
import List from "../../components/list/List";
import Users from "../../components/users/Users";

const data = ["React", "Angular", "Vue", "JavaScript"];

const Home = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(
      data.filter((el) => el.toLowerCase().includes(value.toLocaleLowerCase()))
    );
  }, [value]);
  return (
    <div>
      <h1>You are home page</h1>
      <Search value={value} onChange={(e) => setValue(e.target.value)} />
      <List data={items} />
      <Users />
    </div>
  );
};

export default Home;
