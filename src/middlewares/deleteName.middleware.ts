import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const deleteNameMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  const MovieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie = await MovieRepository.findOne({
    where: {
      name: name,
    },
  });

  if (findMovie) {
    delete req.body.name;
  }

  return next();
};

export default deleteNameMiddleware;
