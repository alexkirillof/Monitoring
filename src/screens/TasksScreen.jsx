import React from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TasksContent} from '../components/Tasks/TasksContent';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';

export const TasksScreen = () => {
	const {isTasksShow} = useContext(AppContext);
	const navigation = useNavigation();
	return <>{isTasksShow && <TasksContent navigation={navigation} />}</>;
};

const styles = StyleSheet.create({});
