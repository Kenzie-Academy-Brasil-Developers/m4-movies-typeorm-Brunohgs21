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

const movieData = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: z.array(movieSchema),
});

const movieSchemaRequest = movieSchema.omit({
  id: true,
});

const movieUpdateSchema = movie.partial();

export { movieSchema, movieSchemaRequest, movie, movieUpdateSchema, movieData };
