import { forwardRef, useEffect, useRef, useState } from "react";
import TankView from "../views/TankView";

function TankPresenter() {


    // State for the position of the object
    const [position, setPosition] = useState({ x: 0, y: 0, rotation: 0 });

    // Add an event listener for the keydown event when the component mounts
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    // Event handler for the keydown event
    function handleKeydown(event) {
        // Update the position based on the arrow keys
        if (event.key === 'ArrowUp') {
            setPosition((prevPosition) => ({
                ...prevPosition,
                y: prevPosition.rotation != 0 ? prevPosition.y : prevPosition.y - 10,
                rotation: 0
            }));
        } else if (event.key === 'ArrowDown') {
             
            setPosition((prevPosition) => ({
                ...prevPosition,
                y: prevPosition.rotation != 180 ? prevPosition.y : prevPosition.y + 10,
                rotation: 180
            }));
        } else if (event.key === 'ArrowLeft') {
            setPosition((prevPosition) => ({
                ...prevPosition,
                x: prevPosition.rotation != 270 ? prevPosition.x : prevPosition.x - 10,
                rotation: 270
            }));
        } else if (event.key === 'ArrowRight') {
            setPosition((prevPosition) => ({
                ...prevPosition,
                x: prevPosition.rotation != 90 ? prevPosition.x : prevPosition.x + 10,
                rotation: 90
            }));
        }
    }

    return (
        <div className="tank-holder" style={{ 
            left: position.x,
            top: position.y,
            transform: 'rotate('+position.rotation+'deg)'
        }}>
            {console.log(position)}
            <TankView></TankView>
        </div>
    );
}

export default TankPresenter;