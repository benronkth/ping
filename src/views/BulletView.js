import { orientations } from '../model/Game';


function BulletView({ imageClass, id, orientation, position, size }) {

    let rotation = 0;
    switch (orientation) {
        case orientations.up:
            rotation = 0;
            break;
        case orientations.down:
            rotation = 180;
            break;
        case orientations.left:
            rotation = 270;
            break;
        case orientations.right:
            rotation = 90;
            break;
    }

    return (
        <div key={id} className={"bullet " + imageClass} style={{
            top: (position.r * size) + "px",
            left: (position.c * size) + "px",
            width: size + "px",
            height: size + "px",
            rotate: rotation + "deg"
        }} >
        </div>);
}

export default BulletView;