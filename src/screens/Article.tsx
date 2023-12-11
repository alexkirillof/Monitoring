import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArticleContent} from '../components/Article/ArticleContent';
import {useNavigation, useRoute} from '@react-navigation/native';

export const Article = ({id, name}: {id: number; name: string}) => {
	const navigation = useNavigation();
	const route = useRoute();
	return (
		<SafeAreaView style={styles.container}>
			<ArticleContent
				navigation={navigation}
				route={route}
				id={id}
				name={name}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#cee8ed'
	}
});
