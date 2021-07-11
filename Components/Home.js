//Import libs
import React, {useState, useEffect} from 'react'
import { Dimensions, ScrollView, View, StyleSheet, StatusBar } from 'react-native'

//Import views
import Map from './Map'
import Favorites from './Favorites'
import Messages from './Messages'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class Home extends React.Component{
    constructor(props){
        super(props);

        //Used by the goToPage function to target the ScrollView node
        this.ScrollView = React.createRef();

        //Binding function to use them in a component
        this.goToPage = this.goToPage.bind(this);
    }

    goToPage(number){
        /*
            Function moving the user to a certain page on the screen
            @Params : 
                number : integer

            @Return :
                Void
        */
        switch(number){
            case 0:
                console.log("Go to Map")
                this.ScrollView.scrollTo({x: 0})
                break

            case 1:
                console.log("Go to Messages")
                this.ScrollView.scrollTo({x: WIDTH})
                break

            default:
                break
        }
    }

    render() {
        /*
            The Home screen is a ScrollView (list) which contains 3 views, aligned horizontally.
            By doing this with a ScrollView, we can slide between all views without having a "popup" to the 
            right like with the Navigation Stack module. 

            The 3 views are Favorites, Map and Messages view.

            We give them goToPage function to slide between views with a button (it can be useful for certain person)
        */
        return (
            <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
            <ScrollView
                ref={ref => (this.ScrollView = ref)}
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                bounces={false}
                scrollEnabled={true}
                contentOffset={{x: 0}}
                style={styles.scrollView}  
                loadingIndicatorColor={"#FFFFFF"} 
            >
                <Map 
                    goToPage={this.goToPage} location={this.props.location} navigation={this.props.navigation}
                />
                <Messages 
                    goToPage={this.goToPage}
                />
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
})

export default Home