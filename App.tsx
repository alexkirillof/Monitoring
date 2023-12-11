import React from 'react';
import Navigation from './src/Navigation/Navigation';
import {AppProvider} from './src/context/AppContext';
import 'react-native-gesture-handler';

const App = () => {
	return (
		<AppProvider>
			<Navigation />
		</AppProvider>
	);
};

export default App;
