
export const elementTypes = {
    space: "space",
    wall: "wall",
    target: "target",
    tank: "tank",
    bullet: "bullet",
    distructed: "distructed",
}

export const orientations = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}


export const maps = {

    map1: {
        elements: [
            "wwwwwawwww",
            "wwasssssww",
            "wwwssswwsw",
            "wssssssssw",
            "wwstwwwwww",
            "wwwwwswwww",
            "wwwwwtsssw",
            "wsssssssww",
            "wswwwswwww",
            "wwwwwxwwww",
        ], 
        s: {
            type: elementTypes.space,
            position: {
                r: 0,
                c: 0,
            }
        },
        w: {
            name: "",
            id: "wall",
            type: elementTypes.wall,
            blocked: true,
            distructable: true,
            maxHealth: 50,
            damageTaken: 0,
            position: {
                r: 0,
                c: 0,
            }
        },

        t: {
            name: "Ahmad",
            id: "AhamdTank1",
            type: elementTypes.tank,
            orientation: orientations.up,
            blocked: true,
            distructable: true,
            maxHealth: 50,
            damageTaken: 0,
            position: {
                r: 3,
                c: 3,
            },
            bullet: {
                name: "bullet",
                id: "ahmadbullet",
                type: elementTypes.bullet,
                orientation: orientations.up,
                attack: 8,
                position: {
                    r: 0,
                    c: 0,
                }
            }
        },

        x: {
            name: "Ahmad",
            type: elementTypes.target,
            id: "AhamdTarget",
            blocked: true,
            distructable: true,
            maxHealth: 150,
            damageTaken: 0,
            position: {
                r: 0,
                c: 0,
            }
        },


        a: {
            name: "Ben",
            type: elementTypes.target,
            id: "BenTarget",
            blocked: true,
            distructable: true,
            maxHealth: 50,
            damageTaken: 0,
            position: {
                r: 0,
                c: 0,
            }
        },

    },
 

}

console.log(maps.map1.w);