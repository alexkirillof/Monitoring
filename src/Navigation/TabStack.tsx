import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TodoListScreen} from '../screens/TodoList';
import {Article} from '../screens/Article';
import {Profile} from '../screens/Profile';
import {ListSvg} from '../assets/svg/ListSvg';
import {ArticleSvg} from '../assets/svg/ArticleSvg';
import {ProfileSvg} from '../assets/svg/ProfileSvg';

const Tab = createBottomTabNavigator();

export const TabStack = () => {
	return (
		<Tab.Navigator screenOptions={{headerShown: false}}>
			<Tab.Screen
				name="TodoList"
				component={TodoListScreen}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({focused, color, size}) => (
						<ListSvg color={focused ? 'blue' : '#374b4e'} />
					)
				}}
			/>
			<Tab.Screen
				name="Личный кабинет"
				component={Profile}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: ({focused, color, size}) => (
						<ProfileSvg color={focused ? 'blue' : '#374b4e'} />
					)
				}}
			/>
		</Tab.Navigator>
	);
};
