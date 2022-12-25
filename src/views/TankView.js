function TankView({ id, name, damageTaken, maxHealth, size }) {
    return (<div key={id} className="tank-text" style={{
        width: size + "px",
        height: size + "px"
    }}>
        <div>{maxHealth - damageTaken}</div>
    </div>);
}

export default TankView;