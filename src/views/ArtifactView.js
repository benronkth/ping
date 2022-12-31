function ArtifactView({ artifact, size }) {

    const image = process.env.PUBLIC_URL + "images/" + artifact.image; 
    return (
        <div className="animate__animated animate__fadeIn ">
            <div className={"artifact "} style={{
                top: (artifact.position.r * size) + "px",
                left: (artifact.position.c * size) + "px",
                width: size + "px",
                height: size + "px",
                backgroundImage: "url(" + image + ")"
            }} >
                {artifact.name}
            </div>
        </div>);
}

export default ArtifactView;