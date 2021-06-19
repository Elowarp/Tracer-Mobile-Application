import React from 'react'
import { StyleSheet, View, Text, Dimensions, SafeAreaView } from 'react-native'

const WIDTH = Dimensions.get('window').width 
const HEIGHT = Dimensions.get('window').height

class Favorites extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    <Text style={styles.text}>This is the Favorites view</Text>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: WIDTH,
        height: HEIGHT,
    },

    text: {
        textAlign: "center",
        justifyContent: 'center'
    }
})

export default Favorites