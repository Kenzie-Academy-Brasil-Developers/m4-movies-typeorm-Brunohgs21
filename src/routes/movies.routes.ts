import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  movieSchemaRequest,
  movieUpdateSchema,
} from "../schemas/movies.schemas";
import {
  createMoviesController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import ensureNameExistsMiddleware from "../middlewares/ensureNameExists.middleware";
import ensureMovieExistsMiddleware from "./../middlewares/ensureMovieExists.middleware";
import deleteNameMiddleware from "../middlewares/deleteName.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDataIsValidMiddleware(movieSchemaRequest),
  ensureNameExistsMiddleware,
  createMoviesController
);

moviesRoutes.get("", listMoviesController);

moviesRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(movieUpdateSchema),
  ensureMovieExistsMiddleware,
  ensureNameExistsMiddleware,
  deleteNameMiddleware,
  updateMovieController
);

moviesRoutes.delete("/:id", ensureMovieExistsMiddleware, deleteMovieController);

export default moviesRoutes;
