import React from "react";
import Table from "./components/Table";
import TableEditor from "./components/TableEditor";

function App() {
  return (
    <div>
      <h1>Редактор Таблицы</h1>
      <Table />
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Редактор Таблицы</h1>
      <TableEditor />
    </div>
  );
}


export default App;
