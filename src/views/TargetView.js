function TargetView({ id, position, size, name,color }) {
    return (<div>
        <div key={id} className="target" style={{
            top: (position.r * size) + "px",
            left: (position.c * size) + "px",
            width: size + "px",
            height: size + "px",
            backgroundColor: color, 
        }}>{name}</div>
    </div>);
}

export default TargetView;