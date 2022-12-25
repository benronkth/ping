
import './App.css';
import BoardPresenter from './presenter/BoardPresenter';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { stateAtom } from './model/Game';
import { elementTypes, orientations } from './maps/maps';
import 'animate.css';
function App() {

  const [state, setState] = useRecoilState(stateAtom);
  // State for the position of the object   

  function moveTank(movingOrientation) {

    let updatedBoardList = state.board.slice();
    for (let i = 0; i < state.board.length; i++) {
      const tank = state.board[i];
      if (tank.type != elementTypes.tank) {
        continue;
      }
      let elementPosR = 0;
      let elementPosC = 0;
      let tankOrientation = orientations.up;

      switch (movingOrientation) {
        case orientations.up:
          elementPosR = tank.orientation == orientations.up ? tank.position.r - 1 : tank.position.r;
          elementPosC = tank.position.c;
          tankOrientation = orientations.up;
          break;

        case orientations.down:
          elementPosR = tank.orientation == orientations.down ? tank.position.r + 1 : tank.position.r;
          elementPosC = tank.position.c;
          tankOrientation = orientations.down;
          break;

        case orientations.left:
          elementPosR = tank.position.r;
          elementPosC = tank.orientation == orientations.left ? tank.position.c - 1 : tank.position.c;
          tankOrientation = orientations.left;
          break;
        case orientations.right:
          elementPosR = tank.position.r;
          elementPosC = tank.orientation == orientations.right ? tank.position.c + 1 : tank.position.c;
          tankOrientation = orientations.right;
          break;
      }





      const tankCurrentPos = ((tank.position.r * state.boardSize.columns) + tank.position.c);
      const tankFuturePos = ((elementPosR * state.boardSize.columns) + elementPosC);
      if (state.board[tankFuturePos] && state.board[tankFuturePos].blocked) {

        updatedBoardList[tankCurrentPos] = {
          ...tank,
          orientation: tankOrientation
        };
      } else {
        const updatedTank = {
          ...tank, position: {
            r: elementPosR,
            c: elementPosC
          },
          orientation: tankOrientation
        }
        const space = {
          type: elementTypes.space,
          position: {
            r: tank.position.r,
            c: tank.position.c,
          }
        };

        updatedBoardList[tankCurrentPos] = space;
        updatedBoardList[tankFuturePos] = updatedTank;
      }

    }

    setState((prevState) => {
      return {
        ...prevState,
        board: updatedBoardList,
      };
    });


  }

  


  function shootBullet() {
    let updatedBulletList = state.bullets.slice();
    // for (let i = 0; i < state.tanks.length; i++) {
    //   const tank = state.tanks[i];
    for (let i = 0; i < state.board.length; i++) {
      const tank = state.board[i];
      if (tank.type != elementTypes.tank) {
        continue;
      }
      updatedBulletList = [...updatedBulletList,
      {
        ...tank.bullet,
        id: "b" + Math.random(),
        orientation: tank.orientation,
        position: {
          r: tank.position.r,
          c: tank.position.c,
        }
      }];
    }

    setState((prevState) => {
      return {
        ...prevState,
        bullets: updatedBulletList,
      };
    });
  }


  function moveBullet() {

    let updatedBulletList = [];
    let updatedBoardList = [...state.board];
    for (let i = 0; i < state.bullets.length; i++) {
      const bullet = state.bullets[i];
      let elementPosR = 0;
      let elementPosC = 0;
      switch (bullet.orientation) {
        case orientations.up:
          elementPosR = bullet.position.r - 1;
          elementPosC = bullet.position.c;
          break;

        case orientations.down:
          elementPosR = bullet.position.r + 1;
          elementPosC = bullet.position.c;
          break;

        case orientations.left:
          elementPosR = bullet.position.r;
          elementPosC = bullet.position.c - 1;
          break;
        case orientations.right:
          elementPosR = bullet.position.r;
          elementPosC = bullet.position.c + 1;
          break;
      }

      if (elementPosR < state.boardSize.rows && elementPosR > -1 && elementPosC < state.boardSize.columns && elementPosC > -1) {
        const elementPos = ((elementPosR * state.boardSize.columns) + elementPosC);
        const elementInFrontOfBullet = state.board[elementPos];
        if (elementInFrontOfBullet && !elementInFrontOfBullet.blocked) {
          if (bullet.position.r > 1) {
            const updatedBullet = {
              ...bullet, position: {
                r: elementPosR,
                c: elementPosC
              }
            };
            updatedBulletList = [...updatedBulletList, updatedBullet];
          }
        } else {
          if (elementInFrontOfBullet && elementInFrontOfBullet.distructable) {
            // Distruct the element if it is distructable 

            updatedBoardList = [...updatedBoardList];
            let updatedElement = {
              ...elementInFrontOfBullet,
              name: elementInFrontOfBullet.maxHealth - elementInFrontOfBullet.damageTaken,
              damageTaken: elementInFrontOfBullet.damageTaken + bullet.attack
            };

            if (updatedElement.damageTaken > updatedElement.maxHealth) {
              // destroy the element 
              updatedElement = {
                name: "",
                type: elementTypes.distructed,
                id: "distructed" + Math.random(),
                blocked: false,
                position: {
                  r: elementPosR,
                  c: elementPosC
                }
              }
            }

            updatedBoardList[elementPos] = updatedElement;


          }
        }

      }
      setState((prevState) => {
        return {
          ...prevState,
          board: updatedBoardList,
          bullets: updatedBulletList,
        };
      });
    }
 
  }

 


  useEffect(() => {
    var refreshIntervalId = null;
    if (state && state.bullets.length > 0) {
      refreshIntervalId = setInterval(() => {

        console.log("ticking...");

        moveBullet();
      }, 50);
    }

    return () => {
      clearInterval(refreshIntervalId);
    }

  }, [state.bullets]);

  // Add an event listener for the keydown event when the component mounts
  useEffect(() => {

    // Event handler for the keydown event
    function handleKeydown(event) {
      // Update the position based on the arrow keys
      // console.log(elementAbove, state.board[elementAbove]) 
      if (event.key === ' ') {
        shootBullet();

      } else if (event.key === 'ArrowUp') {
        moveTank(orientations.up);
      } else if (event.key === 'ArrowDown') {
        moveTank(orientations.down);
      } else if (event.key === 'ArrowLeft') {
        moveTank(orientations.left);
      } else if (event.key === 'ArrowRight') {
        moveTank(orientations.right);
      }
    }
    window.addEventListener('keydown', handleKeydown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [state]);

  return (
    <div className="App">
      <div className='board-holder'>
        <BoardPresenter></BoardPresenter>
      </div>
    </div>
  );
}

export default App;
