import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const ensureNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  if (!name) {
    return next();
  }
  const MovieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie = await MovieRepository.findOne({
    where: {
      name: name,
    },
  });

  if (findMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default ensureNameExistsMiddleware;
