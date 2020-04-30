import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { getAlbumsByArtistId } from '../APIRequests';
import { Album } from '../components/Album';
import { Screens } from '../navigation/NavigationScreens';

export class ArtistScreen extends React.Component {
  page = 0;
  state = {
    albums: [],
  };

  componentDidMount() {
    this.getAlbums();
  }

  viewAlbum = album => {
    const { route, navigation } = this.props;
    const { artist } = route.params;
    navigation.navigate(Screens.Album, { artist, album });
  };

  renderAlbum = ({ item }) => {
    return <Album album={item} onPress={this.viewAlbum} />;
  };

  getAlbums = () => {
    const { route } = this.props;
    const { artist } = route.params;
    getAlbumsByArtistId(artist.id, this.page).then(response => {
      if (!response) {
        return;
      }
      this.setState({
        albums:
          this.page === 0
            ? response.items
            : this.state.albums.concat(response.items),
      });
    });
  };

  render() {
    return (
      <View style={styles.root}>
        <FlatList
          data={this.state.albums}
          renderItem={this.renderAlbum}
          keyExtractor={(item, i) => item.id.toString()}
          onEndReached={() => ++this.page && this.getAlbums()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
});
