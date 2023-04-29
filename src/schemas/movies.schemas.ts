import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().optional(),
  duration: z.number(),
  price: z.number(),
});
const movie = z.object({
  name: z.string().max(50),
  description: z.string(),
  duration: z.number(),
  price: z.number(),
});

const movieSchemaRequest = movieSchema.omit({
  id: true,
});

const movieUpdateSchema = movie.partial();

export { movieSchema, movieSchemaRequest, movie, movieUpdateSchema };
