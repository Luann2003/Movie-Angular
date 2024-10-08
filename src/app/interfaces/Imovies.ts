export interface Imovies {
    id: number;
    title: string;
    subTitle: string;
    year: number;
    imgUrl: string;
    synopsis: string;
    genre: {
      id: number;
      name: string;
    };
  }
  