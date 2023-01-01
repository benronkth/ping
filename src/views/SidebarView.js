import { useRecoilState } from "recoil";
import FooterPresenter from "../presenter/FooterPresenter";
import GameControlPresenter from "../presenter/GameControlPresenter";
import HeaderPresenter from "../presenter/HeaderPresenter";
import { isGameCreatedAtom } from "../model/Game";

function SidebarView() {
    const [isGameCreated, setIsGameCreated] = useRecoilState(isGameCreatedAtom);
    return (<div className="sidebar">

        {isGameCreated ? <GameControlPresenter></GameControlPresenter> : <div></div>}
        <FooterPresenter></FooterPresenter>
        <HeaderPresenter></HeaderPresenter> 


    </div> );
}

export default SidebarView;