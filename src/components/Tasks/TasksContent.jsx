import React, {useContext, useEffect, useState} from 'react';

import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	FlatList,
	View,
	RefreshControl
} from 'react-native';

import CardHeader from '../CardHeader/CardHeader';
import DropdownComponent from '../Dropdown/Dropdown';
import {AppContext} from '../../context/AppContext';
import {API_ENDPOINT} from '../../config';

export const TasksContent = ({navigation}) => {
	const [tasksKat, settasksKat] = useState([]);

	const {
		competitor,
		loadTasksData,
		loadTasksForGroop,
		katValue,
		setKatValue,
		tasks,
		setTasks,
		count,
		setIsTasksShow,
		setIsLoading,
		isLoading
	} = useContext(AppContext);

	const tasksData = tsk => {
		let tasksData = [];
		tsk.forEach(item => {
			tasksData.push({label: item.tree_name, value: item.tree});
		});
		settasksKat(tasksData);
		const newArr = tasksData?.filter(item => {
			return item.value === katValue;
		});
		if (newArr.length == 0) {
			setKatValue('');
		}
		setIsLoading(false);
	};

	useEffect(() => {
		setIsLoading(true);
		loadTasksData(competitor.rivalid)
			.then(res => {
				tasksData(res.data);
				if (katValue !== '') {
					setIsLoading(true);
					loadTasksForGroop(competitor.rivalid);
				} else {
					setIsLoading(false);
				}
			})
			.catch(e => {
				setIsLoading(false);
				console.log('1', e.response);
			});
	}, [competitor, katValue, count]);

	return (
		<View style={styles.wrap}>
			<CardHeader
				headerTitle="Карточка магазина"
				path="TodoList"
				titleStyle={{color: '#444444'}}
				onClick={() => {
					setIsTasksShow(false);
					setKatValue('');
					setTasks([]);
				}}
			/>

			<View style={styles.itemContainer}>
				<View style={styles.itemHeaderContainer}>
					<Text style={styles.itemHeader}>
						Задание:{competitor?.competitor?.slice(0, -26)}
					</Text>
					<Text style={styles.itemHeader}>
						Всего позиций: {katValue !== '' ? tasks?.length : ''}
					</Text>
				</View>
				{tasksKat.length > 0 && <DropdownComponent data={tasksKat} />}
				<View style={{flex: 1}}>
					{katValue === '' && tasks?.length == 0 ? (
						<View>
							<Text style={styles.message}>ВЫБЕРИ ТОВАРНУЮ ГРУППУ !!!</Text>
						</View>
					) : isLoading ? (
						<View style={styles.itemContainer}>
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<ActivityIndicator size={'large'} color="#000000" />
							</View>
						</View>
					) : (
						<FlatList
							showsVerticalScrollIndicator={false}
							data={tasks}
							keyExtractor={(item, index) => {
								return item.id + (Math.random() * 10000).toFixed(4);
							}}
							refreshControl={
								<RefreshControl
									refreshing={isLoading}
									onRefresh={() => {
										if (katValue !== '') {
											loadTasksForGroop(competitor.rivalid);
										}
									}}
								/>
							}
							renderItem={({item}) => (
								<View>
									<Text style={{color: '#444444'}}>{item.description}</Text>
									<Text style={{color: '#444444'}}>{item.article}</Text>

									<Text style={{color: '#444444'}}>{item.product_group}</Text>
									<TouchableOpacity
										style={styles.btn}
										onPress={() => {
											setIsTasksShow(false);
											{
												item
													? navigation.navigate('Article', {
															product_group: item.product_group,
															article: item.article,
															description: item.description,
															competitor: competitor.competitor,
															docid: item.docid,
															date_task: item.date_task,
															locid: item.locid,
															rivalid: competitor.rivalid,
															artImg: item.art_img
													  })
													: null;
											}
										}}>
										<Text style={{color: '#444444'}}>Взять в работу</Text>
									</TouchableOpacity>
									{item.article !== tasks[tasks.length - 1].article && (
										<View
											style={{
												height: 2,
												backgroundColor: '#9A8F92',
												width: '100%',
												marginBottom: 10
											}}></View>
									)}
								</View>
							)}></FlatList>
					)}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		backgroundColor: '#cee8ed',
		padding: 20
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
		padding: 10,
		color: '#444444'
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
		height: 65,
		marginBottom: 15,
		padding: 10,
		width: '100%'
	},
	itemHeader: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#444444'
	},
	message: {
		marginTop: 20,
		fontSize: 18,
		fontWeight: 'bold',
		color: '#444444'
	}
});
