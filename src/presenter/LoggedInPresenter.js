import { useRecoilState } from "recoil";
import { isGameCreatedAtom, isGameStartedAtom } from "../model/Game";
import LoggedInView from "../views/LoggedInView"; 
import BoardPresenter from "./BoardPresenter";

function LoggedInPresenter() {
    const [isGameCreated, setIsGameCreated] = useRecoilState(isGameCreatedAtom);
 
    return (
        <div>

            {isGameCreated ? <BoardPresenter></BoardPresenter> : <LoggedInView></LoggedInView>}

        </div>
        
        );
}

export default LoggedInPresenter;