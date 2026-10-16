import { getData, setData } from "./storage";
import { KEYS } from "@/utils/constants";
import { generateId } from "@/utils/helpers";
import { seedUsers } from "@/data/seed";

// Users list lao. Pehli baar khali ho to demo users bhar do.
function getUsers() {
  const users = getData(KEYS.USERS, null);
  if (!users) {
    setData(KEYS.USERS, seedUsers);
    return seedUsers;
  }
  return users;
}

// Session/state me password kabhi mat rakho
function safeUser({ password, ...rest }) {
  return rest;
}

export function signup({ name, email, password, role, companyName }) {
  const users = getUsers();
  const cleanEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === cleanEmail)) {
    throw new Error("Is email se account pehle se hai. Login karo.");
  }

  const newUser = {
    id: generateId("u"),
    name: name.trim(),
    email: cleanEmail,
    password,
    role,
    profile: role === "employer" ? { companyName: companyName?.trim() || "" } : { skills: [] },
  };

  setData(KEYS.USERS, [...users, newUser]);
  return safeUser(newUser);
}

export function login({ email, password }) {
  const cleanEmail = email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === cleanEmail && u.password === password);

  if (!user) throw new Error("Email ya password galat hai.");
  return safeUser(user);
}

// Profile update (naam + profile fields). Naya user object return karta hai
export function updateUser(id, { name, profile } = {}) {
  const users = getUsers().map((u) =>
    u.id === id
      ? { ...u, ...(name ? { name: name.trim() } : {}), profile: { ...u.profile, ...(profile || {}) } }
      : u
  );
  setData(KEYS.USERS, users);
  return safeUser(users.find((u) => u.id === id));
}
