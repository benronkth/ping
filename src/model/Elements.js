import { elementTypes, getLocations, orientations } from "./Game";


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
        color: params.color ? params.color : "#123123"
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
        image: params.image ? params.image : "wallImage",
        blocked: params.blocked ? params.blocked : true,
        maxHealth: params.maxHealth ? params.maxHealth : 50,
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
        name: params.name ? params.name.substring(0, 3) : "temp",
        id: params.id ? params.id : "temp",
        ownerId: params.ownerId ? params.ownerId : 0,
        type: elementTypes.tank,
        orientation: params.orientation ? params.orientation : orientations.up,
        image: params.image ? params.image : "tankImage",
        color: params.color ? params.color : "#123123",
        blocked: true,
        maxHealth: params.maxHealth ? params.maxHealth : 50,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        },
        bullet: params.bullet ? params.bullet : getNewBullet({
            color: params.color ? params.color : "#123123"
        })
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
        image: params.image ? params.image : "bulletImage",
        orientation: params.orientation ? params.orientation : orientations.up,
        color: params.color ? params.color : "#123123",
        maxHealth: params.maxHealth ? params.maxHealth : 1,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 8,
        speed: params.speed ? params.speed : 1,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}


export function getNewTarget(params) {
    if (!params) {
        params = {};
    }
    return {
        name: params.name ? params.name.substring(0, 3) : "target",
        id: params.id ? params.id : "temp",
        ownerId: params.ownerId ? params.ownerId : 0,
        type: elementTypes.target,
        image: params.image ? params.image : "targetImage",
        color: params.color ? params.color : "#123123",
        blocked: true,
        maxHealth: params.maxHealth ? params.maxHealth : 150,
        damageTaken: params.damageTaken ? params.damageTaken : 0,
        attack: params.attack ? params.attack : 1,
        position: params.position ? params.position : {
            r: 0,
            c: 0,
        }
    };
}