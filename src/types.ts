export type Track = {
  id: string;
  title: string;
  singerName: string;
  albumName: string;
  coverFileId: string;
  albumFileId: string;
};

export type Playlist = {
    id: string;
    title: string;
    userId: string;
    tracks: Track[];
}
