import React, {useState, useContext} from 'react'

import {Button, StyleSheet, TextInput, View, Text} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {AppContext} from '../context/AppContext'

const LoginScreen = ({navigation}) => {
	const [phone, setPhone] = useState(null)
	const [password, setPassword] = useState('')
	const {isLoading, login} = useContext(AppContext)

	return (
		<View style={styles.container}>
			<Text style={styles.header}>А В Т О Р И З А Ц И Я</Text>
			<Spinner visible={isLoading} />
			<View style={styles.wrapper}>
				<TextInput
					style={styles.input}
					title='Номер телефона'
					value={phone}
					keyboardType='number-pad'
					placeholder={'+7 (999) 999 99 99'}
					onChangeText={text => setPhone(text)}
				/>
				<TextInput
					style={styles.input}
					value={password}
					placeholder='П А Р О Л Ь'
					onChangeText={text => setPassword(text)}
					secureTextEntry
				/>
				<Button
					style={styles.link}
					title='В Х О Д'
					onPress={() => {
						login(phone, password)
					}}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 100
	},
	wrapper: {
		width: '80%'
	},
	input: {
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#bbb',
		borderRadius: 5,
		paddingHorizontal: 14
	},
	link: {
		color: 'blue'
	},
	header: {
		alignItems: 'center',
		fontSize: 20,
		marginBottom: 30,
		marginTop: 30
	}
})
export default LoginScreen
