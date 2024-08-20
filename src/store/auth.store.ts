import { decrypt } from "@/lib/crypth";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
import { del, get, set } from "idb-keyval";
import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  StateStorage,
} from "zustand/middleware";

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  role: string;
}

interface State {
  user: IUser;
  setUser: (_: IUser) => void;
}

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

function setCookie(
  key: any,
  value: any,
  expireDays: any,
  expireHours: any,
  expireMinutes: any,
  expireSeconds: any
) {
  var expireDate = new Date();
  if (expireDays) {
    expireDate.setDate(expireDate.getDate() + expireDays);
  }
  if (expireHours) {
    expireDate.setHours(expireDate.getHours() + expireHours);
  }
  if (expireMinutes) {
    expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
  }
  if (expireSeconds) {
    expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
  }
  Cookies.set(key, value, {
    expires: expireDate,
    path: "/",
    domain: window.location.hostname,
  });
}

function deleteCookie(name: any) {
  Cookies.remove(name, {
    path: "/",
    domain: window.location.hostname,
  });
}

const onExit = async () => {
  Cookies.remove("token-client", {
    path: "/",
    domain: window.location.hostname,
  });
  indexedDB.deleteDatabase("store-client");
  window.location.replace("/login");
};

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        user: {} as IUser,
        setUser: (t: any) =>
          set((prev) => ({ ...prev, user: { ...prev.user, ...t } })),
      }),
      {
        name: "store-client",
        storage: createJSONStorage(() => storage),
      }
    )
  )
);

export const useToken = () => {
  const data: any = getCookie("token-client", {});
  if (!!data) {
    return {
      token: decrypt(data),
    };
  } else {
    return {
      token: null,
    };
  }
};

export { deleteCookie, onExit, setCookie };
