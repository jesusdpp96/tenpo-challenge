import { Artwork } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createArtworkAdapter = (data: any): Artwork => ({
  id: data.id,
  title: data.title,
  artistDisplay: data.artist_display,
  dateDisplay: data.date_display,
  placeOfOrigin: data.place_of_origin,
  imageId: data.image_id,
  mediumDisplay: data.medium_display,
  departmentTitle: data.department_title,
});
