function WeaponsIconsView({ weapon }) {


    let image = process.env.PUBLIC_URL + "images/" + weapon.image;

    return (<div className="artifact-flag animate__animated animate__bounce ">
        <div className={"artifact-flag-content "} style={{
            backgroundImage: "url(" + image + ")"
        }}>
        </div>
        <div>{weapon.name}</div>
    </div>);
}

export default WeaponsIconsView;