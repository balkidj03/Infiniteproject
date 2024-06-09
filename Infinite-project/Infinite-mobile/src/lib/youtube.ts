import axios from 'axios';
import {AppConstants} from './constants';

export const youtubePlaylist = async (playlistId: string) => {
  const apiKey = AppConstants.API_KEYS.GOOGLE_API_KEY;

  try {
    const playlistResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlists`,
      {
        params: {
          part: 'snippet',
          id: playlistId,
          key: apiKey,
        },
      },
    );
    const playlistData = playlistResponse.data.items[0].snippet;

    const videosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: 'snippet',
          playlistId: playlistId,
          key: apiKey,
        },
      },
    );
    const videosData = videosResponse.data.items;

    return {playlistData, videosData};
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
