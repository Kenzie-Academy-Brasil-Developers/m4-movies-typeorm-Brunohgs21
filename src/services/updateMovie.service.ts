import { TMovieUpdate, TMovieReturn } from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { movieSchema } from "../schemas/movies.schemas";
import { Repository } from "typeorm";

const updateMovieService = async (
  movieData: TMovieUpdate,
  idMovie: number
): Promise<TMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData = await movieRepository.findOneBy({
    id: idMovie,
  });

  const newMovie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });
  await movieRepository.save(newMovie);

  return newMovie;
};

export default updateMovieService;
