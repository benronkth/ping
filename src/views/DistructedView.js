function DistructedView({ id, position, size, name }) {
    return (<div>
        <div key={id} className="distructed animate__animated animate__zoomOut" style={{
            top: (position.r * size) + "px",
            left: (position.c * size) + "px",
            width: size + "px",
            height: size+ "px"
        }}>{name}</div>
    </div>);
}

export default DistructedView;