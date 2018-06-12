import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    WebView,
    Platform,
    Image
} from 'react-native'

export default class PlayVideo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { goBack } = this.props.navigation
        const { navigation } = this.props;
        
        return (
            <View
                style={styles.constain}
            >
                <TouchableOpacity
                    style={styles.buttonIcon}
                    onPress={() => goBack(null)}
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30
                        }}
                        resizeMode='contain'
                        source={require('../../assets/ic-stone-close.png')}
                    />
                </TouchableOpacity>
                <WebView
                    style={styles.WebViewContainer}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: navigation.getParam('url', '') }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flex: 1
    },
    WebViewContainer: {
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    },
    buttonIcon: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000
    }
})