import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieData, TMovieReturn } from "../interfaces/movies.interfaces";

const listMoviesService = async (
  perPage: any,
  page: any,
  order: any,
  sort: any
): Promise<TMovieData> => {
  let take: number = Number(perPage) || 5;
  if (take === 0 && !page) {
    take = 1000; // get all movies in a single page
  }

  let skip: number = Number(page) || 1;
  if (skip < 1) {
    skip = 1;
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const count: number = await movieRepository.count();
  console.log(`Existem ${count} filmes no banco de dados`);

  const totalPages = Math.ceil(count / take);
  const nextPage = skip < totalPages ? skip + 1 : null;
  const prevPage = skip > 1 ? skip - 1 : null;

  const movies: Array<TMovieReturn> = await movieRepository.find({
    take,
    skip: (skip - 1) * take,
    order: {
      [sort || "id"]: order || "asc",
    },
  });

  const movieData: TMovieData = {
    count: count,
    data: movies,
    nextPage: nextPage
      ? `http://localhost:3000/movies?page=${nextPage}&perPage=${take}`
      : null,
    prevPage: prevPage
      ? `http://localhost:3000/movies?page=${prevPage}&perPage=${take}`
      : null,
  };

  return movieData;
};

export { listMoviesService };
