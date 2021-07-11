import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native'
import {login, register} from '../API/TracerAPI'
import {connect} from 'react-redux'

class Connection extends React.Component{
    constructor(props){
        super(props)

        this.username = ""
        this.password = ""

        this.registerUsername = ""
        this.registerEmail = ""
        this.registerPassword = ""
        this.registerPassword2 = ""

        this.loginPasswordField = React.createRef()
        this.registerEmailField = React.createRef()
        this.registerPasswordField = React.createRef()
        this.registerPassword2Field = React.createRef()
    }

    _connection(){
        //Checks if there's not empty fields 
        if (this.username != "" && this.password != ""){
            //Asks the API
            login(this.username, this.password).then(response => {
                if (response.token !== undefined){
                    let action = {type: "SET_TOKEN", value: {token: response.token}}
                    this.props.dispatch(action)

                } else {
                    console.log("Mauvais identifiant")
                }
                

            })
        }
        
        
    }

    _register(){
        //Checks if there's no empty fields
        if (this.registerUsername != "" && this.registerEmail != "" && this.registerPassword != "" && this.registerPassword2 != ""){

            //Checks if both password entered are the same
            if (this.registerPassword === this.registerPassword2) {

                //Asks the API to create an user
                register(this.registerUsername, this.registerPassword, this.registerEmail).then(response => {
                    //Checks if it gave the token
                    if(response.token !== undefined){
                        //Save the Token
                        let action = {type: "SET_TOKEN", value: {token: response.token}}
                        this.props.dispatch(action)

                    //Else, Check the errors codes
                    } else if (response.message == "Username already exist") {
                        console.log("Le pseudo est déjà utilisé")
                    }
                })

            } else {
                console.log("Les mots de passes ne sont pas identiques")
            }

        } else {
            console.log("Il manque un ou plusieurs champs")
        }
    }
    
    //Automatisation of return button, to go faster
    _usernameTextChanged(text){
        this.username = text
    }

    _passwordTextChanged(text){
        this.password = text
    }

    _registerUsernameTextChanged(text){
        this.registerUsername = text
    }

    _registerEmailTextChanged(text){
        this.registerEmail = text
    }

    _registerPasswordTextChanged(text){
        this.registerPassword = text
    }

    _registerPassword2TextChanged(text){
        this.registerPassword2 = text
    }

    render(){
        return(
            <View>
                <ScrollView>
                    <View style={styles.connectionForm}>
                        <Text style={styles.text}>Connexion</Text>
                        <TextInput 
                            style={styles.textField}
                            placeholder = "Entrer votre pseudo"
                            autoCompleteType = {"username"}
                            autoCorrect = {false}
                            onChangeText = {(text) => {this._usernameTextChanged(text)}}
                            onSubmitEditing = {() => {this.passwordField.focus()}}
                        />
                        <TextInput 
                            style={styles.textField}
                            placeholder = "Entrer votre mot de passe"
                            ref = {(field) => {this.passwordField = field}}
                            autoCompleteType = {"password"}
                            secureTextEntry = {true}
                            autoCorrect = {false}
                            onChangeText = {(text) => {this._passwordTextChanged(text)}}
                            onSubmitEditing = {() => {this._connection()}}
                        />
                        <TouchableOpacity onPress={() => {this._connection()}}>
                            <Text style={styles.SignButton}>On se connecte !</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.connectionForm}>
                        <Text style={styles.text}>Pas encore inscrit ?</Text>
                        <TextInput 
                            style={styles.textField}
                            placeholder = "Entrer votre pseudo"
                            autoCompleteType = {"username"}
                            autoCorrect = {false}
                            onChangeText = {(text) => {this._registerUsernameTextChanged(text)}}
                            onSubmitEditing = {() => {this.registerEmailField.focus()}}
                        />
                        <TextInput 
                            style={styles.textField}
                            placeholder = "Entrer votre email"
                            ref = {(ref) => {this.registerEmailField = ref}}
                            autoCompleteType = {"email"}
                            autoCorrect = {false}
                            onChangeText = {(text) => {this._registerEmailTextChanged(text)}}
                            onSubmitEditing = {() => {this.registerPasswordField.focus()}}
                        />
                        <TextInput 
                            style={styles.textField}
                            placeholder = "Entrer le mot de passe"
                            ref = {(field) => {this.registerPasswordField = field}}
                            autoCompleteType = {"password"}
                            secureTextEntry = {true}
                            autoCorrect = {false}
                            onChangeText = {(text) => {this._registerPasswordTextChanged(text)}}
                            onSubmitEditing = {() => {this.registerPassword2Field.focus()}}
                        />
                        <TextInput 
                            style={styles.textField}
                            placeholder = "Retaper le mot de passe"
                            ref = {(field) => {this.registerPassword2Field = field}}
                            autoCompleteType = {"password"}
                            secureTextEntry = {true}
                            autoCorrect = {false}
                            onChangeText = {(text) => {this._registerPassword2TextChanged(text)}}
                            onSubmitEditing = {() => {this._register()}}
                        />
                        <TouchableOpacity onPress={() => {this._register()}}>
                            <Text style={styles.SignButton}>On s'inscrit !</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        justifyContent: 'center',
        fontWeight: "900",
    },

    connectionForm: {
        textAlign: "center",
        justifyContent: 'center',
        backgroundColor: "#AAAAAA",
        borderRadius: 10,
        padding: 20,
        margin: 20,
    },

    textField: {
        borderRadius: 10,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "black"
    },

    SignButton: {
        textAlign: "center",
        justifyContent: 'center',
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#FF2222",
        marginHorizontal: 40,
        marginVertical: 10,
    },

    registerButton: {
        marginTop: 10,
        textAlign: "center",
        justifyContent: 'center'
    }

})

const mapStateToProps = (state) => {
    return {
        userInfos: state.userInfos
    }
}

export default connect(mapStateToProps)(Connection)