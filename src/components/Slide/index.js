import React, { Component } from 'react'
import {
    View,
    WebView,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'

export default class Slide extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { goBack } = this.props.navigation
        return (
            <View
                style={styles.constain}
            >
                <WebView
                    style={styles.constain}
                    source={{uri: 'http://www.lavazza.com/en/lavazza-world/photography/'}}
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
        width: 40,
        height: 40
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    }
})