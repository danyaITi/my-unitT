import { useEffect, useState } from "react";

const Users = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users");
        const res = await data.json();
        setData(res);
      } catch (error) {
        setErr("Something went wrong");
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {err && <span style={{ color: "red" }}>{err}</span>}

      {data.length && (
        <ul>
          {data.map((item: { name: string; id: number }) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
