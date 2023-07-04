import React, {useState, useEffect, useContext} from 'react'

import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	ActivityIndicator,
	FlatList,
	Image,
	TouchableOpacity,
	RefreshControl,
	ScrollView,
	SectionList
} from 'react-native'
import {AppContext} from '../../context/AppContext'
import {API_ENDPOINT} from '../../config'

export const TodoList = ({route, navigation}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [showList, setShowList] = useState(false)
	const {clearImage, fetchData, prodData, clearForm} = useContext(AppContext)

	useEffect(() => {
		setIsLoading(true)
		fetchData(API_ENDPOINT)
		setIsLoading(false)
	}, [])

	if (isLoading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size={'large'} color='#000000' />
			</View>
		)
	}

	if (error) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>
					Ошибка загрузки данных ...Пожалуйста, проверьте ваше интернет
					соединение !
				</Text>
			</View>
		)
	}

	return (
		/*--header--*/
		<View>
			<View style={styles.header}>
				<Text style={styles.text}>СПИСОК ДЕЛ</Text>
			</View>
			<TouchableOpacity
				style={styles.btn}
				onPress={() => {
					fetchData(API_ENDPOINT)
					setShowList(true)
				}}>
				<Text style={styles.btnText}>ПОЛУЧИТЬ / ОБНОВИТЬ СПИСОК</Text>
			</TouchableOpacity>

			{/*--render списка--*/}

			{showList && (
				<FlatList
					data={prodData}
					style={{marginBottom: 150}}
					ListHeaderComponentStyle={{
						height: 45,
						width: '100%',
						backgroundColor: '#cee8ed',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 15,
						borderRadius: 6
					}}
					keyExtractor={(item, index) => {
						return item.id + index
					}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={() => {
								fetchData(API_ENDPOINT)
							}}
						/>
					}
					renderItem={({item}) => (
						<View key={item.tasks.article}>
							<View style={styles.itemContainer}>
								<Text style={{fontWeight: 700, fontSize: 14, marginBottom: 10}}>
									Задание: {item.competitor}
								</Text>
								{item.tasks.map(
									(
										pos //вывод тасков
									) => (
										<View key={pos.article}>
											<Text>{pos.description}</Text>
											<Text>{pos.article}</Text>

											<Text>{pos.product_group}</Text>
											<TouchableOpacity
												style={styles.btn}
												key={pos.article}
												onPress={() => {
													navigation.navigate('Article', {
														product_group: pos.product_group,
														article: pos.article,
														description: pos.description,
														competitor: item.competitor
													})
													{
														clearImage()
														clearForm()
													}
												}}>
												<Text>Взять в работу</Text>
											</TouchableOpacity>
											{pos.article !=
												item.tasks[item.tasks.length - 1].article && (
												<View
													style={{
														height: 2,
														backgroundColor: '#9A8F92',
														width: '100%',
														marginBottom: 10
													}}></View>
											)}
										</View>
									)
								)}
							</View>
						</View>
					)}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	searchBox: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		borderColor: '#5c6059',
		borderWidth: 1
	},
	itemContainer: {
		backgroundColor: '#f3f6f0',
		borderRadius: 10,
		marginTop: 15,
		padding: 14
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 15
	},
	header: {
		alignItems: 'center',
		marginBottom: 30,
		marginTop: 30
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	btn: {
		height: 40,
		backgroundColor: '#b9fbb0',
		elevation: 3,
		alignItems: 'center',
		borderRadius: 6,
		shadowOffset: {
			width: 2,
			height: 2
		},
		marginBottom: 20,
		marginTop: 10,
		padding: 10
	},
	btnText: {
		fontWeight: 'bold'
	},
	itemDescr: {
		justifyContent: 'flex-start',
		marginRight: 10,
		width: '55%'
	},
	itemText: {
		fontSize: 14
	}
})
