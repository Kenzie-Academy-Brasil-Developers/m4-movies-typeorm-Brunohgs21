import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieReturn } from "../interfaces/movies.interfaces";

const listMoviesService = async (
  perPage: any,
  page: any
): Promise<Array<TMovieReturn>> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const take: number = Number(perPage) || 5;
  const skip: number = Number(page) || 1;

  const movies: Array<TMovieReturn> = await movieRepository.find({
    take,
    skip: (skip - 1) * take,
  });

  return movies;
};

export { listMoviesService };
