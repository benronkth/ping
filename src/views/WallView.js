function WallView({ wall, size }) {

    const opacity = (wall.maxHealth - wall.damageTaken) / wall.maxHealth; 
    const image = process.env.PUBLIC_URL + "images/" + wall.image; 
    return (
        <div  className="wall" style={{
            top: (wall.position.r * size) + "px",
            left: (wall.position.c * size) + "px",
            width: size + "px",
            height: size + "px",
            opacity: opacity < 0 ? 0 : opacity + 0.3,
            backgroundImage: "url("+image+")"
        }} >{wall.name}  
        </div>
    );
}

export default WallView;