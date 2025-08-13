import logo from './logo.svg';
import './App.css';



function App() {
  const list = ["React", "JavaScript", "CSS"];
  return (
    <ul>
      {list.map((item) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
}

export default App;
