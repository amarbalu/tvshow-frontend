import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials in requests
});

export const fetchTvShows = async () => {
  try {
    const response = await API.get(`/api/shows`);
    const data = response.data;

    return data.map((show) => ({
      id: show.id,
      name: show.name || "N/A",
      summary: show.summary || "No summary available",
      language: show.language || "Unknown",
      genres: show.genres || "N/A",
      status: show.status || "Unknown",
      network: show.network || "Unknown Network",
      webChannel: show.webChannel || "N/A",
      officialSite: show.officialSite || "N/A",
      imageMediumUrl:
        show.imageMediumUrl || "https://via.placeholder.com/240x360",
      imageOriginalUrl:
        show.imageOriginalUrl || "https://via.placeholder.com/240x360",
      url: show.url || "#",
      type: show.type || "N/A",
      runtime: show.runtime || 0,
      averageRuntime: show.averageRuntime || 0,
      premiered: show.premiered || "N/A",
      ended: show.ended || "N/A",
      schedule: JSON.parse(show.schedule || "{}"),
      rating: show.rating || "N/A",
      weight: show.weight || 0,
      externalImdb: show.externalImdb || "N/A",
      externalTvRage: show.externalTvRage || "N/A",
      externalTheTvDb: show.externalTheTvDb || "N/A",
      lastUpdated: show.lastUpdated || "N/A",
      links: JSON.parse(show.links || "{}"),
    }));
  } catch (error) {
    console.error("Failed to fetch TV shows:", error.message);
    throw new Error("Failed to fetch TV shows");
  }
};

export const fetchTvShowById = async (id) => {
  try {
    const response = await API.get(`/api/shows/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV show:", error);
    throw error;
  }
};
