export type Track = {
  id: string;
  title: string;
  singerName: string;
  albumName: string;
  duration: number;
  coverFileId: string;
  albumFileId: string;
  trackFileId: string;
};

export type Playlist = {
  id: string;
  title: string;
  tracks?: Track[];
};

export type RadioStation = {
  id: string;
  title: string;
  src: string;
  cover?: string;
};
