import React, {createContext, useState} from 'react'
import axios from 'axios'
import {BASE_URL} from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {launchImageLibrary} from 'react-native-image-picker'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [regName, setRegName] = useState('')
	const [prodData, setProdData] = useState([])
	const [regPhone, setRegPhone] = useState(null)
	const [error, setError] = useState(null)
	const [regPassword, setRegPassword] = useState('')
	const [isAuth, setIsAuth] = useState(false)
	const [imageGallery, setImageGallery] = useState('')
	const [isPromotion, setIsPromotion] = useState(false)
	const [price, setPrice] = useState(null)
	const [comment, setComment] = useState('')
	const [noPrice, setNoPrice] = useState(false)

	//** А В Т О Р И З А Ц И Я **//
	const login = (name: string, phone: number, password: string) => {
		setIsLoading(true)
		axios
			.post(`${BASE_URL}`, {
				name,
				phone,
				password
			})
			.then(res => {
				let userInfo = res.config.data
				let parsedData = JSON.parse(userInfo)
				setRegName(() => parsedData.name)
				console.log(regName)
				setRegPhone(() => parsedData.phone)
				console.log(regPhone)
				setRegPassword(() => parsedData.password)
				console.log(regPassword)
				setIsAuth(true)
				setIsLoading(false)
			})
			.catch(e => {
				console.log(`register error${e}`)
				setIsLoading(false)
			})
	}

	//** Д Е А В Т О Р И З А Ц И Я **//
	const logout = () => {
		setIsLoading(true)
		axios
			.post(`${BASE_URL}`, {})
			.then(res => {
				console.log(res.config.data)
				AsyncStorage.removeItem('isAuth')
				setIsAuth(false)
				setRegName('')
				setRegPassword('')
				setRegPhone('')
				setIsLoading(false)
			})
			.catch(e => {
				console.log(`logout error ${e}`)
				setIsLoading(false)
			})
	}

	//** З А Г Р У З К А  Ф О Т О **//
	const openGallery = () => {
		const option = {
			mediaType: 'photo',
			quality: 1
		}
		launchImageLibrary(option, res => {
			if (res.didCancel) {
				console.log('User Cancelled image picker')
			} else if (res.errorCode) {
				console.log(res.errorMessage)
			} else {
				const data = res.assets[0]
				setImageGallery(data)
				console.log(data)
			}
		})
	}

	//** О Ч И С Т И Т Ь  Ф О Т О **//
	const clearImage = () => {
		setImageGallery('')
	}

	//** З А Г Р У З И Т Ь  З А Д А Н И Я  С  С Е Р В Е Р А **//
	const fetchData = async (url: string) => {
		try {
			setIsLoading(true)
			const response = await fetch(url)
			const json = await response.json()
			setProdData(json)
			setIsLoading(false)
		} catch (error) {
			setError(error)
			console.log('%c%s', 'color: red;', error)
			setIsLoading(false)
		}
	}

	//** О Ч И С Т И Т Ь   Ф О Р М У **//
	const clearForm = () => {
		setPrice(null)
		setIsPromotion(false)
		setPrice(null)
		setNoPrice(false)
		setComment('')
	}

	//** О Т П Р А В И Т Ь  Д А Н Н Ы Е  Ф О Р М Ы  Н А   С Е Р Е В Е Р **//

	const data = new FormData()
	data.append('my_photo', {
		uri: imageGallery.uri, // your file path string
		name: imageGallery.fileName,
		type: 'image/jpg'
	})

	const actualDate = new Date().toLocaleString()

	const sendData = async (
		regName: string,
		product_group: string,
		article: string,
		data: any,
		description: string,
		competitor: string,
		price: number,
		isPromotion: boolean,
		noPrice: boolean,
		comment: string,
		actualDate: string
	) => {
		setIsLoading(true)

		await axios
			.post(`${BASE_URL}`, {
				'Кто отправил': regName,
				'Товарная группа': product_group,
				Артикул: article,
				Фото: data,
				Наименование: description,
				Конкурент: competitor,
				Цена: price,
				Акция: isPromotion,
				'Ценник отсутствует': noPrice,
				Коментарий: comment,
				'Дата и время': actualDate
			})
			.catch(e => {
				console.log(`register error${e}`)
				setIsLoading(false)
			})
	}

	//** О Б Ъ Е К Т   К О Н Т Е К С Т А **//
	type AppContextProps = {
		isLoading: boolean
		isAuth: boolean
		register: () => {}
		login: () => {}
		logout: () => {}
		regName: string
		regPhone: number
		imageGallery: string
		clearImage: () => {}
		openGallery: () => {}
		fetchData: () => {}
		prodData: string[]
		isPromotion: boolean
		setIsPromotion: (isPromotion: boolean) => void
		comment: string
		setComment: () => {}
		price: number
		setPrice: () => {}
		noPrice: boolean
		setNoPrice: (noPrice: boolean) => void
		clearForm: () => {}
		sendData: () => {}
		data: any
		actualDate: string
	}

	const defaultValue: AppContextProps = {
		isLoading: isLoading,
		isAuth: isAuth,
		register: register,
		login: login,
		logout: logout,
		regName: regName,
		regPhone: regPhone,
		imageGallery: imageGallery,
		clearImage: clearImage,
		openGallery: openGallery,
		fetchData: fetchData,
		prodData: prodData,
		isPromotion: isPromotion,
		setIsPromotion: setIsPromotion,
		comment: comment,
		setComment: setComment,
		price: price,
		setPrice: setPrice,
		noPrice: noPrice,
		setNoPrice: setNoPrice,
		clearForm: clearForm,
		sendData: sendData,
		data: data,
		actualDate: actualDate
	}

	return (
		<AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>
	)
}
