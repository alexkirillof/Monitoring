import React, {useState, useContext} from 'react';

import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	RefreshControl,
	Modal,
	ScrollView
} from 'react-native';
import {AppContext} from '../../context/AppContext';
import {API_ENDPOINT, API_TASKS} from '../../config';
import CardHeader from '../CardHeader/CardHeader';
import axios from 'axios';

export const TodoList = ({route, navigation}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [taskError, setTaskError] = useState(null);
	const [showList, setShowList] = useState(false);
	const [competitor, setCompetitor] = useState('');
	const [tasks, setTasks] = useState('');
	const [openModal, setOpenModal] = useState(false);
	const {fetchData, prodData, error} = useContext(AppContext);

	if (isLoading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size={'large'} color="#000000" />
			</View>
		);
	}

	const fetchTasks = async (url, id) => {
		try {
			setIsLoading(true);
			axios.post(url, {id}).then(res => {
				setTasks(res.data);
				setIsLoading(false);
			});
		} catch (error) {
			setIsLoading(false);
		}
	};
	const getCompetitor = (item, id) => {
		setCompetitor(item);
		fetchTasks(API_TASKS, id);
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

			{showList &&
				(error ? (
					<View style={styles.ListContainer}>
						<Text>{error}</Text>
					</View>
				) : (
					<FlatList
						data={prodData}
						style={styles.ListContainer}
						contentContainerStyle={{paddingBottom: 20}}
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
							<View key={item.id} style={styles.itemHeaderContainer}>
								<TouchableOpacity
									onPress={() => {
										getCompetitor(item, item.id);
									}}>
									<Text style={styles.itemHeader}>
										Задание: {item.competitor}
									</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
				))}
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
						<View style={{flex: 1}}>
							<ScrollView showsVerticalScrollIndicator={false}>
								{competitor &&
									tasks &&
									tasks.map(
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
												{pos.article != tasks[tasks.length - 1].article && (
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
							</ScrollView>
						</View>
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
	ListContainer: {
		maxHeight: '78%',
		overflow: 'hidden',
		backgroundColor: '#f3f6f0',
		borderRadius: 10,
		padding: 20,
		paddingBottom: 0,
		shadowOffset: {
			width: 2,
			height: 2
		},
		width: '100%'
	},
	itemContainer: {
		flex: 1,
		overflow: 'hidden',
		backgroundColor: '#f3f6f0',
		borderRadius: 10,
		marginTop: 15,
		marginBottom: 15,
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
		height: 50,
		alignItems: 'center',
		marginBottom: 15,
		justifyContent: 'center',
		width: '100%'
	},
	itemHeader: {
		fontSize: 14,
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
