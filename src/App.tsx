import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./containers/todo-list/todo-list";

function App() {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route path="" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
