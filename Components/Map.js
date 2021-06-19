import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, Dimensions} from 'react-native'
import MapView from 'react-native-maps'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Map extends React.Component{
    constructor(props){
        super(props)

        //Setting base location 
        this.state = {
            region: {
                latitude: 43.60, // Those will be replaced by the user's location
                longitude: 1.44, //

                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }
        }

        this.map = React.createRef();
    }

    centerCamera() {
        /*
            Function called when we want to center the camera on the user
            
            @Params :
                None
            
            @Return : 
                Void
        */
        this._animateCamera(2000)
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
            altitude: 8000,
            zoom: 0,
        }
    }

    async _animateCamera(duration = 7000) {
        /*
            Function doing a little animation when we launch the app and when we center the
            camera at the user's location

            @Params : 
                duration? : Duration of the animation (milliseconds)
            
            @Return :
                Void
        */
        const camera = await this.map.getCamera();

        //Setting camera's parameters
        camera.pitch = 65;
        camera.heading += 179;
        camera.altitude = 30;
        camera.center = {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
        }

        //Do the animation based on the new parameters
        this.map.animateCamera(camera, { duration: duration });   
      }

    componentDidMount() {
        //Animation called when the component is mounted (when the application is ready)
        this._animateCamera()
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
                    />
                    <View style={styles.topButtons}>
                        <TouchableOpacity style={styles.goToMessages} onPress={() => {this.props.goToPage(0)}}/>
                        <TouchableOpacity style={styles.goToFavorites} onPress={() => {this.props.goToPage(2)}}/>   
                    </View>
                    <View style={styles.bottomButtons}>
                        <TouchableOpacity style={styles.recenterButton} onPress={() => {this.centerCamera()}}/>
                        <TouchableOpacity style={styles.addPlaceButton} />
                    </View>
                    
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
    }
})

export default Map