import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {
	BASE_URL,
	API_TASKS,
	ACCESS_TOKEN,
	API_TASK,
	API_POST_TASKS
} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import navigation from '../Navigation/Navigation';

export const AppContext = createContext(null);

interface IProps {
	children: React.ReactNode;
}

export interface IUser {
	id: string;
	user_name: string;
	user_phone: string;
	token: string;
}

export interface ICompetitor {
	competitor: string;
	id: string;
	locid: string;
	rivalid: string;
}

export interface ITasks {
	article: 'string';
	date_task: 'string';
	description: 'string';
	docid: 'string';
	locid: 'string';
	product_group: 'string';
	storeId: 'string';
	userId: 'string';
}

export const AppProvider = ({children}: IProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<IUser>();
	const [prodData, setProdData] = useState([]);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [competitor, setCompetitor] = useState(null);
	const [katValue, setKatValue] = useState('');
	const [tasks, setTasks] = useState([]);
	const [count, setCount] = useState(0);
	const [isTasksShow, setIsTasksShow] = useState(true);

	//** А В Т О Р И З А Ц И Я **//
	const login = async (user_phone: number, password: string) => {
		setIsLoading(true);
		await axios
			.post(
				`${BASE_URL}`,
				{
					user_phone,
					password
				},
				{
					headers: {
						access_token: `${ACCESS_TOKEN}`
					}
				}
			)
			.then(async res => {
				let userInfo = res.data;
				const newUser: IUser = {
					id: userInfo.id,
					user_name: userInfo.user_name,
					user_phone: userInfo.user_phone,
					token: userInfo.token
				};
				setUser(newUser);
				await AsyncStorage.setItem('user', JSON.stringify(newUser));
				setIsLoading(false);
			})
			.catch(e => {
				setIsLoading(false);
				setError(e);
				console.log(`register error${e}`);
			});
	};

	//** Д Е А В Т О Р И З А Ц И Я **//
	const logout = async () => {
		setIsLoading(true);
		try {
			await AsyncStorage.removeItem('user');
			setUser(null);
			setIsLoading(false);
			navigation.navigate('Login');
		} catch (e) {
			console.log(`logout error ${e}`);
			setIsLoading(false);
		}
	};

	//** З А Г Р У З И Т Ь  З А Д А Н И Я  С  С Е Р В Е Р А **//
	const fetchData = async (url: string) => {
		try {
			setIsLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user?.token}`,
					access_token: `${ACCESS_TOKEN}`
				}
			};
			axios
				.get(`${url}?user_token=${user?.token}`, config)
				.then(res => {
					setProdData(res.data);
					setIsLoading(false);
				})
				.catch(err => {
					setError(err.response.data.message);
					setIsLoading(false);
					return;
				});
		} catch (error) {
			setIsLoading(false);
		}
	};

	//** З А Г Р У З К А  З А Д А Н И Й **//
	const loadTasksData = id => {
		return axios.get(`${API_TASKS}?user_token=${user?.token}&rivalid=${id}`, {
			headers: {
				access_token: `${ACCESS_TOKEN}`
			}
		});
	};
	//** П О Л У Ч Е Н И Е  З А Д А Н И Й **//
	const loadTasksForGroop = async (rId: string) => {
		await axios
			.get(
				`${API_TASK}?user_token=${user?.token}&rivalid=${rId}&tree=${katValue}`,
				{
					headers: {
						access_token: `${ACCESS_TOKEN}`
					}
				}
			)
			.then(res => {
				if (res.data) {
					setTasks(res.data);
				}
				setIsLoading(false);
			})
			.catch(e => {
				setIsLoading(false);
				console.log(e);
			});
	};

	//** О Т П Р А В И Т Ь  Д А Н Н Ы Е  Ф О Р М Ы  Н А   С Е Р Е В Е Р **//
	const formatDate = () => {
		let t = new Date();
		let z = t.getTimezoneOffset() * 60 * 1000;
		let tLocal = t - z;
		tLocal = new Date(tLocal);
		let iso = tLocal.toISOString().split('.')[0].replace('T', ' ');
		return iso;
	};

	// const actualDate = new Date().toLocaleString("ru - RU");
	const actualDate = formatDate();

	const sendData = async ({
		imageGallery,
		product_group,
		article,
		description,
		competitor,
		price,
		isPromotion,
		noPrice,
		comment,
		actualDate,
		latitude,
		longitude,
		docid,
		date_task,
		locid,
		rivalid
	}: {
		imageGallery: any;
		product_group: string;
		article: string;
		description: string;
		competitor: string;
		price: string;
		isPromotion: boolean;
		noPrice: boolean;
		comment: string;
		actualDate: string;
		latitude: number;
		longitude: number;
		docid: number;
		date_task: string;
		locid: number;
		rivalid: number;
	}) => {
		setIsLoading(true);
		const data = new FormData();

		imageGallery.forEach((item, i) => {
			data.append('my_photo[]', {
				uri: item.uri,
				type: 'image/jpeg',
				name: item.fileName || `filename${i}.jpg`
			});
		});
		if (user) {
			const itemData = JSON.stringify({
				user_name: user.user_name,
				user_phone: user.user_phone,
				product_group: product_group,
				article: article,
				description: description,
				competitor: competitor,
				price: price,
				promotion: +isPromotion,
				no_price: +noPrice,
				comment: comment,
				actual_date: actualDate,
				latitude: latitude,
				longitude: longitude,
				docid: docid,
				date_task: date_task,
				locid: locid,
				rivalid: rivalid
			});

			data.append('content', itemData);
			await axios
				.post(`${API_POST_TASKS}?user_token=${user?.token}`, data, {
					headers: {
						'Content-Type': 'multipart/form-data',
						access_token: `${ACCESS_TOKEN}`
					}
				})
				.then(res => {
					setMessage(res.data.message);
					setCount(prev => prev + 1);
					setIsLoading(false);
				})
				.catch(e => {
					setIsLoading(false);
				});
		}
	};

	//** О Б Ъ Е К Т   К О Н Т Е К С Т А **//
	type AppContextProps = {
		isLoading: boolean;
		setIsLoading: Function;
		login: Function;
		logout: Function;
		user: IUser | null;
		setUser: Function;
		fetchData: Function;
		prodData: string[];
		clearForm: Function;
		sendData: Function;
		actualDate: string;
		error: string;
		message: string;
		competitor: ICompetitor | null;
		setCompetitor: Function;
		loadTasksData: Function;
		katValue: string;
		setKatValue: Function;
		loadTasksForGroop: Function;
		tasks: ITasks;
		setTasks: Function;
		count: number;
		setCount: Function;
		isTasksShow: boolean;
		setIsTasksShow: Function;
	};

	const defaultValue: AppContextProps = {
		isLoading: isLoading,
		setIsLoading: setIsLoading,
		login: login,
		logout: logout,
		user: user,
		setUser: setUser,
		fetchData: fetchData,
		prodData: prodData,
		sendData: sendData,
		actualDate: actualDate,
		error: error,
		message: message,
		competitor: competitor,
		setCompetitor: setCompetitor,
		loadTasksData: loadTasksData,
		katValue: katValue,
		setKatValue: setKatValue,
		loadTasksForGroop: loadTasksForGroop,
		tasks: tasks,
		setTasks: setTasks,
		count: count,
		setCount: setCount,
		isTasksShow: isTasksShow,
		setIsTasksShow: setIsTasksShow
	};

	return (
		<AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
	);
};
