
import './App.css';
import 'animate.css';
import HeaderPresenter from './presenter/HeaderPresenter';
import OnBoardingPresenter from './presenter/OnBoardingPresenter';
import LoggedInPresenter from './presenter/LoggedInPresenter';
import { useRecoilState } from 'recoil';
import { isPlayerLoggedInAtom, playerIdAtom, playerNameAtom } from './model/User';
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import FooterPresenter from './presenter/FooterPresenter';
import SidebarPresenter from './presenter/SidebarPresenter';
function App() {

  const [isPlayerLoggedIn, setIsPlayerLoggedIn] = useRecoilState(isPlayerLoggedInAtom);

  const [playerName, setPlayerName] = useRecoilState(playerNameAtom);
  const [playerId, setPlayerId] = useRecoilState(playerIdAtom);
  const [user, isLoading, error] = useAuthState(auth);
  useEffect(() => {

    if (user) {
      setPlayerName(user.displayName);
      setPlayerId(user.uid);
      setIsPlayerLoggedIn(true);
    }
  }, [user]);

  return (
    <div className="App">
      <div className='content'>
        <SidebarPresenter></SidebarPresenter>
        {/* <HeaderPresenter></HeaderPresenter> */} 
          {isPlayerLoggedIn ? <LoggedInPresenter /> : <OnBoardingPresenter />} 
        {/* <FooterPresenter></FooterPresenter> */}
      </div>
    </div >
  );
}

export default App;
