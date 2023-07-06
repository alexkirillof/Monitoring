import React from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback
} from 'react-native'

const KeyboardAvoidingWrapper = ({children}) => {
	return (
		<KeyboardAvoidingView style={{flex: 1}}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss()
					}}>
					{children}
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

export default KeyboardAvoidingWrapper
