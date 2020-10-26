import "./App.css";
import firebase from "firebase";

import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";

function App() {
  const [list, setList] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: todo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodo("");
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form>
        <FormControl>
          <InputLabel>New ToDo</InputLabel>
          <Input
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!todo}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add todo
        </Button>
      </form>

      <ul>
        {list.map((item) => (
          <Todo key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default App;
