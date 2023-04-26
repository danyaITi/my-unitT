import React, { ReactNode } from "react";

interface ListProps<T> {
  data: T[];
}

const List = <T extends ReactNode>(props: ListProps<T>) => {
  const { data } = props;

  if (!data.length) return <h1>Список пуст...</h1>;

  return (
    <div>
      <ul className="list">
        {data?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
