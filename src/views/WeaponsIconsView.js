function WeaponsIconsView({ weapon }) {


    let image = process.env.PUBLIC_URL + "images/" + weapon.image;

    return (<div className="artifact-flag animate__animated animate__bounce ">
       
        <div className="flex-row">
            <div className={"artifact-flag-content "} style={{
                backgroundImage: "url(" + image + ")"
            }}>
            </div>
            <div className="flex-column">
                <div className="weapon-stats attack-value">{weapon.attack}</div>
                <div className="weapon-stats speed-value">{weapon.speed}</div>
                <div className="weapon-stats health-value">{weapon.maxHealth}</div> 
            </div>
            <div style={{fontSize: "1.5rem", marginLeft: "2px"}}>{weapon.ammo}</div>
        </div>
    </div>);
}

export default WeaponsIconsView;