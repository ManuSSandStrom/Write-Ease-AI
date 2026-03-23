import api from "./api";

export const appService = {
  templates: async (params) => (await api.get("/templates", { params })).data,
  template: async (id) => (await api.get(`/templates/${id}`)).data,
  analytics: async () => (await api.get("/analytics")).data,
  documents: async () => (await api.get("/documents")).data,
  saveDocument: async (payload) => (await api.post("/documents", payload)).data,
  profile: async () => (await api.get("/users/profile")).data,
  updateProfile: async (payload) => (await api.put("/users/profile", payload)).data,
  subscription: async () => (await api.get("/subscriptions")).data,
  updateSubscription: async (payload) =>
    (await api.post("/subscriptions", payload)).data,
  getResume: async () => (await api.get("/resumes")).data,
  saveResume: async (payload, id) =>
    (id ? await api.put(`/resumes/${id}`, payload) : await api.post("/resumes", payload)).data,
  enhanceResume: async (payload) =>
    (await api.post("/resumes/enhance", payload)).data
};

