import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { type Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topic, setTopic] = useState<string>("");
  const [curretPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const hendalSearch = (newTopic: string) => {
    setTopic(newTopic);
    setMovies([]);
    setCurrentPage(1);
  };

  const onModalClose = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  const onModalOpen = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (!topic) return;

    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchMovies(topic, curretPage);
        if (data.length === 0) {
          toast.error("No movies found for your request.");
          return;
        }
        setMovies((prevMovies) => [...prevMovies, ...data]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [topic, curretPage]);

  const isMouvieTrue = movies.length > 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={hendalSearch} />
      {isMouvieTrue && <MovieGrid movies={movies} onSelect={onModalOpen} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && (
        <MovieModal onClose={onModalClose} movie={selectedMovie} />
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
