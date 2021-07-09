import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { addSpot, search } from '../API/TracerAPI'
import { connect } from 'react-redux'
import MapView, {Marker} from 'react-native-maps'
import Connection from './Connection'

class AddSpot extends React.Component{
    constructor(props){
        super(props)

        this.marker = {latitude: this.props.locationStore.latitude, longitude: this.props.locationStore.longitude}

        this.title = ""
        this.description = ""
        this.sport = 1
    }

    _addSpot(){
        //Checks if there's the title
        if(this.title != ""){
            //Adds the spot in the DB
            addSpot(this.props.userInfos.token, this.title, this.sport, {latitude: this.marker.latitude, longitude: this.marker.longitude}, this.description)
                .then(response => {
                    //Checks if everything's good
                    if(response.Message == "Uploaded"){
                        //Goes back to the map & Search for new spots near the user
                        this.props.navigation.goBack(null)
                        search(this.props.locationStore.longitude, this.props.locationStore.latitude).then(response => {
                            this.props.dispatch({type: "REFRESH_SPOTS", value: response.Spots})
                        }) 
                    }
                })
        }
        
    }

    _changeTitle(text){
        this.title = text
    }

    _changeDescription(text){
        this.description = text
    }

    _changeSport(text){
        this.sport = text
    }

    _checkAuth(){
        //Checks if the user's logged
        if(this.props.userInfos.token != ""){
            return (
                <View>
                    <TextInput 
                        placeholder="Titre"
                        onChangeText={(text) => {this._changeTitle(text)}}
                    />
                    <TextInput placeholder="Description" 
                        onChangeText={(text) => {this._changeDescription(text)}}
                    />
                    <TextInput placeholder="Sport" 
                        onChangeText={(text) => {this._changeSport(text)}}
                    />
                    <MapView 
                        style={styles.selectPlace}
                        showsUserLocation={true}
                        initialRegion={{latitude: this.props.locationStore.latitude, longitude: this.props.locationStore.longitude, longitudeDelta: 0.05, latitudeDelta: 0.05}}
                    >
                        <Marker 
                            coordinate={{latitude: this.props.locationStore.latitude, longitude: this.props.locationStore.longitude}}
                            draggable={true}
                            title={"Place moi là où le spot est !"}
                            onPress={e => {this.marker = e.nativeEvent.coordinate}}
                        >

                        </Marker>
                    </MapView>
                    <TouchableOpacity onPress={() => {this._addSpot()}}>
                        <Text>Poster</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <Connection />
                </View>
            )
        }
    }

    render(){
        return(
            <View>
                {this._checkAuth()}
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
    selectPlace: {
        width: 400,
        height: 200
    }
})

const mapStateToProps = (state) => {
    return {
        locationStore: state.changeLocation.location,
        loadingStore: state.changeLoading,
        userInfos: state.userInfos,
    }
}

export default connect(mapStateToProps)(AddSpot)