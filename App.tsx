import React from 'react';
import Navigation from './src/Navigation/Navigation';
import {AppProvider} from './src/context/AppContext';

//*	https://webhook.site/cee3d686-8b9e-4638-941e-bc3e104192e3*//

const App = () => {
	return (
		<AppProvider>
			<Navigation />
		</AppProvider>
	);
};

export default App;
