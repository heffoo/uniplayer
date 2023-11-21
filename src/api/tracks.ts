import axios, { AxiosResponse } from "./axios";

interface UploadTrackResponse {
  id: string;
  originName: string;
  url: string;
}

interface GetTrackMeta {
  artist?: string;
  title?: string;
  album?: string;
  picture: { data: any }[];
  duration?: number;
}

interface UploadTrackParams {
  title: string;
  duration: number;
  singerName: string;
  albumName: string;
  coverFileId: string;
  trackFileId: string;
}

export async function uploadTrack(track: any) {
  const data = await axios.post<UploadTrackResponse>(`/track-files`, track, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function getTrackMeta(id: string) {
  const data = await axios.get<GetTrackMeta>(`/track-files/${id}/meta`);
  return data;
}

export async function uploadTrackFile(params: UploadTrackParams) {
  const data = await axios.post<GetTrackMeta>(`/tracks`, {
    singerName: params.singerName,
    title: params.title,
    duration: params.duration,
    albumName: params.albumName,
    coverFileId: params.coverFileId,
    trackFileId: params.trackFileId,
  });

  return data;
}

export async function uploadCoverFile(coverFile: any) {
  const data = await axios.post<UploadTrackResponse>(
    `/cover-files`,
    coverFile,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}

export async function getTrack(id: any) {
  const data = await axios.get<UploadTrackResponse>(`/track-files/${id}`);
  return data;
}

export async function updateTrack(id: any, params: UploadTrackParams) {
  const data = await axios.patch<UploadTrackResponse>(`/tracks/${id}`, params);
  return data;
}
