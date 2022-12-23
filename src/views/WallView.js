function WallView({id, position, size }) {
    return (
        <div key={id} className="wall" style={{
            top: (position.r * size) + "px",
            left: (position.c * size) + "px",
            width: size + "px",
            height: size + "px"
        }} > 
        </div>
    );
}

export default WallView;