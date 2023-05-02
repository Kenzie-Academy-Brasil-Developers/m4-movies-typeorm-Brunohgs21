import { z } from "zod";
import {
  movie,
  movieData,
  movieSchema,
  movieSchemaRequest,
} from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

type TMovieRequest = z.infer<typeof movieSchemaRequest>;

type TMovieReturn = z.infer<typeof movieSchema>;

type TMovie = z.infer<typeof movie>;

type TMovieUpdate = DeepPartial<TMovie>;

type TMovieData = z.infer<typeof movieData>;

export { TMovieRequest, TMovieReturn, TMovie, TMovieUpdate, TMovieData };
