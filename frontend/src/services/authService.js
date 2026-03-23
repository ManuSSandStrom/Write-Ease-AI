import api from "./api";

export const authService = {
  sync: async (payload) => (await api.post("/auth/sync", payload)).data,
  me: async () => (await api.get("/auth/me")).data
};
