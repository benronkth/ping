import logo from './logo.svg';
import './App.css';
import BackgroundView from './views/BackgroundView';
import WallView from './views/WallView';
import TankView from './views/TankView';
import TankPresenter from './presenter/TankPresenter';

function App() {
  return (
    <div className="App">
      <div className='board-holder'>
        <TankPresenter></TankPresenter>
        {/* <WallView></WallView> */}
        {/* <BackgroundView></BackgroundView> */}
      </div>
    </div>
  );
}

export default App;
