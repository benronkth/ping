import { useEffect, useState } from "react";
import TankView from "../views/TankView";
import { useRecoilState } from "recoil";
import { stateAtom } from "../model/Game";
import { elementTypes, orientations } from "../maps/maps";

function TankPresenter({ id, position, orientation, size, name }) {

    let rotation = 0;

    switch (orientation) {
        case orientations.right:
            rotation = 90;
            break;
        case orientations.down:
            rotation = 180;
            break;
        case orientations.left:
            rotation = 270;
            break;

    }

    return (
        <div className="tank-holder" style={{
            left: position.c * size,
            top: position.r * size,
            transform: 'rotate(' + rotation + 'deg)'
        }}>
            <TankView
                size={size}
                name={name}
                id={id}
            ></TankView>
        </div>
    );
}

export default TankPresenter;