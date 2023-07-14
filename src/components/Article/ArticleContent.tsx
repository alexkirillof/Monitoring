import React, {useContext, useState, useEffect} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Image,
	TouchableOpacity
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {AppContext} from '../../context/AppContext';
import KeyboardAvoidingWrapper from '../KeyboardAvoidingWrapper';
import {launchImageLibrary} from 'react-native-image-picker';
import CardHeader from '../CardHeader/CardHeader';

export const ArticleContent = ({route, navigation}: {route: string}) => {
	const {sendData, actualDate} = useContext(AppContext);
	let {product_group, article, description, competitor} = route.params || {};

	const [currentProductGroup, setProductGroup] = useState('');
	const [currentArticle, setCurrentArticle] = useState('');
	const [currentDescription, setCurrentDescription] = useState('');
	const [currentCompetitor, setCurrentCompetitor] = useState('');
	const [isPromotion, setIsPromotion] = useState(false);
	const [price, setPrice] = useState('');
	const [comment, setComment] = useState('');
	const [noPrice, setNoPrice] = useState(false);
	const [imageGallery, setImageGallery] = useState('');

	const submitHandler = () => {
		setIsPromotion(false);
		setPrice('');
		setComment('');
		setNoPrice(false);
		setImageGallery('');
		setProductGroup('');
		setCurrentArticle('');
		setCurrentDescription('');
		setCurrentCompetitor('');
	};

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

	const articleBackFunction = () => {
		navigation.navigate('TodoList');
	};

	useEffect(() => {
		setImageGallery('');
		submitHandler();
		setProductGroup(product_group);
		setCurrentArticle(article);
		setCurrentDescription(description);
		setCurrentCompetitor(competitor);
	}, [article]);

	return (
		<KeyboardAvoidingWrapper>
			<View style={{height: '100%'}}>
				<CardHeader
					headerTitle="Карточка товара"
					backFunctions={articleBackFunction}
				/>
				<View style={styles.block}>
					<Text style={styles.text}>
						Товарная группа: {currentProductGroup}
					</Text>
					<Text style={styles.text}> Артикул: {currentArticle}</Text>
					<Text style={styles.text}> Наименование: {currentDescription}</Text>
					<Text style={styles.text}>
						{' '}
						Магазин конкурента: {currentCompetitor}
					</Text>

					<TouchableOpacity style={styles.btn} onPress={openGallery}>
						<Text>Загрузить фото</Text>
					</TouchableOpacity>

					{imageGallery != '' && (
						<Image source={{uri: imageGallery.uri}} style={styles.img} />
					)}
					<TextInput
						style={styles.input}
						value={price}
						keyboardType="number-pad"
						placeholder={'Ц Е Н А'}
						onChangeText={text => setPrice(text)}
					/>
					<View style={styles.checkboxContainer}>
						<CheckBox
							value={isPromotion}
							onValueChange={setIsPromotion}
							style={styles.checkbox}
						/>
						<Text style={styles.label}>Акция</Text>
					</View>
					<View style={styles.checkboxContainer}>
						<CheckBox
							value={noPrice}
							onValueChange={setNoPrice}
							style={styles.checkbox}
						/>
						<Text style={styles.label}>Ценник отсутствует</Text>
					</View>
					<TextInput
						style={styles.commentInput}
						multiline
						numberOfLines={4}
						placeholder="К О М Е Н Т А Р И Й"
						value={comment}
						onChangeText={text => setComment(text)}
					/>

					<View
						style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
						{currentArticle && (
							<TouchableOpacity
								style={styles.btn}
								onPress={() => {
									submitHandler();
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
										actualDate
									});
									console.log('ушло');
								}}>
								<Text style={styles.textName}>О Т П Р А В И Т Ь</Text>
							</TouchableOpacity>
						)}
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
		fontWeight: 'bold'
	},
	text: {
		fontSize: 14,
		margin: 3
	},
	block: {
		flex: 1,
		flexDirection: 'column',
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
		shadowOffset: {
			width: 2,
			height: 2
		},
		marginBottom: 15,
		marginTop: 10,
		padding: 10
	},
	img: {
		width: 180,
		height: 180,
		borderRadius: 10,
		marginBottom: 10
	},
	checkboxContainer: {
		flexDirection: 'row'
	},
	checkbox: {
		alignSelf: 'center'
	},
	label: {
		margin: 8
	},
	input: {
		marginBottom: 5,
		borderWidth: 1,
		borderColor: '#bbb',
		borderRadius: 5,
		paddingHorizontal: 14,
		height: 40,
		width: '55%'
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
		marginTop: 5
	}
});
