import Movie from "../entities/movies.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { TMovie, TMovieReturn } from "../interfaces/movies.interfaces";

const createMovieService = async (movieData: TMovie): Promise<TMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  //   if (!movieData.description) {
  //     movieData.description = "";
  //   }

  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  return movie;
};

export { createMovieService };
