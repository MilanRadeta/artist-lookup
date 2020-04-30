import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Sound from 'react-native-sound';
import { getAlbumTracks } from '../APIRequests';
import { Track } from '../components/Track';

export class AlbumScreen extends React.Component {
  page = 0;
  state = {
    tracks: [],
    currentTrack: null,
  };

  componentDidMount() {
    this.getTracks();
  }

  play = track => {
    this.audio && this.audio.stop() && this.audio.release();
    if (this.state.currentTrack !== track && track.preview_url) {
      this.setState({ currentTrack: track });
      this.audio = new Sound(track.preview_url, null, e => {
        e ? console.log('error loading track:', e) : this.audio.play();
      });
    } else {
      this.setState({ currentTrack: null });
    }
  };

  renderTrack = ({ item }) => {
    const { route } = this.props;
    const { album } = route.params;
    item.images = album.images;
    return (
      <Track
        track={item}
        isPlaying={this.state.currentTrack === item}
        onPress={this.play}
      />
    );
  };

  getTracks = () => {
    const { route } = this.props;
    const { album } = route.params;
    getAlbumTracks(album.id, this.page).then(response => {
      if (!response) {
        return;
      }
      this.setState({
        tracks:
          this.page === 0
            ? response.items
            : this.state.tracks.concat(response.items),
      });
    });
  };

  render() {
    return (
      <View style={styles.root}>
        <FlatList
          data={this.state.tracks}
          renderItem={this.renderTrack}
          keyExtractor={(item, i) => item.id.toString()}
          onEndReached={() => ++this.page && this.getTracks()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
});
