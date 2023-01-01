import { artifactExpiry, artifactTypes, elementTypes, getLocations, orientations } from "./Game";


export function getNewPlayer(params) {
    if (!params) {
        params = {};
    }
    return {
        id: params.id ? params.id : "temp",
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
        id: params.id ? params.id : "temp",
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
        id: params.id ? params.id : "temp",
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
        id: params.id ? params.id : "temp",
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
    return {
        name: params.name ? params.name : "temp",
        id: params.id ? params.id : "temp",
        ownerId: params.ownerId ? params.ownerId : 0,
        type: elementTypes.tank,
        orientation: params.orientation ? params.orientation : orientations.up,
        image: params.image ? params.image : "tank.svg",
        color: params.color ? params.color : "#123123",
        blocked: true,
        maxHealth: params.maxHealth ? params.maxHealth : 50,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 10,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        bullet: params.bullet ? params.bullet : getNewBullet({
            color: params.color ? params.color : "#123123"
        }),
        invertInput: false
    };
}


export function getNewBullet(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "bullet",
        id: params.id ? params.id : "temp",
        type: elementTypes.bullet,
        audio: "shoot.wav",
        image: params.image ? params.image : "bullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 1,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        speed: params.speed ? params.speed : 1,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}
// ----------------------------------- weapon artifacts ----------------------------------------

export function getNewRocketBullet(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "2>1",
        id: params.id ? params.id : "rocketBullet" + Math.ceil(Math.random() * 10000),
        type: elementTypes.bullet,
        audio: "pistol.mp3",
        image: params.image ? params.image : "rocketBullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 1,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 2,
        speed: params.speed ? params.speed : 1,
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
        name: params.name ? params.name : "2>1",
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
        bullet: getNewRocketBullet()
    };
}


export function getNewAtomRocketBullet(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "3>1",
        id: params.id ? params.id : "rocketBullet" + Math.ceil(Math.random() * 10000),
        type: elementTypes.bullet,
        audio: "pistol.mp3",
        image: params.image ? params.image : "atomBullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 3,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 3,
        speed: params.speed ? params.speed : 1,
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
        name: params.name ? params.name : "3>1",
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
        bullet: getNewAtomRocketBullet()
    };
}

export function getNewHRocketBullet(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "3>2",
        id: params.id ? params.id : "rocketBullet" + Math.ceil(Math.random() * 10000),
        type: elementTypes.bullet,
        audio: "pistol.mp3",
        image: params.image ? params.image : "hBullet.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 5,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 3,
        speed: params.speed ? params.speed : 2,
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
        name: params.name ? params.name : "3>2",
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
        bullet: getNewHRocketBullet()
    };
}


export function getNewExpoBullet(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "3>0",
        id: params.id ? params.id : "rocketBullet" + Math.ceil(Math.random() * 10000),
        type: elementTypes.bullet,
        audio: "pistol.mp3",
        image: params.image ? params.image : "wall.svg",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 5,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        speed: params.speed ? params.speed : 0,
        blocked: true,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        hitAudio: "click.wav",
        destroyAudio: "wallDestroy.mp3",
    };
}


export function getNewExpoArtifact(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name : "3>0",
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
        bullet: getNewExpoBullet()
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
        bullet: getNewBullet(),
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







