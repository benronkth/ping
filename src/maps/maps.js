
export const elementTypes = {
    wall: "wall",
    target: "target",
    tank: "tank",
    bullet: "bullet",
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
            "wwwwwwwwww",
            "wwa00000ww",
            "www000ww0w",
            "w00000000w",
            "ww0wwwwwww",
            "wwwww0wwww",
            "wwwww0000w",
            "w0000000ww",
            "w0www0wwww",
            "wwwwwxwwww",
        ],
        bullets: [],
        tanks: [{
            name: "Ahmad",
            id: "AhamdTank",
            type: elementTypes.tank,
            orientation: orientations.up,
            position: {
                r: 3,
                c: 3,
            },
            bullet: {
                name: "bullet",
                id: "ahmadbullet",
                type: elementTypes.bullet,
                orientation: orientations.up,
                position: {
                    r: 0,
                    c: 0,
                }
            }
        }],
        w: {
            name: "wall",
            id: "wall",
            type: elementTypes.wall,
            blocked: true,
            position: {
                r: 0,
                c: 0,
            }
        },


        x: {
            name: "Ahm",
            type: elementTypes.target,
            id: "AhamdTarget",
            blocked: true,
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
            position: {
                r: 0,
                c: 0,
            }
        },

    },

    map2: {
        elements: [
            "wwwwwwwwwwwwwwwwwwww",
            "wwa00000w1wwwwwwwwww",
            "wwwww0ww0wwwwwwwwwww",
            "w0000000000000000www",
            "ww0wwtwwwwwwww0w0www",
            "wwwww0wwww0wwwww0www",
            "wwwww0000w0wwwww0www",
            "w0000000ww0wwwww0www",
            "w0www0w0000wwwwwbwww",
            "wwwwwxwwwwwwwwwwwwww",
        ],
        w: {
            name: "wall",
            type: elementTypes.wall,
            blocked: true,
            position: {
                r: 0,
                c: 0,
            }
        },


        1: {
            name: "bullet",
            type: elementTypes.bullet,
            position: {
                r: 0,
                c: 0,
            }
        },
        t: {
            name: "Ahmad",
            type: elementTypes.tank,
            position: {
                r: 0,
                c: 0,
            }
        },


        x: {
            name: "Ahm",
            type: elementTypes.target,
            blocked: true,
            position: {
                r: 0,
                c: 0,
            }
        },


        a: {
            name: "Ben",
            type: elementTypes.target,
            blocked: true,
            position: {
                r: 0,
                c: 0,
            }
        },
        b: {
            name: "BASH",
            type: elementTypes.target,
            blocked: true,
            position: {
                r: 0,
                c: 0,
            }
        },

    }

}

console.log(maps.map1.w);