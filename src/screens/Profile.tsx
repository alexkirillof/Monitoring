import React, {useContext, useEffect, useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppContext} from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IUser} from '../context/AppContext';

export const Profile = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const {logout} = useContext(AppContext);

	const getMyAuthValue = async () => {
		try {
			const saveUserName = await AsyncStorage.getItem('user');
			setUser(JSON.parse(saveUserName));
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		getMyAuthValue();
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<View>
				<View style={styles.header}>
					<Text style={styles.text}>ДАННЫЕ ПОЛЬЗОВАТЕЛЯ</Text>
				</View>
				<View>
					<View style={styles.dataCard}>
						<Text>Имя пользователя:</Text>
						<Text style={styles.mainText}>{user?.user_name}</Text>
					</View>
					<View style={styles.dataCard}>
						<Text>Телефон:</Text>
						<Text style={styles.mainText}>{user?.user_phone}</Text>
					</View>
					<TouchableOpacity
						title="В Ы Х О Д"
						style={styles.btn}
						onPress={() => {
							console.log('Выход');
							logout();
						}}>
						<Text style={styles.btnText}>В Ы Х О Д</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		backgroundColor: '#cee8ed'
	},
	header: {
		alignItems: 'center',
		marginBottom: 30,
		marginTop: 30
	},
	dataCard: {
		height: 80,
		backgroundColor: '#F4F4F4',
		elevation: 3,
		borderRadius: 6,
		shadowOffset: {
			width: 2,
			height: 2
		},
		marginBottom: 20,
		padding: 10
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	mainText: {
		marginTop: 5,
		fontSize: 16,
		fontWeight: 'bold'
	},
	btn: {
		height: 40,
		backgroundColor: '#a08d91',
		elevation: 3,
		alignItems: 'center',
		borderRadius: 6,
		shadowOffset: {
			width: 2,
			height: 2
		},
		marginBottom: 20,
		marginTop: 30,
		padding: 10
	},
	btnText: {
		color: '#F4F4F4',
		fontWeight: 'bold'
	}
});
