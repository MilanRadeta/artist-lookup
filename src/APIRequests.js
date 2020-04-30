import { encode } from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';
import { clientId, clientSecret } from './credentials.json';

const clientBase64 = encode(`${clientId}:${clientSecret}`);

const transformJsonToFormEncoded = body => {
  return Object.keys(body)
    .map(
      property =>
        `${encodeURIComponent(property)}=${encodeURIComponent(body[property])}`,
    )
    .join('&');
};

const getAuthorizationValue = async () => {
  const token = await AsyncStorage.getItem('access_token');
  return `Bearer ${token}`;
};

const processPromise = promise => {
  return promise
    .then(response => response.json())
    .catch(error => {
      console.log(error);
      return null;
    });
};

export const authenticate = () => {
  console.log('authenticating');
  const body = transformJsonToFormEncoded({
    grant_type: 'client_credentials',
  });
  return processPromise(
    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: `Basic ${clientBase64}`,
      },
      body,
    }),
  ).then(response => {
    response.access_token
      ? AsyncStorage.setItem('access_token', response.access_token)
      : AsyncStorage.removeItem('access_token');
    return response;
  });
};

export const hasError = (result, callback) => {
  if (result.error) {
    if (result.error.status === 401) {
      authenticateAndRetry(callback);
    }
    return true;
  }
  return false;
};

export const authenticateAndRetry = callback => {
  authenticate().then(response => response.access_token && callback());
};

export const searchArtists = async (value, page = 0, limit = 20) => {
  const Authorization = await getAuthorizationValue();
  const params = transformJsonToFormEncoded({
    q: value,
    type: 'artist',
    limit,
    offset: page * limit,
  });
  return processPromise(
    fetch(`https://api.spotify.com/v1/search?${params}`, {
      method: 'GET',
      headers: {
        Authorization,
      },
    }),
  );
};

export const getAlbumsByArtistId = async (id, page = 0, limit = 20) => {
  const Authorization = await getAuthorizationValue();
  const params = transformJsonToFormEncoded({
    limit,
    offset: page * limit,
  });
  return processPromise(
    fetch(`https://api.spotify.com/v1/artists/${id}/albums?${params}`, {
      method: 'GET',
      headers: {
        Authorization,
      },
    }),
  );
};

export const getAlbumTracks = async (id, page = 0, limit = 20) => {
  const Authorization = await getAuthorizationValue();
  const params = transformJsonToFormEncoded({
    limit,
    offset: page * limit,
  });
  return processPromise(
    fetch(`https://api.spotify.com/v1/albums/${id}/tracks?${params}`, {
      method: 'GET',
      headers: {
        Authorization,
      },
    }),
  );
};
