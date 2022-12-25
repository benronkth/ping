function WallView({ id, damageTaken, maxHealth, name, position, size }) {

    const opacity = (maxHealth - damageTaken) / maxHealth;
    return (
        <div key={id} className="wall" style={{
            top: (position.r * size) + "px",
            left: (position.c * size) + "px",
            width: size + "px",
            height: size + "px",
            opacity: opacity < 0 ? 0 : opacity + 0.3
        }} >{name}
        </div>
    );
}

export default WallView;