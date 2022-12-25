import bulletDownImage from '../assets/image/bulletDown.svg';
import bulletUpImage from '../assets/image/bulletUp.svg';
import bulletLeftImage from '../assets/image/bulletLeft.svg';
import bulletRightImage from '../assets/image/bulletRight.svg';
import { orientations } from '../maps/maps';


function BulletView({ id, orientation, position, size }) {

    let bulletImage = bulletUpImage;
    switch (orientation) {
        case orientations.up:
            bulletImage = bulletUpImage;
            break;
        case orientations.down:
            bulletImage = bulletDownImage;
            break;
        case orientations.left:
            bulletImage = bulletLeftImage;
            break;
        case orientations.right:
            bulletImage = bulletRightImage;
            break; 
    }

    return (
        <div key={id} className="bullet" style={{
            top: (position.r * size) + "px",
            left: (position.c * size) + "px",
            width: size + "px",
            height: size + "px",
            backgroundImage: `url(${bulletImage})`,
        }} >
        </div>);
}

export default BulletView;