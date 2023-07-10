import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CardHeader = ({headerTitle, backFunctions}) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity style={styles.arrowBack} onPress={backFunctions}>
				<Text style={styles.arrow}> &#8592;</Text>
			</TouchableOpacity>
			<View style={styles.headerTitle}>
				<Text style={styles.headerText}>{headerTitle}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	arrowBack: {
		height: 50,
		aspectRatio: 1,
		backgroundColor: '#b9fbb0',
		borderRadius: 25,
		paddingHorizontal: 6,
		marginRight: 30
	},
	arrow: {
		color: '#000',
		fontSize: 26,
		aspectRatio: 1
	},
	headerTitle: {
		alignItems: 'center',
		marginBottom: 15,
		marginTop: 15
	},
	headerText: {
		fontSize: 20,
		fontWeight: 'bold'
	}
});

export default CardHeader;
