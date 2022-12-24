function BulletView({ id, position, size }) {
    return ( 
        <div key={id} className="bullet" style={{
            top: (position.r * size) + "px",
            left: (position.c * size) + "px",
            width: size + "px",
            height: size + "px"
        }} > 
        </div>);
}

export default BulletView;