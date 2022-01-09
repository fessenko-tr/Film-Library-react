import axios from "axios";

class TMDBFetcher {
  static axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
      api_key: "dc350c9efd56dd08a4caaf264a2debb9",
    },
  });

  static fetchTending() {
    return this.axiosInstance.get("/trending/all/day");
  }

  static fetchByQuery(query) {
    return this.axiosInstance.get(`search/movie`, {
      params: {
        query,
      },
    });
  }

  static fetchById(id) {
    return this.axiosInstance.get(`movie/${id}`);
  }

  static fetchCast(id) {
    return this.axiosInstance.get(`movie/${id}/credits`);
  }

  static fetchReviews(id) {
    return this.axiosInstance.get(`movie/${id}/reviews`);
  }
}

export default TMDBFetcher;
