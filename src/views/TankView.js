function TankView({ id, name, damageTaken, maxHealth, size, color }) {
    return (<div key={id} className="tank-text" style={{
        width: size + "px",
        height: size + "px",
        color: color,
        boxShadow: "0px 0px 8px "+color
    }}>
        <div>{maxHealth - damageTaken}</div>
    </div>);
}

export default TankView;