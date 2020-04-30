import * as React from 'react';
import { ListItem } from './ListItem';

export const Artist = ({ artist, onPress }) => {
  return (
    <ListItem
      item={artist}
      header={artist.name}
      details={[
        artist.genres.join(', '),
        `${artist.followers.total} followers`,
        Array(Math.floor(artist.popularity / 10)).fill('⭐'),
      ]}
      onPress={onPress}
    />
  );
};
