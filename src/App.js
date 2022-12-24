
import './App.css';
import BoardPresenter from './presenter/BoardPresenter';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { stateAtom } from './model/Game';
import { orientations } from './maps/maps';

function App() {

  const [state, setState] = useRecoilState(stateAtom);
  // State for the position of the object
  // const [currentPosition, setCurrentPosition] = useState({ r: position.r, c: position.c, rotation: 0 });
  const speed = 1;
  useEffect(() => {
    var refreshIntervalId = null;
    if (state && state.bullets.length > 0) {
      refreshIntervalId = setInterval(() => {
        function moveBullet() {

          let updatedBulletList = []
          for (let i = 0; i < state.bullets.length; i++) {
            const bullet = state.bullets[i];

            switch (bullet.orientation) {
              case orientations.up:
                if (bullet.position.r > 1) {
                  updatedBulletList = [...updatedBulletList, {
                    ...bullet, position: {
                      r: (bullet.position.r - 1),
                      c: bullet.position.c
                    }
                  }];
                }
                break;

              case orientations.down:
                if (bullet.position.r < state.boardSize.rows - 1) {
                  updatedBulletList = [...updatedBulletList, {
                    ...bullet, position: {
                      r: (bullet.position.r + 1),
                      c: bullet.position.c
                    }
                  }];
                }
                break;

              case orientations.left:
                if (bullet.position.c > 0) {
                  updatedBulletList = [...updatedBulletList, {
                    ...bullet, position: {
                      r: bullet.position.r,
                      c: (bullet.position.c - 1)
                    }
                  }];
                }
                break;
              case orientations.right:
                if (bullet.position.c < state.boardSize.columns - 1) {
                  updatedBulletList = [...updatedBulletList, {
                    ...bullet, position: {
                      r: bullet.position.r,
                      c: (bullet.position.c + 1)
                    }
                  }];
                }
                break;
            }
          }

          setState((prevState) => {
            return {
              ...prevState,
              bullets: updatedBulletList,
            };
          });
        }
        console.log("ticking...");

        moveBullet();
      }, 1000);
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

        let updatedBulletList = [];
        for (let i = 0; i < state.tanks.length; i++) {
          const tank = state.tanks[i];
          const elementAbovePos = (((tank.position.r - 1) * state.boardSize.columns) + tank.position.c);
          // if (state.board[elementAbovePos] && !state.board[elementAbovePos].blocked) {

          console.log("else")

          updatedBulletList = [...state.bullets,
          {
            ...tank.bullet,
            id: "b" + Math.ceil(Math.random() * 1000),
            orientation: tank.orientation,
            position: {
              r: tank.position.r,
              c: tank.position.c,
            }
          }];

          // }
        }

        setState((prevState) => {
          return {
            ...prevState,
            bullets: updatedBulletList,
          };
        });



        // setState((prevState) => {
        //   return {
        //     ...prevState,
        //     bullets: updatedBulletList,
        //   };
        // });
      } else if (event.key === 'ArrowUp') {

        let updatedTankList = []
        for (let i = 0; i < state.tanks.length; i++) {
          const tank = state.tanks[i];
          const elementAbovePos = (((tank.position.r - 1) * state.boardSize.columns) + tank.position.c);
          if (state.board[elementAbovePos] && state.board[elementAbovePos].blocked) {
            updatedTankList = [...updatedTankList,
            {
              ...tank,
              orientation: orientations.up
            }
            ]
          } else {
            console.log("else")
            updatedTankList = [...updatedTankList, {
              ...tank, position: {
                r: tank.orientation == orientations.up ? tank.position.r - 1 : tank.position.r,
                c: tank.position.c
              },
              orientation: orientations.up
            }]
          }
        }

        setState((prevState) => {
          return {
            ...prevState,
            tanks: updatedTankList,
          };
        });

      } else if (event.key === 'ArrowDown') {


        let updatedTankList = []
        for (let i = 0; i < state.tanks.length; i++) {
          const tank = state.tanks[i];
          const elementAbovePos = (((tank.position.r + 1) * state.boardSize.columns) + tank.position.c);
          if (state.board[elementAbovePos] && state.board[elementAbovePos].blocked) {
            updatedTankList = [...updatedTankList,
            {
              ...tank,
              orientation: orientations.down
            }
            ]
          } else {
            console.log("else")
            updatedTankList = [...updatedTankList, {
              ...tank, position: {
                r: tank.orientation == orientations.down ? tank.position.r + 1 : tank.position.r,
                c: tank.position.c
              },
              orientation: orientations.down
            }]
          }
        }

        setState((prevState) => {
          return {
            ...prevState,
            tanks: updatedTankList,
          };
        });

      } else if (event.key === 'ArrowLeft') {
        let updatedTankList = []
        for (let i = 0; i < state.tanks.length; i++) {
          const tank = state.tanks[i];
          const elementAbovePos = ((tank.position.r * state.boardSize.columns) + tank.position.c - 1);
          if (state.board[elementAbovePos] && state.board[elementAbovePos].blocked) {
            updatedTankList = [...updatedTankList,
            {
              ...tank,
              orientation: orientations.left
            }
            ]
          } else {
            console.log("else")
            updatedTankList = [...updatedTankList, {
              ...tank, position: {
                r: tank.position.r,
                c: tank.orientation == orientations.left ? tank.position.c - speed : tank.position.c,
              },
              orientation: orientations.left
            }]
          }
        }

        setState((prevState) => {
          return {
            ...prevState,
            tanks: updatedTankList,
          };
        });
      } else if (event.key === 'ArrowRight') {

        let updatedTankList = []
        for (let i = 0; i < state.tanks.length; i++) {
          const tank = state.tanks[i];
          const elementAbovePos = ((tank.position.r * state.boardSize.columns) + tank.position.c + 1);
          if (state.board[elementAbovePos] && state.board[elementAbovePos].blocked) {
            updatedTankList = [...updatedTankList,
            {
              ...tank,
              orientation: orientations.right
            }
            ]
          } else {
            console.log("else")
            updatedTankList = [...updatedTankList, {
              ...tank, position: {
                r: tank.position.r,
                c: tank.orientation == orientations.right ? tank.position.c + speed : tank.position.c,
              },
              orientation: orientations.right
            }]
          }
        }

        setState((prevState) => {
          return {
            ...prevState,
            tanks: updatedTankList,
          };
        });
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
