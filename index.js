import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// También garantiza que, ya sea que cargue la aplicación en Expo Go o en una compilación nativa,
// el entorno está configurado adecuadamente.
registerRootComponent(App);