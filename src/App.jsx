import "./App.css";
import TodoForm from "./components/todoform/TodoForm";
import Tabs from "./components/tabs/Tabs";
import TodoList from "./components/todolist/TodoList";
import Alert from "./components/alert/Alert";

function App() {
  return (
    <div className="container">
      <div className="app_title">Add Your Task Here!!</div>
      <Alert />
      <TodoForm />
      <Tabs />
      <TodoList />
    </div>
  );
}

export default App;