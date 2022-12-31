import { orientations } from '../model/Game';


function BulletView({ bullet, size }) {

    let rotation = 0;
    switch (bullet.orientation) {
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
    const image = process.env.PUBLIC_URL + "images/" + bullet.image; 

    return (
        <div className={"bullet"} style={{
            top: (bullet.position.r * size) + "px",
            left: (bullet.position.c * size) + "px",
            width: size + "px",
            height: size + "px",
            rotate: rotation + "deg",
            backgroundImage: "url(" + image + ")"
        }} >
        </div>);
}

export default BulletView;