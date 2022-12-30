import { useState } from "react";
import "./App.css";

// form component
const TodoForm = ({ handleSubmit, newItem, setNewItem, editId }) => {
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a Todo...."
        required
        onChange={(e) => setNewItem(e.target.value)}
        value={newItem}
      />
      <button type="submit">{editId ? "Edit" : "Go"}</button>
    </form>
  );
};

// list component
const TodoList = ({list, handleEdit, handleDelete}) => {
  return (
    <ul className="todos">
      {list.map((item, i) => (
        <li className="todoList" key={i}>
          <span className="todoText">{item.newItem}</span>
          <button onClick={() => handleEdit(item.id)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

function App() {
  const [newItem, setNewItem] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editItem = list.find((item) => item.id === editId);
      const updatedList = list.map((it) =>
        it.id === editItem.id
          ? { id: it.id, newItem }
          : { id: it.id, newItem: it.newItem }
      );

      // console.log(updatedList);
      setList(updatedList);
      setEditId(0);
      setNewItem("");
      return;
    }

    if (newItem !== "") {
      setList([
        ...list,
        {
          id: Date.now(),
          newItem,
        },
      ]);
    }

    setNewItem("");
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  const handleEdit = (id) => {
    const editItem = list.find((item) => item.id === id);
    setNewItem(editItem.newItem);
    setEditId(id);
  };
  // console.log(editId);
  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <TodoForm handleSubmit={handleSubmit} newItem={newItem} setNewItem={setNewItem} editId={editId}
        />
        <div>
          <TodoList list={list} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
