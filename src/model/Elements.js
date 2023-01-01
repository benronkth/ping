import { artifactExpiry, artifactTypes, elementTypes, getLocations, orientations } from "./Game";


export function getNewPlayer(params) {
    if (!params) {
        params = {};
    }
    return {
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        name: params.name ? params.name : "temp",
        isAlive: true,
        maxLivesCount: params.maxLivesCount ? params.maxLivesCount : 5,
        deathCount: 0,
        locations: params.locations,
        color: params.color ? params.color : "#123123",
        acheivedArtifacts: params.acheivedArtifacts ? params.acheivedArtifacts : [], 
    };
}


export function getNewWall(params) {
    if (!params) {
        params = {};
    }
    return {
        name: "",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        type: elementTypes.wall,
        image: params.image ? params.image : "wall.svg",
        blocked: params.blocked ? params.blocked : true,
        maxHealth: params.maxHealth ? params.maxHealth : 5,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        hitAudio: "click.wav",
        destroyAudio: "wallDestroy.mp3",
    };
}

export function getNewMetalWall(params) {
    if (!params) {
        params = {};
    }
    return {
        name: "",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        type: elementTypes.wall,
        image: params.image ? params.image : "metalWall.svg",
        blocked: params.blocked ? params.blocked : true,
        maxHealth: params.maxHealth ? params.maxHealth : 50,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 10,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        hitAudio: "click.wav",
        destroyAudio: "wallDestroy.mp3",
    };
}



export function getNewTarget(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "target",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        ownerId: params.ownerId ? params.ownerId : 0,
        type: elementTypes.target,
        image: params.image ? params.image : "target2.svg",
        color: params.color ? params.color : "#123123",
        blocked: true,
        maxHealth: params.maxHealth ? params.maxHealth : 500,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}


export function getNewTank(params) {
    if (!params) {
        params = {};
    }

    const tankId = Math.ceil(Math.random() * 10000);
    return {
        name: params.name ? params.name : "temp",
        id: params.id ? params.id : tankId,
        ownerId: params.ownerId ? params.ownerId : 0,
        type: elementTypes.tank,
        orientation: params.orientation ? params.orientation : orientations.up,
        image: params.image ? params.image : "tank.svg",
        color: params.color ? params.color : "#123123",
        blocked: true,
        maxHealth: params.maxHealth ? params.maxHealth : 100,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 10,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        weapon: params.weapon ? params.weapon : getNewWallWeapon({
            color: params.color ? params.color : "#123123",
            ownerTankId: params.id ? params.id : tankId,
        }),
        invertInput: false
    };
}


export function getNewWeapon(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "1>1",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        ownerTankId: params.ownerTankId ? params.ownerTankId : "temp",
        type: elementTypes.weapon,
        audio: "shoot.wav",
        image: params.image ? params.image : "bullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 1,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        speed: params.speed ? params.speed : 1,
        ammo: params.ammo ? params.ammo : 100,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}
// ----------------------------------- weapon artifacts ----------------------------------------

export function getNewRocketWeapon(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "2>1",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        type: elementTypes.weapon,
        ownerTankId: params.ownerTankId ? params.ownerTankId : "temp",
        audio: "pistol.mp3",
        image: params.image ? params.image : "rocketBullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 10,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 2,
        speed: params.speed ? params.speed : 1,
        ammo: params.ammo ? params.ammo : 10,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}


export function getNewRocketArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.ammo ? params.ammo : "2>1",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        image: params.image ? params.image : "rocketArtifact.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        audio: "weaponCollect.wav",
        artifactType: artifactTypes.tank,
        weapon: getNewRocketWeapon({ammo: params.ammo})
    };
}


export function getNewAtomRocketWeapon(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "3>1",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        ownerTankId: params.ownerTankId ? params.ownerTankId : "temp",
        type: elementTypes.weapon,
        audio: "pistol.mp3",
        image: params.image ? params.image : "atomBullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 3,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 3,
        speed: params.speed ? params.speed : 1,
        ammo: params.ammo ? params.ammo : 10,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}


export function getNewAtomRocketArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.ammo ? params.ammo : "3>1",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        image: params.image ? params.image : "atomBullet.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        audio: "weaponCollect.wav",
        artifactType: artifactTypes.tank,
        weapon: getNewAtomRocketWeapon({ ammo: params.ammo })
    };
}

