import * as React from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { searchArtists } from '../APIRequests';
import { Artist } from '../components/Artist';
import COLORS from '../constants/Colors';
import { Screens } from '../navigation/NavigationScreens';

export class HomeScreen extends React.Component {
  state = {
    artists: [],
  };
  page = 0;
  componentDidMount() {
    this.onSearch$ = new Subject();
    this.subscription = this.onSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.value = value;
        this.page = 0;
        this.searchArtists();
      });
    this.value = 'a';
    this.searchArtists();
  }

  componentWillUnmount() {
    this.subscription$ && this.subscription$.unsubscribe();
  }

  onSearch = value => {
    this.page = 0;
    this.onSearch$.next(value);
  };

  searchArtists = () => {
    if (!this.value) {
      return;
    }
    searchArtists(this.value, this.page).then(result => {
      if (!result) {
        return;
      }
      this.flatList &&
        this.flatList.scrollToOffset({ animated: true, offset: 0 });
      this.setState({
        artists:
          this.page === 0
            ? result.artists.items
            : this.state.artists.concat(result.artists.items),
      });
    });
  };

  viewArtist = artist => {
    const { navigation } = this.props;
    navigation.navigate(Screens.Artist, { artist });
  };

  renderArtist = ({ item }) => (
    <Artist artist={item} onPress={this.viewArtist} />
  );

  render() {
    const { artists } = this.state;
    return (
      <View style={styles.root}>
        <TextInput style={styles.input} onChangeText={this.onSearch} />
        <FlatList
          ref={ref => (this.flatList = ref)}
          data={artists}
          renderItem={this.renderArtist}
          keyExtractor={(item, i) => item.id.toString()}
          onEndReached={() => ++this.page && this.searchArtists()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'stretch', justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    height: 50,
  },
});
