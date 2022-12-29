import { useRecoilState } from "recoil";
import { blockSizeAtom, distructedsAtom } from "../model/Game";
import DistructedView from "../views/DistructedView"; 
 
function DistructedPresenter() {
    const [distructeds, setDistructeds] = useRecoilState(distructedsAtom);
    const [blockSize, setBlockSize] = useRecoilState(blockSizeAtom); 
 
      
    function drawDistructed(element) {
        console.log("drawing distructeds");
        return <DistructedView key={element.id}
            id={element.id}
            position={element.position}
            size={blockSize}
            name={element.name}
        > ({element.r}) </DistructedView>;

    }
    return (<div>
        {distructeds.map(drawDistructed)}</div>);
}

export default DistructedPresenter;