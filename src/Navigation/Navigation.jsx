import React, {useContext, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import {AppContext} from '../context/AppContext'
import {TabStack} from './TabStack'

const Stack = createNativeStackNavigator()

function Navigation() {
	const {isAuth} = useContext(AppContext)

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{isAuth ? (
					<Stack.Screen
						name='Tab'
						component={TabStack}
						options={{headerShown: false}}
					/>
				) : (
					<>
						<Stack.Screen
							name='Login'
							component={LoginScreen}
							options={{headerShown: false}}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
