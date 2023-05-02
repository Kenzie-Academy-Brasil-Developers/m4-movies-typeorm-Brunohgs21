import { Request, Response } from "express";
import {
  TMovie,
  TMovieData,
  TMovieReturn,
} from "../interfaces/movies.interfaces";
import { createMovieService } from "../services/createMovie.service";
import updateMovieService from "../services/updateMovie.service";
import deleteMovieService from "../services/deleteMovie.service";
import { listMoviesService } from "../services/listMovies.service";

const createMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovie = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (req: Request, res: Response) => {
  const { perPage, page, order, sort } = req.query;

  const movies: TMovieData = await listMoviesService(
    perPage,
    page,
    order,
    sort
  );

  return res.status(200).json(movies);
};

const updateMovieController = async (req: Request, res: Response) => {
  const movieData = req.body;
  const idMovie = parseInt(req.params.id);

  const updatedMovie = await updateMovieService(movieData, idMovie);
  return res.json(updatedMovie);
};

const deleteMovieController = async (req: Request, res: Response) => {
  await deleteMovieService(parseInt(req.params.id));

  return res.status(204).send();
};
export {
  createMoviesController,
  updateMovieController,
  deleteMovieController,
  listMoviesController,
};
