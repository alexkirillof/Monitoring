import React, {createContext, useState} from 'react';
import axios from 'axios';
import {BASE_URL, BASE_URL_NEW} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export const AppContext = createContext(null);

interface IProps {
	children: React.ReactNode;
}

interface IUser {
	userName: string;
	userPhone: number;
	isAuth: boolean;
}

interface IProduct {
	isPromotion: boolean;
	noPrise: boolean;
	price: number;
	comment: string;
}

export const AppProvider = ({children}: IProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<IUser | null>(null);
	const [prodData, setProdData] = useState([]);
	const [imageGallery, setImageGallery] = useState('');
	const [prouct, setProuct] = useState<IProduct | null>(null);

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

	//** З А Г Р У З К А  Ф О Т О **//
	const openGallery = () => {
		const option = {
			mediaType: 'photo',
			quality: 1
		};
		launchImageLibrary(option, res => {
			if (res.didCancel) {
				console.log('User Cancelled image picker');
			} else if (res.errorCode) {
				console.log(res.errorMessage);
			} else {
				const data: string = res.assets[0];
				setImageGallery(data);
			}
		});
	};

	//** О Ч И С Т И Т Ь  Ф О Т О **//
	const clearImage = () => {
		setImageGallery('');
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

	//** О Ч И С Т И Т Ь   Ф О Р М У **//
	const clearForm = () => {
		setProuct(null);
	};

	//** О Т П Р А В И Т Ь  Д А Н Н Ы Е  Ф О Р М Ы  Н А   С Е Р Е В Е Р **//

	const data = new FormData();
	data.append('my_photo', {
		uri: imageGallery.uri, // your file path string
		name: imageGallery.fileName,
		type: 'image/jpg'
	});

	const actualDate = new Date().toLocaleString();

	const sendData = async (
		user_name: string,
		user_phone: number,
		product_group: string,
		article: string,
		photo: any,
		description: string,
		competitor: string,
		price: number,
		promotion: boolean,
		noPrice: boolean,
		comment: string,
		actualDate: string
	) => {
		setIsLoading(true);
		const itemData = {
			user_name: user?.userName,
			user_phone: user?.userPhone,
			product_group: product_group,
			article: article,
			description: description,
			competitor: competitor,
			price: prouct?.price,
			promotion: prouct?.isPromotion,
			no_price: prouct?.noPrise,
			comment: prouct?.comment,
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
	};

	//** О Б Ъ Е К Т   К О Н Т Е К С Т А **//
	type AppContextProps = {
		isLoading: boolean;
		login: Function;
		logout: Function;
		user: IUser | null;
		setUser: Function;
		imageGallery: string;
		clearImage: Function;
		openGallery: Function;
		fetchData: Function;
		prodData: string[];
		product: IProduct | null;
		clearForm: Function;
		sendData: Function;
		data: any;
		actualDate: string;
	};

	const defaultValue: AppContextProps = {
		isLoading: isLoading,
		login: login,
		logout: logout,
		user: user,
		setUser: setUser,
		imageGallery: imageGallery,
		clearImage: clearImage,
		openGallery: openGallery,
		fetchData: fetchData,
		prodData: prodData,
		product: prouct,
		clearForm: clearForm,
		sendData: sendData,
		data: data,
		actualDate: actualDate
	};

	return (
		<AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
	);
};
