// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, remove, set, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseConfig } from "./config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);

export const db = getDatabase(app);

export function uploadTank(gameId, tank) {
    console.log("uploading tank: , ", tank)

    update(ref(db, 'games/' + gameId + "/tanks/" + tank.id + "/"), {
        ...tank,
    });
}
export function removeTank(gameId, tank) {
    remove(ref(db, 'games/' + gameId + "/tanks/" + tank.id + "/"));
}

export function uploadTarget(gameId, target) {

    update(ref(db, 'games/' + gameId + "/targets/" + target.id + "/"), {
        ...target,
    });

}

export function removeTarget(gameId, target) {
    remove(ref(db, 'games/' + gameId + "/targets/" + target.id + "/"));

}

export function uploadBullet(gameId, bullet) {
    update(ref(db, 'games/' + gameId + "/bullets/" + bullet.id + "/"), {
        ...bullet,
    });

}

export function removeBullet(gameId, bullet) {
    remove(ref(db, 'games/' + gameId + "/bullets/" + bullet.id + "/"));
}


export function uploadWall(gameId, wall) {
    update(ref(db, 'games/' + gameId + "/walls/" + wall.id + "/"), {
        ...wall,
    });
}

export function removeWall(gameId, wall) {
    remove(ref(db, 'games/' + gameId + "/walls/" + wall.id + "/"));
}

export function uploadPlayer(gameId, player) {

    console.log(player);
    update(ref(db, 'games/' + gameId + "/players/" + player.id + "/"), {
        ...player,
    });
}

export function removePlayer(gameId, playerId) {
    remove(ref(db, 'games/' + gameId + "/players/" + playerId + "/"));
}


export function uploadIsGameStarted(gameId, isGameStarted) {
    update(ref(db, 'games/' + gameId + "/isGameStarted/"), {
        ...isGameStarted,
    });
}




export function removeGame(gameId) {
    remove(ref(db, 'games/' + gameId));
}


export function uploadGame(gameId, player, boardSize, walls, tanks, targets, map) {

    const tempTanks = {};
    for (let i = 0; i < tanks.length; i++) {
        const tank = tanks[i];
        tempTanks[tank.id] = tank;
    }
    const tempTargets = {};
    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        tempTargets[target.id] = target;
    }
    const tempWalls = {};
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        tempWalls[wall.id] = wall;
    }

    set(ref(db, 'games/' + gameId), {
        gameId,
        gameOwnerId: player.id,
        isGameStarted: false,
        boardSize,
        tanks: tempTanks,
        targets: tempTargets,
        walls: tempWalls,
        map
    });
    uploadPlayer(gameId, player);

}



export const auth = getAuth();
export async function signUpUser(name, email, password, onSignIn, onError) {

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName: name });
        const user = res.user;
        onSignIn(user);

    } catch (error) {
        const errorMessage = error.message;
        if (error.code === "auth/email-already-in-use") {
            onError("You are already registered, please log in instead.");
        } else if (error.code === "auth/weak-password") {
            onError("Please enter a password that is at least 6 characters long.");
        } else if (error.code === "auth/invalid-email") {
            onError("Please enter a valid email.");
        } else {
            onError(errorMessage);
        }
    }


}

export function signInUser(email, password, onSignIn, onError) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if (onSignIn) {
                onSignIn(user);
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (onError) {
                onError(error);
            }
        });
}

export function signOutUser(onSignOut, onError) {

    signOut(auth).then(() => {
        // Sign-out successful.
        if (onSignOut) {
            onSignOut();
        }
    }).catch((error) => {
        // An error happened.
        if (onError) {
            onError(error);
        }
    });

}