function TargetView({ target, size }) {
    const image = process.env.PUBLIC_URL + "images/" + target.image;
    return (<div>
        <div className="target" style={{
            top: (target.position.r * size) + "px",
            left: (target.position.c * size) + "px",
            width: size + "px",
            height: size + "px",
            // backgroundColor: target.color,
            backgroundImage: "url(" + image + ")",
            outline: "8px outset " + target.color
        }}>
            {/* <div>{target.name}</div> */}
        </div>

        <div className="element-svg-text rotate" style={{
            top: (target.position.r * size) + "px",
            left: (target.position.c * size) + "px",
            width: size + "px",
            height: size + "px",
           textShadow: "0px 0px 4px black"
        }}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path
                    id="MyPath"
                    fill="none"
                    stroke="#ffffff00"
                    d="M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z" />

                <text className="white-text">
                    <textPath href="#MyPath" >{target.name + " (❤️" + (target.maxHealth - target.damageTaken) + ")"}</textPath>
                </text>
            </svg>
        </div>
    </div>);
}

export default TargetView;