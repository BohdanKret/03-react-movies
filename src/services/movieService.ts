import axios from "axios";
const myKey = import.meta.env.VITE_API_KEY;
axios.defaults.baseURL = "https://api.themoviedb.org/3";

export default async function fetchMovies(topic: string, curretPage: number) {
    const response = await axios.get("/search/movie", {
        params: {
            query: topic,
            page: curretPage,
        },
        headers: {
            accept: "application/json",
            Authorization:
                `Bearer ${myKey}`,
        }
    });
  return response.data.results;
}
