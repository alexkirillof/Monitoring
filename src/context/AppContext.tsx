import React, {createContext, useState} from 'react'
import axios from 'axios'
import {BASE_URL} from '../config'
import {BASE_URL_NEW} from '../config'
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
	const login = async (phone: number, password: string): void => {
		setIsLoading(true)
		await axios
			.post(`${BASE_URL}`, {
				phone,
				password
			})
			.then(res => {
				let userInfo = res.data
				console.log(userInfo)
				setRegName(() => userInfo.username)
				setRegPhone(() => userInfo.phone)
				setRegPassword(() => userInfo.password)
				setIsAuth(userInfo.isAuth)
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
			.post(`${BASE_URL}/logout`, {})
			.then(() => {
				AsyncStorage.removeItem('isAuth')
				setIsAuth(false)
				setRegName('')
				setRegPassword('')
				setRegPhone(null)
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
			// const response = await fetch(url, {method: 'get'})
			axios.get(url).then(res => {
				setProdData(res.data)
				setIsLoading(false)
				console.log(res.data)
			})
		} catch (error) {
			setError(error)
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
		user_name: string,
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
		setIsLoading(true)
		await axios
			.post(
				`${BASE_URL_NEW}`,
				{
					user_name: regName,
					product_group: product_group,
					article: article,
					photo: data,
					description: description,
					competitor: competitor,
					price: price,
					promotion: isPromotion,
					no_price: noPrice,
					comment: comment,
					actual_date: actualDate
				},
				{
					headers: {'Content-Type': 'application/json; charset=UTF-8'}
				}
			)
			.then(res => {
				console.log(res)
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
