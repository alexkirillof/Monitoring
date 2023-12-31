import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {AppContext} from '../context/AppContext';
import {TabStack} from './TabStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import {Article} from '../screens/Article';
import {TasksScreen} from '../screens/TasksScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
	const {user, setUser} = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);

	const getMyAuthValue = async () => {
		try {
			const storageUserData = await AsyncStorage.getItem('user');
			if (storageUserData) {
				setUser(JSON.parse(storageUserData));
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
						{user ? (
							<>
								<Stack.Screen
									name="Tab"
									component={TabStack}
									options={{headerShown: false}}
								/>
								<Stack.Screen
									name="Task"
									component={TasksScreen}
									options={{headerShown: false}}
								/>
								<Stack.Screen
									name="Article"
									component={Article}
									options={{headerShown: false}}
								/>
							</>
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
