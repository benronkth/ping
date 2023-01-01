import { useEffect } from "react";
import { opponentTanksAtom, tanksAtom } from "../model/Game";
import WeaponsIconsView from "../views/WeaponsIconsView";
import { useRecoilState } from "recoil";

function WeaponsIconsPresenter({ player }) {
 
    const [tanks, setTanks] = useRecoilState(tanksAtom); 
    const [opponentTanks, setOpponentTanks] = useRecoilState(opponentTanksAtom);

 


    console.log("the player: ", player);
    function drawWeapons(tank) {
        console.log("drawing weapon; ",tank.weapon);
        return <WeaponsIconsView key={tank.weapon.id}
            weapon={tank.weapon}
        ></WeaponsIconsView>;
    }


    return (<div className="flex-row">
        {tanks.filter((t) => t.ownerId === player.id).map(drawWeapons)}
        {opponentTanks.filter((t) => t.ownerId === player.id).map(drawWeapons)}
    </div>);
}

export default WeaponsIconsPresenter;