import React, {useState, useEffect, useContext} from 'react';

import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	RefreshControl,
	Modal
} from 'react-native';
import {AppContext} from '../../context/AppContext';
import {API_ENDPOINT} from '../../config';
import CardHeader from '../CardHeader/CardHeader';

export const TodoList = ({route, navigation}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [showList, setShowList] = useState(false);
	const [competitor, setCompetitor] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const {fetchData, prodData} = useContext(AppContext);

	useEffect(() => {
		setIsLoading(true);
		fetchData(API_ENDPOINT);
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size={'large'} color="#000000" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>
					Ошибка загрузки данных ...Пожалуйста, проверьте ваше интернет
					соединение !
				</Text>
			</View>
		);
	}

	const getCompetitor = item => {
		setCompetitor(item);
		setOpenModal(true);
	};

	const ModalBackFunction = () => {
		setOpenModal(false);
	};

	return (
		/*--header--*/
		<View>
			<View style={styles.header}>
				<Text style={styles.text}>СПИСОК ДЕЛ</Text>
			</View>
			<TouchableOpacity
				style={styles.btn}
				onPress={() => {
					fetchData(API_ENDPOINT);
					setShowList(true);
				}}>
				<Text style={styles.btnText}>ПОЛУЧИТЬ / ОБНОВИТЬ СПИСОК</Text>
			</TouchableOpacity>

			{/*--render списка--*/}

			{showList && (
				<FlatList
					data={prodData}
					style={styles.itemContainer}
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
						return item.id + index;
					}}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={() => {
								fetchData(API_ENDPOINT);
							}}
						/>
					}
					renderItem={({item}) => (
						<View key={item.tasks.article} style={styles.itemHeaderContainer}>
							<TouchableOpacity
								onPress={() => {
									getCompetitor(item);
								}}>
								<Text style={styles.itemHeader}>
									Задание: {item.competitor}
								</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			)}
			<Modal visible={openModal} animationType="fade">
				<View style={styles.modalWrap}>
					<CardHeader
						headerTitle="Карточка магазина"
						backFunctions={ModalBackFunction}
					/>
					<View style={styles.itemContainer}>
						<View style={styles.itemHeaderContainer}>
							<Text style={styles.itemHeader}>
								Задание:{competitor.competitor}
							</Text>
						</View>
						{competitor &&
							competitor.tasks.map(
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
													competitor: competitor.competitor
												});
												setOpenModal(false);
											}}>
											<Text>Взять в работу</Text>
										</TouchableOpacity>
										{pos.article !=
											competitor.tasks[competitor.tasks.length - 1].article && (
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
			</Modal>
		</View>
	);
};

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
		padding: 20,
		shadowOffset: {
			width: 2,
			height: 2
		},
		width: '100%'
	},
	modalWrap: {
		flex: 1,

		backgroundColor: '#cee8ed',
		padding: 20
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
	itemHeaderContainer: {
		backgroundColor: '#cee8ed',
		shadowColor: '#000',
		shadowOffset: {
			width: 3,
			height: 1
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,

		elevation: 4,
		borderRadius: 6,
		height: 40,
		alignItems: 'center',
		marginBottom: 15,
		justifyContent: 'center',
		width: '100%'
	},
	itemHeader: {
		fontSize: 16,
		fontWeight: 'bold'
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
});
