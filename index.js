/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import Pages from '@/entry';

// ===== Hermes 控制接口 =====
import { MusicControl } from './src/utils/MusicControlModule';

MusicControl.addListener(async (event) => {
  const { action, payload } = event;
  console.log('🎵 MusicControl received:', action);
  
  switch (action) {
    case 'play':
      await TrackPlayer.play();
      break;
    case 'pause':
      await TrackPlayer.pause();
      break;
    case 'toggle':
      const state = await TrackPlayer.getState();
      if (state === TrackPlayer.STATE_PLAYING) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      break;
    case 'next':
      await TrackPlayer.skipToNext();
      break;
    case 'previous':
      await TrackPlayer.skipToPrevious();
      break;
    case 'search':
      global.__musicFreeSearchQuery = payload;
      break;
    case 'play-song':
      if (payload) {
        try {
          const song = JSON.parse(payload);
          await TrackPlayer.add(song);
          await TrackPlayer.play();
        } catch (e) {
          console.error('Failed to play song:', e);
        }
      }
      break;
  }
});
console.log('🎵 MusicControl listener registered');

AppRegistry.registerComponent(appName, () => Pages);
TrackPlayer.registerPlaybackService(() => require('./src/service/index'));
