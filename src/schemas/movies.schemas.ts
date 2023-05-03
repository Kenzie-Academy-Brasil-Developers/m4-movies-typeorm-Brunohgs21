import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().optional(),
  duration: z.number().refine((val) => val > 0, {
    message: "Number must be greater than 0",
  }),
  price: z.number().int(),
});
const movie = z.object({
  description: z.string(),
  duration: z.number().refine((val) => val > 0, {
    message: "Number must be greater than 0",
  }),
  name: z.string().max(50),
  price: z.number().int(),
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
