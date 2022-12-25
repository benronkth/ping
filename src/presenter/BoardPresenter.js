import { useRecoilState } from "recoil";
import BackgroundView from "../views/BackgroundView"
import WallView from "../views/WallView"
import TankView from "../views/TankView"
import TargetView from "../views/TargetView"
import { createGame, stateAtom } from "../model/Game";
import { elementTypes, orientations } from "../maps/maps";


import { useEffect } from "react";
import TankPresenter from "./TankPresenter";
import BulletView from "../views/BulletView";
import DistructedView from "../views/DistructedView";
function BoardPresenter() {
    const [state, setState] = useRecoilState(stateAtom);
    const blockSize = 48;
    useEffect(() => {
        setState(createGame());
    }, []);


    console.log(state);
    function drawBoard(element) {

        switch (element.type) {
            case elementTypes.wall:
                return <WallView key={element.id}
                    position={element.position}
                    size={blockSize}
                    id={element.position}
                    name={element.name}
                    damageTaken={element.damageTaken}
                    maxHealth={element.maxHealth}
                > ({element.r}) </WallView>;
            case elementTypes.target:
                return <TargetView key={element.id}
                    position={element.position}
                    size={blockSize}
                    name={element.name}
                    id={element.id}
                    damageTaken={element.damageTaken}
                    maxHealth={element.maxHealth}
                > ({element.r}) </TargetView>;
            case elementTypes.bullet:
                return <BulletView key={element.id}
                    position={element.position}
                    size={blockSize}
                    name={element.name}
                    id={element.id}
                > ({element.r}) </BulletView>;

            case elementTypes.tank:
                return <TankPresenter key={element.id}
                    position={element.position}
                    orientation={element.orientation}
                    size={blockSize}
                    name={element.health}
                    id={element.id}
                    damageTaken={element.damageTaken}
                    maxHealth={element.maxHealth}
                > ({element.r}) </TankPresenter>;

            case elementTypes.distructed:
                return <DistructedView key={element.id}
                    position={element.position}
                    size={blockSize}
                    name={element.name}
                    id={element.id}
                > ({element.r}) </DistructedView>;
        }
    }
    function drawBullets(element) {
        // console.log("bullet is", element); 
        return <BulletView key={element.id}
            position={element.position}
            size={blockSize}
            name={element.name}
            id={element.id}
            orientation={element.orientation}
        > ({element.r}) </BulletView>;

    }


    function drawTanks(element) {
        return <TankPresenter key={element.id}
            position={element.position}
            orientation={element.orientation}
            size={blockSize}
            name={element.name}
            id={element.id}
        > ({element.r}) </TankPresenter>;

    }


    return (<div>
        {state.board.map(drawBoard)}
        {state.bullets.map(drawBullets)}
        {/* {state.tanks.map(drawTanks)} */}
        {/* <BackgroundView></BackgroundView> */}
    </div>);
}

export default BoardPresenter;