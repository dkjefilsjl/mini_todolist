import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/header";
import TodoList from "./containers/todo-list/todo-list";

function App() {
  return (
    <Router basename={"/"}>
      <Header />
      <Routes>
        <Route path="" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
