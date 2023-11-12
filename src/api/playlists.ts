import axios, { AxiosResponse } from "./axios";

interface GetPlaylistsParams {
  offset: number;
  limit: number;
}

interface Playlist {
  id: string;
  title: string;
}

interface GetPlaylistsResponse {
  items: Playlist[];
  count: number;
}

export async function getPlaylists(params: GetPlaylistsParams) {
  const data = await axios.get<GetPlaylistsResponse>(`/playlists`, {
    params,
  });
  return data;
}

export async function createPlaylist(title: string) {
  const data = await axios.post<AxiosResponse>(`/playlists`, {
    title,
  });
  return data;
}
export async function getPlaylist(params: GetPlaylistsParams) {
  const data = await axios.get(`/playlists`, {
    params,
  });
  return data;
}

export async function updatePlaylist(id: string, title: string) {
  const data = await axios.patch(`/playlists/${id}`, {
    title,
  });
  return data;
}

export async function deletePlaylist(params: GetPlaylistsParams) {
  const data = await axios.delete(`/playlists`, {
    params,
  });
  return data;
}

export async function getTracksFromPlaylist(id: string) {
  const data = await axios.get(`/playlists/${id}/tracks`);
  return data;
}
