

const USER_KEY = "skillbridgeuse";

export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem(USER_KEY);

  if (data === null) {
    return null;
  }

  return JSON.parse(data);
}