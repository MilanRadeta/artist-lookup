import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { AlbumScreen } from '../screens/AlbumScreen';
import { ArtistScreen } from '../screens/ArtistScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { Screens } from './NavigationScreens';
import { SCREEN_WIDTH } from '../constants/Constants';

const Stack = createStackNavigator();

export const NavigationRoot = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name={Screens.Home} component={HomeScreen} />
      <Stack.Screen
        name={Screens.Artist}
        component={ArtistScreen}
        options={({ route }) => ({
          title: route.params.artist.name,
          headerTitleStyle: {
            width: SCREEN_WIDTH / 1.7,
          },
        })}
      />
      <Stack.Screen
        name={Screens.Album}
        component={AlbumScreen}
        options={({ route }) => ({
          title: route.params.album.name,
          headerTitleStyle: {
            width: SCREEN_WIDTH / 1.7,
          },
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default NavigationRoot;
