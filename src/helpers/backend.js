import { auth } from "../services/firebase";
import axios from "axios";

export async function getCurrentAuthUser() {
    return await auth().currentUser;
}

// TODO throws error when request failed
// TODO Since the same request is called over and over again, it's better to store it in state or Redux, or to cache it.

export async function getUser(email) {
    const user = await axios.get(`/users/${email}`);
    return user;
}

export async function getUserFromCurrentAuthUser() {
    const currentUser = getCurrentAuthUser();
    console.log("current User", currentUser);
    const user = await getUser(currentUser.email);
    return user;
}

async function createUser(name, email) {
    const params = {
        name: name,
        email: email,
    };
    const idObj = await axios.post("/users", params);
    return idObj;
}

export async function updateUser(userId, body) {
    return await axios.put(`/users/${userId}`, body);
}

/**
 * updates user status
 * @param  {String} userId id of the user
 * @param  {String} newStatus new status, status should be one of ACTIVE, BUSY, OFFLINE
 * @return {User} updated user
 */
export async function updateUserStatus(userId, newStatus) {
    return updateUser(userId, { status: newStatus });
}