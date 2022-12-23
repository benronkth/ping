function TankView({id,  name, size }) {
    return (<div key={id} className="tank-text" style={{
        width: size + "px",
        height: size + "px"
    }}>
        <div>{name}</div>
    </div>);
}

export default TankView;