import { auth } from "../services/firebase";
import { functionUrl } from "../services/cloudfunction";
import axios from "axios";

// TODO throws error when request failed
// TODO Since the same request is called over and over again, it's better to store it in state or Redux, or to cache it.

export function getCurrentAuthUser() {
  return auth().currentUser;
}
export async function getUser(email) {
  const res = await axios.get(`${functionUrl}/users/${email}`);
  return res.data;
}

export async function getUserFromCurrentAuthUser() {
  const currentUser = getCurrentAuthUser();
  const user = await getUser(currentUser.email);
  return user;
}

export async function createUser(name, email) {
  const params = {
    name: name,
    email: email,
  };
  const res = await axios.post(`${functionUrl}/users`, params);
  return res.data;
}

export async function updateUser(userId, body) {
  const res = await axios.put(`${functionUrl}/users/${userId}`, body);
  return res.data;
}

export async function deleteUser(userId) {
  const res = await axios.delete(`${functionUrl}/users/${userId}`);
  return res.data;
}

/**
 * updates user status
 * @param  {String} userId id of the user
 * @param  {String} newStatus new status, status should be one of ACTIVE, BUSY, OFFLINE
 * @return {User} updated user
 */
export async function updateUserStatus(userId, newStatus) {
  return updateUser(userId, {
    status: newStatus,
  });
}

/**
 * updates user avatar
 * @param  {String} userId id of the user
 * @param {String} newAvatar updated avatar
 * @return {User} updated user
 */
export async function updateAvatar(userId, newAvatar) {
  return updateUser(userId, {
    avatar_url: newAvatar,
  });
}

/**
 * updates user lang
 * @param  {String} userId id of the user
 * @param {String} newLanguage updated avatar
 * @return {User} updated user
 */
export async function updateLanguage(userId, newLanguage) {
  return updateUser(userId, {
    lang: newLanguage,
  });
}

/**
 * updates user answers
 * @param  {String} userId id of the user
 * @param {Answers} newAnswers updated answers
 * @return {User} updated user
 */
export async function updateAnswers(userId, newAnswers) {
  return updateUser(userId, {
    answers: newAnswers,
  });
}

export async function addToBlockList(userId, currentList, target) {
  // taregt => { id: geaewg, name: "hellomy" }
  currentList.push(target);
  return updateUser(userId, {
    blocklist: currentList,
  });
}

export async function removeFromBlockList(userId, currentList, targetName) {
  let removedList = currentList.filter((obj) => {
    return obj.name !== targetName;
  });
  return updateUser(userId, {
    blocklist: removedList,
  });
}

export async function postChatQueue(userId) {
  return axios.post(`${functionUrl}/chatqueue`, {
    id: userId,
  });
}

// note: Not using await once because the existing code's error handling is now using PROMISE (code change needed to be made to use try/catch)
export async function getChatQueue(userId) {
  return axios.get(`${functionUrl}/chatqueue/${userId}`);
}

export async function deleteChatQueue(roomId) {
  return axios.delete(`${functionUrl}/chatqueue/${roomId}`);
}
