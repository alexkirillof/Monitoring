import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TodoList} from '../components/TodoList/TodoList';
import {useNavigation} from '@react-navigation/native';

export const TodoListScreen = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>
			<TodoList navigation={navigation} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#cee8ed',
		padding: 30
	}
});
