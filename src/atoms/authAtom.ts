import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const authState = atom({
  key: "authState", // Unique key for Recoil state
  default: {
    token: null,
    user: {
      email: null,
      role: null,
      userId: null,
    },
  },
  effects_UNSTABLE: [persistAtom], // Persist state across sessions
});
