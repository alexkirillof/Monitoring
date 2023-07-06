import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {AppContext} from '../context/AppContext';
import {TabStack} from './TabStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

function Navigation() {
	const {isAuth, setIsAuth} = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);
	const getMyAuthValue = async () => {
		try {
			const newIsAutn = await AsyncStorage.getItem('isAuth');
			if (newIsAutn && newIsAutn === 'true') {
				setIsAuth(true);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		} catch (e) {
			setIsLoading(false);
			console.log(e);
		}

		console.log('Done.');
	};
	useEffect(() => {
		getMyAuthValue();
	}, []);
	return (
		<>
			{!isLoading ? (
				<NavigationContainer>
					<Stack.Navigator>
						{isAuth ? (
							<Stack.Screen
								name="Tab"
								component={TabStack}
								options={{headerShown: false}}
							/>
						) : (
							<>
								<Stack.Screen
									name="Login"
									component={LoginScreen}
									options={{headerShown: false}}
								/>
							</>
						)}
					</Stack.Navigator>
				</NavigationContainer>
			) : (
				<View>
					<ActivityIndicator />
				</View>
			)}
		</>
	);
}

export default Navigation;
