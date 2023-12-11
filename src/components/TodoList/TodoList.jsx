import React, {useState, useContext} from 'react';

import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
	RefreshControl
} from 'react-native';
import {AppContext} from '../../context/AppContext';
import {API_ENDPOINT} from '../../config';

export const TodoList = ({navigation}) => {
	const {fetchData, prodData, error, setCompetitor, isLoading, setIsTasksShow} =
		useContext(AppContext);
	const [showList, setShowList] = useState(false);

	const getCompetitor = item => {
		setCompetitor(item);
		navigation.navigate('Task');
		setIsTasksShow(true);
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
			{isLoading && (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: '25%'
					}}>
					<ActivityIndicator size={'large'} color="#000000" />
				</View>
			)}
			{prodData?.length > 0 &&
				showList &&
				(error ? (
					<View
						style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<ActivityIndicator size={'large'} color="#000000" />
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
										getCompetitor(item);
									}}>
									<Text style={styles.itemHeader}>
										Задание: {item.competitor?.slice(0, -26)}
									</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
				))}
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
	MessageContainer: {
		maxHeight: '78%',
		overflow: 'hidden',
		backgroundColor: '#f3f6f0',
		borderRadius: 10,
		padding: 20,
		paddingBottom: 20,
		shadowOffset: {
			width: 2,
			height: 2
		},
		width: '100%',
		alignItems: 'center'
	},
	ErrorText: {
		fontSize: 20,
		color: 'red'
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
		fontWeight: 'bold',
		color: '#444444'
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
	btnText: {
		fontWeight: 'bold',
		color: '#444444'
	},
	itemDescr: {
		justifyContent: 'flex-start',
		marginRight: 10,
		width: '55%'
	},
	itemText: {
		fontSize: 14
	},
	textColor: {
		color: '#444444'
	}
});
