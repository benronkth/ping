import logo from './logo.svg';
import './App.css';
import BackgroundView from './views/BackgroundView';
import RacketView from './views/RacketView';
import BallView from './views/BallView';

function App() {
  return (
    <div className="App">
      <BallView></BallView>
      {/* <RacketView></RacketView> */}
     {/* <BackgroundView></BackgroundView> */}
    </div>
  );
}

export default App;
