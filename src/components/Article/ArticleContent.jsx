import CheckBox from '@react-native-community/checkbox';
import Geolocation from '@react-native-community/geolocation';
import React, {useContext, useEffect, useState} from 'react';
import {
	Image,
	PermissionsAndroid,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	BackHandler
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import {AppContext} from '../../context/AppContext';
import CardHeader from '../CardHeader/CardHeader';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';

export const ArticleContent = ({route, navigation}) => {
	const {sendData, actualDate, setIsTasksShow, setIsLoading} =
		useContext(AppContext);
	let {
		product_group,
		article,
		description,
		competitor,
		docid,
		date_task,
		locid,
		rivalid,
		artImg
	} = route.params || {};

	const [currentProductGroup, setProductGroup] = useState('');
	const [currentArticle, setCurrentArticle] = useState('');
	const [currentImg, setCurrentImg] = useState(
		'https://api.pm.vliga.com/profuct_imgs/no_img.jpg'
	);
	const [currentDescription, setCurrentDescription] = useState('');
	const [currentCompetitor, setCurrentCompetitor] = useState('');
	const [isPromotion, setIsPromotion] = useState(false);
	const [price, setPrice] = useState('');
	const [comment, setComment] = useState('');
	const [noPrice, setNoPrice] = useState(false);
	const [imageGallery, setImageGallery] = useState([]);
	const [coords, setCoords] = useState(null);

	const submitHandler = () => {
		setIsPromotion(false);
		setPrice('');
		setComment('');
		setNoPrice(false);
		setImageGallery(null);
		setProductGroup('');
		setCurrentArticle('');
		setCurrentDescription('');
		setCurrentCompetitor('');
		Geolocation.getCurrentPosition(info => setCoords(info.coords));
	};

	let latitude,
		longitude = 0;
	if (coords) {
		latitude = coords.latitude;
		longitude = coords.longitude;
	}

	const openGallery = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.CAMERA,
				{
					title: 'App Camera Permission',
					message: 'App needs access to your camera ',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK'
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('Camera permission given');
			} else {
				console.log('Camera permission denied');
			}
		} catch (err) {
			console.warn(err);
		}

		const options = {
			path: 'images',
			mediaType: 'photo',
			quality: 0.7,
			selectionLimit: 10,
			includeBase64: true
		};
		launchCamera(options, res => {
			if (res.didCancel) {
				console.log('User canceled image picker');
			} else if (res.error) {
				console.log('ImagePicker Error:', res.error);
			} else {
				const data = res.assets;
				setImageGallery(data);
			}
		});
	};

	const handlerBackBtn = () => {
		setIsTasksShow(true);
	};

	useEffect(() => {
		setImageGallery(null);
		submitHandler();
		setProductGroup(product_group);
		setCurrentArticle(article);
		setCurrentImg(artImg);
		setCurrentDescription(description);
		setCurrentCompetitor(competitor);
	}, [article]);

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handlerBackBtn);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handlerBackBtn);
		};
	}, []);

	return (
		<KeyboardAvoidingWrapper>
			<View style={{height: '100%'}}>
				<CardHeader
					headerTitle="Карточка товара"
					path="Task"
					onClick={handlerBackBtn}
					titleStyle={{color: '#444444'}}
				/>
				<View style={styles.block}>
					<View style={styles.blockHead}>
						<View style={styles.blockDescr}>
							<View style={styles.textBlock}>
								<Text style={styles.text}>
									Товарная группа: {currentProductGroup}
								</Text>
								<Text style={styles.text}>Артикул: {currentArticle}</Text>
								<Text style={styles.text}>
									Наименование: {currentDescription}
								</Text>
							</View>
							<View style={styles.imgBlock}>
								<Image source={{uri: currentImg}} style={styles.avaImg} />
							</View>
						</View>

						<Text style={styles.text}>
							Конкурент: {currentCompetitor?.slice(0, -26)}
						</Text>
					</View>

					<TouchableOpacity
						style={[styles.btn, {backgroundColor: '#b9fbb0'}]}
						onPress={openGallery}>
						<Text style={styles.textColor}>Cделать фото</Text>
					</TouchableOpacity>
					<View>
						{imageGallery &&
							imageGallery.length > 0 &&
							imageGallery.map(img => (
								<Image
									source={{uri: img.uri}}
									style={styles.img}
									key={img.uri}
								/>
							))}
					</View>
					<TextInput
						style={styles.input}
						value={price}
						keyboardType="number-pad"
						placeholder={'Ц Е Н А'}
						onChangeText={text => setPrice(text)}
						placeholderTextColor={'#444444'}
					/>
					<View style={styles.checkboxContainer}>
						<CheckBox
							value={isPromotion}
							onValueChange={setIsPromotion}
							style={styles.checkbox}
							tintColors={{true: '#0F07D6', false: '#444444'}}
						/>
						<Text style={styles.label}>Акция</Text>
					</View>
					<View style={styles.checkboxContainer}>
						<CheckBox
							value={noPrice}
							onValueChange={setNoPrice}
							style={styles.checkbox}
							tintColors={{true: '#0F07D6', false: '#444444'}}
						/>
						<Text style={styles.label}>Ценник отсутствует</Text>
					</View>
					<TextInput
						style={styles.commentInput}
						multiline
						numberOfLines={4}
						placeholder="К О М Е Н Т А Р И Й"
						placeholderTextColor={'#444444'}
						value={comment}
						onChangeText={text => setComment(text)}
					/>

					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center'
						}}>
						<View style={styles.sendBtn}>
							{currentArticle &&
								imageGallery &&
								imageGallery.length !== 0 &&
								price !== '' && (
									<View style={styles.btn}>
										<TouchableOpacity
											onPress={() => {
												setIsLoading(true);
												submitHandler();
												setIsTasksShow(true);
												sendData({
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
												});

												navigation.goBack();
											}}>
											<Text style={styles.textName}>О Т П Р А В И Т Ь</Text>
										</TouchableOpacity>
									</View>
								)}
						</View>
					</View>
				</View>
			</View>
		</KeyboardAvoidingWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	textName: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#444444'
	},
	text: {
		fontSize: 14,
		margin: 3,
		color: '#444444'
	},
	blockHead: {
		backgroundColor: '#EAEEEAFF',
		padding: 10,
		borderRadius: 10,
		shadowOffset: {
			width: 2,
			height: 2
		}
	},
	blockDescr: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 20
	},
	textBlock: {
		width: '55%'
	},
	block: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		marginTop: 15,
		padding: 15,
		backgroundColor: '#f3f6f0',
		borderRadius: 25
	},

	btn: {
		width: '55%',
		height: 40,
		backgroundColor: '#b9fbb0',
		elevation: 3,
		alignItems: 'center',
		borderRadius: 6,
		color: '#444444',
		shadowOffset: {
			width: 2,
			height: 2
		},
		marginBottom: 15,
		marginTop: 10,
		padding: 10
	},
	sendBtn: {
		flex: 1,
		alignItems: 'center'
	},

	img: {
		width: 120,
		height: 120,
		borderRadius: 10,
		marginBottom: 10,
		shadowOffset: {
			width: 2,
			height: 2
		},
		borderColor: '#b9fbb0',
		borderWidth: 4
	},
	avaImg: {
		width: 120,
		height: 120,
		borderRadius: 6,
		shadowOffset: {
			width: 2,
			height: 2
		},
		borderColor: '#a1a1a1',
		borderWidth: 2
	},
	checkboxContainer: {
		flexDirection: 'row',
		borderColor: '#bbb'
	},
	checkbox: {
		alignSelf: 'center',
		borderColor: '#bbb'
	},
	label: {
		margin: 8,
		color: '#444444'
	},
	input: {
		marginBottom: 5,
		borderWidth: 1,
		borderColor: '#bbb',
		borderRadius: 5,
		paddingHorizontal: 14,
		height: 40,
		width: '55%',
		color: '#444444'
	},
	commentInput: {
		width: '100%',
		padding: 10,
		height: 80,
		borderWidth: 1,
		borderColor: '#bbb',
		borderRadius: 5,
		textAlignVertical: 'top',
		marginBottom: 12,
		marginTop: 5,
		color: '#444444'
	},
	textColor: {
		color: '#444444'
	}
});
