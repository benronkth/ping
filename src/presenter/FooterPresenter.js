import { useRecoilState } from "recoil";
import { isGameCreatedAtom } from "../model/Game";
import FooterView from "../views/FooterView";

function FooterPresenter() {

    const [isGameCreated, setIsGameCreated] = useRecoilState(isGameCreatedAtom);
    return (<FooterView isGameCreated={isGameCreated}></FooterView>);
}

export default FooterPresenter;