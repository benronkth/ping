import { orientations } from "../model/Game";

function TankView({ tank, size }) {
    // console.log("drawing tanks");
    let rotation = 0;
    switch (tank.orientation) {
        case orientations.right:
            rotation = 90;
            break;
        case orientations.down:
            rotation = 180;
            break;
        case orientations.left:
            rotation = 270;
            break;

    }

    const image = process.env.PUBLIC_URL + "images/" + tank.image;
    return (<div key={tank.id} className="tank" style={{
        width: size + "px",
        height: size + "px",
        left: tank.position.c * size,
        top: tank.position.r * size,
        transform: 'rotate(' + rotation + 'deg)',
        borderRadius: "50%",
        backgroundImage: "url(" + image + ")",
        // outline: "8px outset " + tank.color,
        // outline: "8px outset " + tank.color,
    }}>

        <div className="element-svg-text rotate" style={{
            width: size + "px",
            height: size + "px",      
            scale: "1.8"
        }}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path
                    id="MyPath"
                    fill="none"
                    stroke="#ffffff00"
                    d="M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z" />

                <text className="white-text" style={{ 
                    fill: tank.color,
                }}>
                    <textPath href="#MyPath" >{tank.name + " (❤️" + (tank.maxHealth - tank.damageTaken) + ")"}</textPath>
                </text>
            </svg>
        </div>
        {/* </div> */}
    </div>);
}

export default TankView;    