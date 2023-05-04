import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieData, TMovieReturn } from "../interfaces/movies.interfaces";

const listMoviesService = async (
  perPage: number,
  page: number,
  order: "asc" | "desc" | undefined,
  sort: string | undefined
): Promise<TMovieData> => {
  let take: any = Number(perPage) || 5;
  if (take > 5) {
    take = 5;
  }

  let skip: any = Number(page) || 1;
  let orderValue = order || "asc";
  let sortValue = sort || "id";

  if (take === -1 && !page) {
    take = 5;
    skip = 1;
  } else if (take === 0 && !page) {
    take = 1000;
  }

  if (skip < 1) {
    skip = 1;
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const count: number = await movieRepository.count();

  if (order === "desc" && !sort) {
    orderValue = "asc";
    sortValue = "id";
  }

  const totalPages = Math.ceil(count / take);
  const nextPage = skip < totalPages ? skip + 1 : null;
  const prevPage = skip > 1 ? skip - 1 : null;
  const skipNumber = Number(skip);
  if (isNaN(skipNumber)) {
    throw new Error(`Invalid value for "skip": ${skip}`);
  }
  const movies: Array<TMovieReturn> = await movieRepository.find({
    take,
    skip: (Number(skip) - 1) * take,
    order: {
      [sortValue]: orderValue,
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
