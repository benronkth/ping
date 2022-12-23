import logo from './logo.svg';
import './App.css';
import BoardPresenter from './presenter/BoardPresenter';

function App() {
  return (
    <div className="App">
      <div className='board-holder'>
        <BoardPresenter></BoardPresenter>
      </div>
    </div>
  );
}

export default App;
