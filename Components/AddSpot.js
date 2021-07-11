import React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native'
import { addSpot, search } from '../API/TracerAPI'
import { connect } from 'react-redux'
import MapView, {Marker} from 'react-native-maps'
import Connection from './Connection'


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class AddSpot extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            marker: {
                latitude: this.props.locationStore.latitude, 
                longitude: this.props.locationStore.longitude
            }
        }

        this.title = ""
        this.description = ""
        this.sport = 1

        this.markerRef = React.createRef()
    }

    _addSpot(){
        //Checks if there's the title
        if(this.title != ""){
            //Adds the spot in the DB
            addSpot(this.props.userInfos.token, this.title, this.sport, this.state.marker, this.description)
                .then(response => {
                    //Checks if everything's good
                    if(response.Message == "Uploaded"){
                        //Goes back to the map & Search for new spots near the user
                        search(this.props.locationStore.longitude, this.props.locationStore.latitude).then(response => {
                            this.props.dispatch({type: "REFRESH_SPOTS", value: response.Spots})
                        }) 
                        this.props.navigation.goBack(null)
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

    _changeMarkerLocation(coords){
        this.setState({marker: coords})
    }

    _checkAuth(){
        //Checks if the user's logged
        if(this.props.userInfos.token != ""){
            return (
                <View>
                    <SafeAreaView>
                        <TextInput 
                            placeholder="Titre (Obligatoire)"
                            onChangeText={(text) => {this._changeTitle(text)}}
                            style={styles.inputs}
                        />
                        <TextInput placeholder="Description (Optionnel)" 
                            onChangeText={(text) => {this._changeDescription(text)}}
                            style={styles.inputs}
                        />
                        <MapView 
                            style={styles.selectPlace}
                            showsUserLocation={true}
                            userLocationCalloutEnabled={false}
                            initialRegion={{latitude: this.props.locationStore.latitude, longitude: this.props.locationStore.longitude, longitudeDelta: 0.001, latitudeDelta: 0.001}}
                            pitchEnabled={false}
                            showsCompass={false}
                            mapType={"hybrid"}
                            showsPointsOfInterest={false}
                            showsMyLocationButton={false}
                            toolbarEnabled={false}
                            onMapReady={() => {this.markerRef.showCallout()}}
                        >
                            <Marker 
                                ref={ref => {this.markerRef = ref}}
                                coordinate={this.state.marker}
                                draggable={true}
                                title={"Place moi à l'endroit où est le spot !"}
                                onDragEnd={(e) => {this.setState({marker: e.nativeEvent.coordinate})}}
                                isPreselected={true}
                            >

                            </Marker>
                        </MapView>
                        <TouchableOpacity 
                            onPress={() => {this._addSpot()}}
                            style={styles.sendButton}
                        >
                            <Text>Poster sur Tracer !</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
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
        width: WIDTH,
        height: 200
    },
    inputs: {
        marginVertical: 10,
    },
    sendButton: {
        justifyContent: "center",
        alignItems: "center",
        margin: 25,
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