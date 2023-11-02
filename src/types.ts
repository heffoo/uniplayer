export type Track = {
  id: string;
  title: string;
  singerName: string;
  albumName: string;
  coverFileId: string;
  albumFileId: string;
  src?: string; //TODO: temporary while no backend
  cover?: string; //TODO: temporary while no backend
  // src?: string; //TODO: temporary while no backend
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
