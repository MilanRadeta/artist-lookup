import * as React from 'react';
import { ListItem } from './ListItem';
import { millisToMinutesAndSeconds } from '../utils/utils';

export const Track = ({ track, onPress, isPlaying }) => {
  return (
    <ListItem
      item={track}
      header={`${track.track_number}. ${track.name}`}
      details={[
        track.artists.map(a => a.name).join(', '),
        `Disc ${track.disc_number}`,
        `Duration: ${millisToMinutesAndSeconds(track.duration_ms)}`,
      ]}
      showPlay={track.preview_url}
      isPlaying={isPlaying}
      onPress={onPress}
    />
  );
};
