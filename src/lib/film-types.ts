// Types of entries in the film collection, in display order. Shared by the schema and the film page.
export const FILM_TYPES = ['film', 'series'] as const;
export type FilmType = (typeof FILM_TYPES)[number];
