import { useEffect, useState } from "react";
import TankView from "../views/TankView";
import { useRecoilState } from "recoil";
import { stateAtom } from "../model/Game";

function TankPresenter({ id, position, size, name }) {

    const [state, setState] = useRecoilState(stateAtom);
    // State for the position of the object
    const [currentPosition, setCurrentPosition] = useState({ r: position.r, c: position.c, rotation: 0 });
    const speed = 1;
    // Add an event listener for the keydown event when the component mounts
    useEffect(() => {


        // Event handler for the keydown event
        function handleKeydown(event) {
            // Update the position based on the arrow keys
            // console.log(elementAbove, state.board[elementAbove]) 
            if (event.key === ' ') {
                setCurrentPosition((prevPosition) => {
                    const elementAbovePos = (((prevPosition.r - 1) * state.boardSize.columns) + prevPosition.c);
                    if (state.board[elementAbovePos] && state.board[elementAbovePos].blocked) {
                        return {
                            ...prevPosition,
                            rotation: 0
                        }
                    }
                    return {
                        ...prevPosition,
                        r: prevPosition.rotation != 0 ? prevPosition.r : prevPosition.r - speed,
                        rotation: 0
                    };
                });
            } else if (event.key === 'ArrowUp') {
                setCurrentPosition((prevPosition) => {
                    const elementAbovePos = (((prevPosition.r - 1) * state.boardSize.columns) + prevPosition.c);
                    if (state.board[elementAbovePos] && state.board[elementAbovePos].blocked) {
                        return {
                            ...prevPosition,
                            rotation: 0
                        }
                    }
                    return {
                        ...prevPosition,
                        r: prevPosition.rotation != 0 ? prevPosition.r : prevPosition.r - speed,
                        rotation: 0
                    };
                });
            } else if (event.key === 'ArrowDown') {

                setCurrentPosition((prevPosition) => {
                    const elementBelowPos = (((prevPosition.r + 1) * state.boardSize.columns) + prevPosition.c);
                    if (state.board[elementBelowPos] && state.board[elementBelowPos].blocked) {
                        return {
                            ...prevPosition,
                            rotation: 180
                        }
                    }

                    return {
                        ...prevPosition,
                        r: prevPosition.rotation != 180 ? prevPosition.r : prevPosition.r + speed,
                        rotation: 180
                    }
                });
            } else if (event.key === 'ArrowLeft') {
                setCurrentPosition((prevPosition) => {
                    const elementLeftPos = ((prevPosition.r * state.boardSize.columns) + prevPosition.c - 1);
                    if (state.board[elementLeftPos] && state.board[elementLeftPos].blocked) {
                        return {
                            ...prevPosition,
                            rotation: 270
                        }
                    }
                    return {
                        ...prevPosition,
                        c: prevPosition.rotation != 270 ? prevPosition.c : prevPosition.c - speed,
                        rotation: 270
                    }
                });
            } else if (event.key === 'ArrowRight') {
                setCurrentPosition((prevPosition) => {
                    const elementRightPos = ((prevPosition.r * state.boardSize.columns) + prevPosition.c + 1);
                    if (state.board[elementRightPos] && state.board[elementRightPos].blocked) {
                        return {
                            ...prevPosition,
                            rotation: 90
                        }
                    }
                    return {
                        ...prevPosition,
                        c: prevPosition.rotation != 90 ? prevPosition.c : prevPosition.c + speed,
                        rotation: 90
                    }
                });
            }
        }
        window.addEventListener('keydown', handleKeydown);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);


    return (
        <div className="tank-holder" style={{
            left: currentPosition.c * size,
            top: currentPosition.r * size,
            transform: 'rotate(' + currentPosition.rotation + 'deg)'
        }}>
            <TankView
                size={size}
                name={name}
                id={id}
            ></TankView>
        </div>
    );
}

export default TankPresenter;