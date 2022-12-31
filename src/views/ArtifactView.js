function ArtifactView({ artifact, size }) {

    return (
        <div key={artifact.id + "2"} className="animate__animated animate__infinite animate__fadeIn ">
            <div key={artifact.id} className={"artifact " + artifact.image} style={{
                top: (artifact.position.r * size) + "px",
                left: (artifact.position.c * size) + "px",
                width: size + "px",
                height: size + "px",
            }} >
            </div>
        </div>);
}

export default ArtifactView;