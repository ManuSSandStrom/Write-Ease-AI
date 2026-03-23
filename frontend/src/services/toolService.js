import api from "./api";

export const toolService = {
  humanize: async (payload) => (await api.post("/tools/humanizer", payload)).data,
  paraphrase: async (payload) => (await api.post("/tools/paraphraser", payload)).data,
  grammar: async (payload) => (await api.post("/tools/grammar", payload)).data,
  plagiarism: async (payload) => (await api.post("/tools/plagiarism", payload)).data,
  exportFile: async (payload) =>
    api.post("/export", payload, { responseType: "blob" })
};

