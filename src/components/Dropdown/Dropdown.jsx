import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {AppContext} from '../../context/AppContext';

export const DropdownComponent = ({data}) => {
	const {katValue, setKatValue} = useContext(AppContext);
	const tasksGroops = data;

	const renderItem = item => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{item.label}</Text>
			</View>
		);
	};
	return (
		<Dropdown
			style={styles.dropdown}
			placeholderStyle={styles.placeholderStyle}
			selectedTextStyle={styles.selectedTextStyle}
			inputSearchStyle={styles.inputSearchStyle}
			data={tasksGroops}
			search
			maxHeight={300}
			labelField="label"
			valueField="value"
			placeholder="Товарная группа"
			searchPlaceholder="ПОИСК..."
			value={katValue}
			onChange={item => {
				setKatValue(item.value);
			}}
			renderItem={renderItem}
		/>
	);
};

export default DropdownComponent;

const styles = StyleSheet.create({
	dropdown: {
		height: 50,
		backgroundColor: '#cee8ed',
		marginBottom: 12,
		borderRadius: 6,
		padding: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2
	},
	item: {
		padding: 17,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	textItem: {
		flex: 1,
		fontSize: 12,
		color: '#444444',
		fontWeight: 'bold'
	},
	placeholderStyle: {
		fontSize: 12,
		color: '#444444',
		fontWeight: 'bold'
	},
	selectedTextStyle: {
		fontSize: 12,
		color: '#444444',
		fontWeight: 'bold'
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 12,
		color: '#444444',
		fontWeight: 'bold'
	}
});
