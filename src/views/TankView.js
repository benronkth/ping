function TankView({ id, name, damageTaken, maxHealth, size, color }) {
    return (<div key={id} className="tank-text" style={{
        width: size + "px",
        height: size + "px",
        color: color,
        outline: "4px dashed " + color,
        borderRadius: "50%"

    }}>
        <div>{maxHealth - damageTaken}</div>
    </div>);
}

export default TankView;