import * as React from 'react';
import { ListItem } from './ListItem';

export const Album = ({ album, onPress }) => {
  return (
    <ListItem
      item={album}
      header={album.name}
      details={[
        album.artists.map(({ name }) => name).join(', '),
        album.release_date,
      ]}
      onPress={onPress}
    />
  );
};
