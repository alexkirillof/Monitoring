import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL, BASE_URL_NEW} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {PermissionsAndroid} from 'react-native';

export const AppContext = createContext(null);

interface IProps {
	children: React.ReactNode;
}

interface IUser {
	userName: string;
	userPhone: number;
	isAuth: boolean;
}

export const AppProvider = ({children}: IProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<IUser | null>(null);
	const [prodData, setProdData] = useState([]);
	const [address, setAddress] = useState(null);
	const requestLocationPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Geolocation Permission',
					message: 'Can we access your location?',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK'
				}
			);
			console.log('granted', granted);
			if (granted === 'granted') {
				Geolocation.getCurrentPosition(position => {
					console.log(position.coords.latitude.toFixed(5));
					console.log(position.coords.longitude.toFixed(5));
				});
			} else {
				console.log('You cannot use Geolocation');
				return false;
			}
		} catch (err) {
			return false;
		}
	};
	useEffect(() => {
		requestLocationPermission();
	}, []);

	//** А В Т О Р И З А Ц И Я **//
	const login = async (phone: number, password: string) => {
		setIsLoading(true);
		await axios
			.post(`${BASE_URL}`, {
				phone,
				password
			})
			.then(async res => {
				let userInfo = res.data;
				const newUser: IUser = {
					userName: userInfo.username,
					userPhone: userInfo.phone,
					isAuth: userInfo.isAuth
				};
				setUser(newUser);
				await AsyncStorage.setItem('user', JSON.stringify(newUser));
				setIsLoading(false);
			})
			.catch(e => {
				console.log(`register error${e}`);
				setIsLoading(false);
			});
	};

	//** Д Е А В Т О Р И З А Ц И Я **//
	const logout = () => {
		setIsLoading(true);
		axios
			.post(`${BASE_URL}/logout`, {})
			.then(async res => {
				await AsyncStorage.removeItem('user');
				setUser(null);
				setIsLoading(false);
			})

			.catch(e => {
				console.log(`logout error ${e}`);
				setIsLoading(false);
			});
	};

	//** З А Г Р У З И Т Ь  З А Д А Н И Я  С  С Е Р В Е Р А **//
	const fetchData = async (url: string) => {
		try {
			setIsLoading(true);
			axios.get(url).then(res => {
				setProdData(res.data);
				setIsLoading(false);
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	//** О Т П Р А В И Т Ь  Д А Н Н Ы Е  Ф О Р М Ы  Н А   С Е Р Е В Е Р **//

	const actualDate = new Date().toLocaleString();

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
		actualDate
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
	}) => {
		setIsLoading(true);
		const data = new FormData();

		data.append('my_photo', {
			uri: imageGallery.uri, // your file path string
			name: imageGallery.fileName,
			type: 'image/jpg'
		});
		if (user) {
			const itemData = {
				user_name: user.userName,
				user_phone: user.userPhone,
				product_group: product_group,
				article: article,
				description: description,
				competitor: competitor,
				price: price,
				promotion: isPromotion,
				no_price: noPrice,
				comment: comment,
				actual_date: actualDate
			};
			for (let key in itemData) {
				const item: any = itemData[key];
				data.append(key, item);
			}
			await axios
				.post(`${BASE_URL_NEW}`, data, {
					headers: {'Content-Type': 'multipart/form-data'}
				})
				.then(res => {
					console.log(res.data);
				})
				.catch(e => {
					console.log(`register error${e}`);
					setIsLoading(false);
				});
		}
	};

	//** О Б Ъ Е К Т   К О Н Т Е К С Т А **//
	type AppContextProps = {
		isLoading: boolean;
		login: Function;
		logout: Function;
		user: IUser | null;
		setUser: Function;
		fetchData: Function;
		prodData: string[];
		clearForm: Function;
		sendData: Function;
		actualDate: string;
	};

	const defaultValue: AppContextProps = {
		isLoading: isLoading,
		login: login,
		logout: logout,
		user: user,
		setUser: setUser,
		fetchData: fetchData,
		prodData: prodData,
		sendData: sendData,
		actualDate: actualDate
	};

	return (
		<AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
	);
};
