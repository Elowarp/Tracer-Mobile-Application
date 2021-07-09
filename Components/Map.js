import React from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, SafeAreaView, Dimensions, Text} from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import { connect } from 'react-redux'
import { search } from '../API/TracerAPI'
import * as Location from 'expo-location';


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Map extends React.Component{
    
    constructor(props){
        super(props)

        //Setting base location 
        this.state = {
            region: {
                latitude: this.props.locationStore.latitude,
                longitude: this.props.locationStore.longitude,

                latitudeDelta: 12,
                longitudeDelta: 12,
            },
            showsUser: false,
            loading: {
                show: true,
                message: "Recherche de la localisation..."
            },
            spots: []
        }

        //Reference of the map
        this.map = React.createRef();

        //Getting the user's location
        this.getLocation().then((location) => {
            //Searching point around the user
            search(location.coords.longitude, location.coords.latitude).then(response => {
                this.props.dispatch({type: "REFRESH_SPOTS", value: response.Spots})
            })

            //Animation of the camera : Zooming in to the user
            this._animateCamera(11000, location.coords.longitude, location.coords.latitude)
            setTimeout(() => {
                this.setState({showsUser: true}) 
            }, 11100)

            //Hiding the loading bar
            this.props.dispatch({type: "HIDING_LOADING_MESSAGE", value: {}})
        })
    }

    centerCamera() {
        /**
            Function called when we want to center the camera on the user
            
            @Params :
                None
            
            @Return : 
                Void
        */
        this._animateCamera(3000)
        this.setState({showsUser: true})
        
    }

    _initCamera() {
        /*
            Function giving the camera's informations based on the location of the user

            @Params : 
                None
            
            @Return :
                Dict : Informations for the camera based on the user
        */
        return {
            pitch: 0,
            center: {
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
            },
            heading: 2,
            altitude: 100000,
            zoom: 0,
        }
    }

    showsLoading() {
        /*
            Funciton rendering the loading screen with the informations available in the store loadingStore
            
            @Params:
                None
            
            @Return :
                React Component: Loading screen
        */
        if (this.props.loadingStore.show) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator style={styles.activityIndicator} size='small' />
                    <Text style={styles.loadingInfoText} >{this.props.loadingStore.message}</Text>
                </View>
            )
        }
    }

    async _animateCamera(duration = 7000, longitude = this.props.locationStore.longitude, latitude = this.props.locationStore.latitude) {
        /**
            Function doing a little animation when we launch the app and when we center the
            camera at the user's location

            @Params : 
                duration? : Duration of the animation (milliseconds)
                longitude? : Longitude to go with the camera
                latitude? : Latitude to go with the camera
            
            @Return :
                Void
        */
        const camera = await this.map.getCamera();

        //Setting camera's parameters
        camera.pitch = 65;
        camera.heading += 179;
        camera.altitude = 400;
        camera.center = {
            latitude: latitude,
            longitude: longitude,
        }

        //Do the animation based on the new parameters
        this.map.animateCamera(camera, { duration: duration });   
    }

    async getLocation(){
        /**
         * Function getting the user's location
         */

        console.info("Getting location authorization...")
        //Asking for the permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }
        
        console.info("Getting location...")
        //Getting the location
        let location = await Location.getCurrentPositionAsync({})
            .catch(error => {
                console.error("Error during getting user's location")
                console.error(error)
            });

        //Changing user's location in the store
        this.props.dispatch({type: "CHANGE_LOCATION", value: location.coords})
        console.info("Got location")

        return location

    }

    _mapMarker() {
        /**
         * Function returning marker on the map where spots are
         */
        if(this.props.spotsStore.length > 0){
            return this.props.spotsStore[0].map((spot) => 
                <Marker
                    key={spot.id}
                    coordinate={{longitude: spot.longitude, latitude: spot.latitude}}
                    title={spot.title}
                >
                    
                    <Callout>
                        <Text>Titre : {spot.title}</Text>
                        <Text>Sport : {spot.sport__title}</Text>
                    </Callout>
                </Marker>
            )
        } else {
            return (<View></View>)
        }
        
    }

    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={{flex: 1,}}>
                    <MapView 
                        ref={(map) => { this.map = map; }}
                        style={styles.mapView}
                        initialRegion={this.state.region}
                        showsCompass={false}
                        initialCamera={this._initCamera()}
                        showsPointsOfInterest={false}
                        showsUserLocation={this.state.showsUser}
                        annotations={this.state.spots}
                    >
                        {this._mapMarker()}
                    </MapView>
                    <View style={styles.topButtons}>
                        <TouchableOpacity style={styles.goToMessages} onPress={() => {this.props.goToPage(0)}}/>
                        <TouchableOpacity style={styles.goToFavorites} onPress={() => {this.props.goToPage(2)}}/>   
                    </View>
                    <View style={styles.bottomButtons}>
                        <TouchableOpacity style={styles.recenterButton} onPress={() => {this.centerCamera()}}/>
                        <TouchableOpacity style={styles.addPlaceButton} onPress={() => {this.props.navigation.navigate('Ajouter un spot')}}/>
                    </View>
                    {this.showsLoading()}
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
    },

    mapView:{
        backgroundColor: "blue",
        width: WIDTH,
        height: HEIGHT,
        position: 'absolute'
    },

    recenterButton: {
        borderRadius: 100,
        backgroundColor: 'grey',
        height: 50,
        width: 50,
        margin: 10,
    },

    bottomButtons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 40,
        right: 10,
    },

    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },

    goToMessages: {
        borderRadius: 100,
        backgroundColor: 'grey',
        height: 53,
        width: 53,
        position: 'absolute'
    },

    goToFavorites: {
        borderRadius: 100,
        backgroundColor: 'grey',
        height: 53,
        width: 53,
        position: 'absolute',
        right: 0
    },

    addPlaceButton: {
        borderRadius: 100,
        backgroundColor: "grey",
        height: 70,
        width: 70,
        marginTop: 15,
    },

    loading: {
        position: 'absolute',
        bottom: 50,
        left: 10,
        backgroundColor: "rgba(179, 176, 170, 0.7)",
        flexDirection: "row",  
        padding: 10,
        borderRadius: 20,
    },

    activityIndicator: {
        marginRight: 10,
    },

    marker:{
        width: 30,
        height: 30,
        backgroundColor: "white",
        borderRadius: 100,
    }
})

const mapStateToProps = (state) => {
    return {
        locationStore: state.changeLocation.location,
        loadingStore: state.changeLoading,
        spotsStore: state.spots
    }
}

export default connect(mapStateToProps)(Map)