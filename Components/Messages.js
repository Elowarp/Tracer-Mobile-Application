import React from 'react'
import {View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, TextInput} from 'react-native'
import {connect} from 'react-redux'
import Connection from './Connection'

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get('window').height

class Messages extends React.Component{
    constructor(props){
        super(props)
    }

    _showProfile(){
        //If the user's connected
        if (this.props.userInfos.token != "") {
            //Profile Tab
            return (
                <View>
                    <Text style={styles.text}>Connected</Text>
                    <Text>
                        Cette page est encore en développement... Plus tard elle servira de messagerie entre les différents comptes Tracer ou 
                        de page affichant son profil Tracer  ¯\_(ツ)_/¯
                    </Text>
                    <TouchableOpacity onPress={() => {this._logout()}}>
                        <Text style={{...styles.text, margin: 35}}>Se déconnecter :(</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            //Connection Tab
            return (
                <View>
                    <Connection />
                </View>   
            )
        }
    }

    _logout(){
        this.props.dispatch({type: "DELETE_TOKEN", value:{}})
    }


    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView>
                    {this._showProfile()}
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
        justifyContent: 'center',
        fontWeight: "900",
    },
})

const mapStateToProps = (state) => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps)(Messages)