export function getNewHRocketWeapon(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "3>2",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        ownerTankId: params.ownerTankId ? params.ownerTankId : "temp",
        type: elementTypes.weapon,
        audio: "pistol.mp3",
        image: params.image ? params.image : "hBullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 5,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 3,
        speed: params.speed ? params.speed : 2,
        ammo: params.ammo ? params.ammo : 10,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}


export function getNewHRocketArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.ammo ? params.ammo : "3>2",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        image: params.image ? params.image : "hBullet.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        audio: "weaponCollect.wav",
        artifactType: artifactTypes.tank,
        weapon: getNewHRocketWeapon({ ammo: params.ammo })
    };
}


export function getNewWallWeapon(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "5",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        ownerTankId: params.ownerTankId ? params.ownerTankId : "temp",
        type: elementTypes.weapon,
        audio: "wall.wav",
        image: params.image ? params.image : "wall.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 5,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        speed: params.speed ? params.speed : 0,
        ammo: params.ammo ? params.ammo : 20,
        blocked: true,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        hitAudio: "click.wav",
        destroyAudio: "wallDestroy.mp3",
    };
}


export function getNewWallWeaponArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.ammo ? params.ammo : "5",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        image: params.image ? params.image : "wallCreation.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        audio: "weaponCollect.wav",
        artifactType: artifactTypes.tank,
        weapon: getNewWallWeapon({ ammo: params.ammo })
    };
}





export function getNewMetalWallWeapon(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "50",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        ownerTankId: params.ownerTankId ? params.ownerTankId : "temp",
        type: elementTypes.weapon,
        audio: "wall.wav",
        image: params.image ? params.image : "metalWall.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 50,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 10,
        speed: params.speed ? params.speed : 0,
        ammo: params.ammo ? params.ammo : 10,
        blocked: true,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        hitAudio: "click.wav",
        destroyAudio: "wallDestroy.mp3",
    };
}


export function getNewMetalWallWeaponArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.ammo ? params.ammo : "50",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        image: params.image ? params.image : "metalWallCreation.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        audio: "weaponCollect.wav",
        artifactType: artifactTypes.tank,
        weapon: getNewMetalWallWeapon({ ammo: params.ammo })
    };
}



export function getNewExpoWeapon(params) {
    if (!params) {
        params = {};
    }
 

    return {
        name: params.name ? params.name : "5>0",
        id: params.id ? params.id : Math.ceil(Math.random() * 10000),
        ownerTankId: params.ownerTankId ? params.ownerTankId : "temp",
        type: elementTypes.weapon,
        audio: "pistol.mp3",
        destroyAudio: "pistol.mp3",
        image: params.image ? params.image : "expo.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 25,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 50,
        speed: params.speed ? params.speed : 0,
        ammo: params.ammo ? params.ammo : 10,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}


export function getNewExpoWeaponArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.ammo ? params.ammo : "5>0",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        image: params.image ? params.image : "expo.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        audio: "weaponCollect.wav",
        artifactType: artifactTypes.tank,
        weapon: getNewExpoWeapon({ ammo: params.ammo })
    };
}



// ----------------------------------- Tank artifacts ----------------------------------------

export function getNewDecreaseDamageTakenArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.damageTaken ? "+" + params.damageTaken : "+100",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        audio: "damageReset.wav",
        image: params.image ? params.image : "wrench.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        artifactType: artifactTypes.tank,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
    };
}


export function getNewGainDamageTakenArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.damageTaken ? "-" + params.damageTaken : "-100",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        audio: "damageReset.wav",
        image: params.image ? params.image : "poo.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        artifactType: artifactTypes.tank,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        weapon: getNewWeapon(),
        invertInput: false
    };
}

export function getNewRandomPositionArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        audio: "damageReset.wav",
        image: params.image ? params.image : "hole.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        artifactType: artifactTypes.tank,
        randomPosition: params.randomPosition
    };
}


export function getNewInvertInputArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        artifactType: artifactTypes.tank,
        audio: "damageReset.wav",
        image: params.image ? params.image : "invert.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        invertInput: true,
    };
}

//  --------------------------------- world artifacts -------------------------------------------


export function getNewSwapTankArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "",
        id: params.id ? params.id : "art" + Math.ceil(Math.random() * 10000),
        creationDate: Date.now(),
        expiryDate: Date.now() + artifactExpiry * 1000,
        type: elementTypes.artifact,
        artifactType: artifactTypes.world,
        audio: "damageReset.wav",
        image: params.image ? params.image : "swap.svg",
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        swapTank: true,
    };
}





