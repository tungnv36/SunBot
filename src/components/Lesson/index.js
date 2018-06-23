import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    Dimensions,
    WebView,
    ScrollView,
    Animated
} from 'react-native'
import Constant from '../../constants/Constant'
import ImageSlider from 'react-native-image-slider';
import { BlurView, VibrancyView } from 'react-native-blur';
import CallApi from '../../Api/CallApi';

export default class Lesson extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr_images: [
                // 'https://placeimg.com/640/640/nature',
                // 'https://placeimg.com/640/640/people',
                // 'https://placeimg.com/640/640/animals',
                // 'https://placeimg.com/640/640/beer',
            ],
            arr_info: [],
            position: 1,
            interval: null,
            bottomSunBot: new Animated.Value(0),
        }
    }

    componentWillMount() {
        setTimeout(() => {
            Animated.spring(
                this.state.bottomSunBot,
                {
                    toValue: 1,
                    bounciness: 10,
                    useNativeDriver: true
                }
            ).start()
        }, 100)

        // this.getSlider()
        // this.setState({
        //     interval: setInterval(() => {
        //         this.setState({ position: this.state.position === 2 ? 0 : this.state.position + 1 });
        //     }, 2000)
        // });
    }

    componentWillUnmount() {
        // clearInterval(this.state.interval);
    }

    getSlider = async () => {
        const { navigation } = this.props;
        const key = navigation.getParam('key', '0');

        const api = CallApi.createAPI()
        const taskGet = await api.getSlider(key)
        var items = []
        var items_info = []
        if (taskGet.ok) {
            console.log('taskGetSlider', taskGet.data)
            var data = taskGet.data
            if (data === null) {
                setTimeout(() => {
                    alert('Không có khoá học nào')
                })
            } else {
                for (let i = 0; i < data.length; i++) {
                    items_info.push({
                        key: data[i].id.toString(),
                        lessonId: data[i].lessonId,
                        pageNumber: data[i].pageNumber,
                    })
                    items.push(
                        data[i].imageUrl.toString()
                    )
                }
                console.log('items', items)
                this.setState({
                    arr_images: items,
                    arr_info: items_info
                })
            }
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const { navigation } = this.props;
        const key = navigation.getParam('key', '0');
        const index = navigation.getParam('index', '0');
        const description = navigation.getParam('description', '');
        const content = navigation.getParam('content', '');
        return (
            <ImageBackground
                style={styles.container}
                source={require('../../assets/bg-sunbot-3.png')}
            >
                <ImageBackground
                    style={styles.panel}
                    source={require('../../assets/panel-intro.png')}
                    resizeMode='stretch'
                >
                    <Text
                        style={styles.title}
                    >
                        {`Bài ${index}`}
                    </Text>
                    <ScrollView
                        style={styles.description}
                    >
                        <Text
                            style={styles.textDescription}
                        >
                            {description}
                        </Text>
                    </ScrollView>
                    <View
                        style={{
                            width: '100%',
                            height: '30%'
                        }}
                    />
                </ImageBackground>
                <Animated.Image
                    style={[styles.sunbot, {
                        transform: [{
                            translateY: this.state.bottomSunBot.interpolate({
                                inputRange: [0, 1],
                                outputRange: [Dimensions.get('window').height / 2, 0]
                            }),
                        }]
                    }]}
                    source={require('../../assets/sunbot-right.png')}
                    resizeMode='contain'
                />
                <View
                    style={styles.button}
                >
                    <Image
                        style={styles.column}
                        source={require('../../assets/column.png')}
                        resizeMode='contain'
                    />
                    <View
                        style={styles.viewButton}
                    >
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => navigate('Slide', {
                                content
                            })}
                        >
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                source={require('../../assets/button_slide.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => navigate('GamePlay', {
                                lessonId: key
                            })}
                        >
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}
                                source={require('../../assets/button_play.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuButton}
                            onPress={() => goBack(null)}
                        >
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}
                                source={require('../../assets/button_back.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    panel: {
        width: '80%',
        height: '95%',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 22,
        fontFamily: 'Pacifico',
        textAlign: 'center',
        // backgroundColor: '#FFF'
    },
    description: {
        width: '70%',
        height: 100,
        marginTop: 60,
        // backgroundColor: '#FFF'
    },
    textDescription: {
        width: '100%',
        height: '100%',
        fontSize: 16
        // backgroundColor: '#FFF'
    },
    sunbot: {
        position: 'absolute',
        bottom: -20,
        left: -50,
        width: '30%',
        height: '50%',
        // backgroundColor: '#FFF'
    },
    button: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        width: '18%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    column: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    viewButton: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '80%',
        // backgroundColor: '#FFF'
    },
    menuButton: {
        width: '100%',
        height: '30%',
        marginBottom: 2,
        marginTop: 2,
    }
});