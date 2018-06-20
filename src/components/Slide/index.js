import React, { Component } from 'react'
import {
    View,
    WebView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native'
import HTML from 'react-native-render-html';

export default class Slide extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { goBack } = this.props.navigation
        const { navigation } = this.props;
        const content = navigation.getParam('content', '');
        return (
            <View
                style={styles.constain}
            >
                {/* <WebView
                    style={styles.constain}
                    source={{uri: 'http://www.lavazza.com/en/lavazza-world/photography/'}}
                /> */}
                <HTML 
                    style={styles.constain}
                    html={content}
                    imagesMaxWidth={Dimensions.get('window').width} 
                />
                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => goBack(null)}
                >
                    <Image
                        style={styles.imageStyle}
                        source={require('../../assets/ic-stone-close.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flex: 1
    },
    buttonBack: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 30,
        height: 30
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    }
})