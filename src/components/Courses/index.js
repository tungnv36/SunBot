import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Platform,
    StatusBar,
    Animated
} from 'react-native'
import Constant from '../../constants/Constant'
import CallApi from '../../Api/CallApi';
import { CLIENT_ERROR } from 'apisauce';
import { BlurView, VibrancyView } from 'react-native-blur';
import { PlaySound, StopSound, PlaySoundRepeat, PlaySoundMusicVolume } from 'react-native-play-sound';

export default class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr_courses: [
                // {key: '0', name: 'Khoá 1', background: '#1176BF'},
                // {key: '1', name: 'Khoá 2', background: '#F31527'},
                // {key: '2', name: 'Khoá 3', background: '#82B354'},
                // {key: '3', name: 'Khoá 4', background: '#8D59B9'},
                // {key: '4', name: 'Khoá 5', background: '#D9524D'},
                // {key: '5', name: 'Khoá 1', background: '#1176BF'},
                // {key: '6', name: 'Khoá 2', background: '#F31527'},
                // {key: '7', name: 'Khoá 3', background: '#82B354'},
                // {key: '8', name: 'Khoá 4', background: '#8D59B9'},
                // {key: '9', name: 'Khoá 5', background: '#D9524D'},
            ],
            viewRef: null,
            bottomSunBot: new Animated.Value(0),
            scaleItem: new Animated.Value(0)
        }
        if (Platform.OS === 'android') {
            StatusBar.setHidden(true)
        }
    }

    componentWillMount() {
        this.getCourses()
        // setTimeout(() => {
        Animated.spring(
            this.state.bottomSunBot,
            {
                toValue: 1,
                bounciness: 15,
                useNativeDriver: true
            }
        ).start()
        Animated.spring(
            this.state.scaleItem,
            {
                toValue: 1,
                bounciness: 15,
                useNativeDriver: true
            }
        ).start()
        // }, 500)
    }

    getCourses = async () => {
        const api = CallApi.createAPI()
        const taskGet = await api.getCourses()
        var items = []
        if (taskGet.ok) {
            // console.log('taskGet', taskGet.data)
            var data = taskGet.data
            if (data === null) {
                setTimeout(() => {
                    alert('Không có khoá học nào')
                })
            } else {
                for (let i = 0; i < data.length; i++) {
                    items.push({
                        key: data[i].id.toString(),
                        name: data[i].name,
                        background: data[i].background,
                        description: data[i].description,
                    })
                }
                console.log(items)
                this.setState({
                    arr_courses: items
                })
            }
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground
                style={styles.constain}
                source={require('../../assets/bg-sunbot.png')}
                ref={1}
            >
                {/* {this.state.isFinish === true ?
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#FF0'
                    }}
                >
                </Animated.View>:null} */}

                <FlatList
                    style={{
                        width: (this.state.arr_courses.length * (Dimensions.get('window').width / 3 - 40) + this.state.arr_courses.length * 20) > Dimensions.get('window').width ? '100%' : this.state.arr_courses.length * (Dimensions.get('window').width / 3 - 40) + this.state.arr_courses.length * 20,
                        height: '75%',
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 20
                    }}
                    data={this.state.arr_courses}
                    renderItem={
                        ({ item, index }) => (
                            <TouchableOpacity
                                style={[styles.row, {
                                    transform: [{
                                        scale: this.state.scaleItem
                                    }]
                                }]}
                                onPress={() => {
                                    // PlaySound('press')
                                    navigate('LessonList', {
                                        key: item.key,
                                        description: item.description,
                                        index: index + 1
                                    })
                                    }
                                }
                            >
                                <ImageBackground
                                    style={styles.subrow}
                                    source={require('../../assets/stone.png')}
                                    resizeMode='stretch'
                                >
                                    <Image
                                        style={{
                                            width: '50%',
                                            height: '40%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#FFF',
                                            borderRadius: 5
                                        }}
                                        source={{ uri: item.background }}
                                        resizeMode='cover'
                                    />
                                    <Text
                                        style={{
                                            height: '30%',
                                            padding: 10,
                                            fontSize: 22,
                                            color: '#525252',
                                            fontFamily: 'Pacifico'
                                        }}
                                    >
                                        {`Khoá ${index + 1}`}
                                    </Text>
                                    <Text
                                        style={{
                                            height: '20%',
                                            marginLeft: 5,
                                            marginRight: 5,
                                            textAlign: 'center',
                                            color: '#525252'
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }
                    horizontal={true}
                />
                <ImageBackground
                    style={styles.viewTop}
                    source={require('../../assets/pannel-bottom.png')}
                >
                    <Animated.Image
                        style={{
                            width: '20%',
                            height: '150%',
                            position: 'absolute',
                            left: 0,
                            bottom: -10,
                            transform: [{
                                translateY: this.state.bottomSunBot.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [Dimensions.get('window').height / 2, 10]
                                }),
                            }]
                        }}
                        source={require('../../assets/sunbot-right.png')}
                        resizeMode='contain'
                    />
                    <View
                        style={styles.viewBot}
                    />
                    <View
                        style={styles.viewText}
                    >
                        <Text
                            style={{
                                fontSize: 25,
                                fontFamily: 'Pacifico',
                                color: '#FFF',
                            }}
                        >
                            Sunbot xin chào!
                            </Text>
                        <Text
                            style={{
                                color: '#FFF',
                                fontSize: 12,
                            }}
                        >
                            Chúng ta cùng bắt đầu thử thách nhé!
                            </Text>
                    </View>
                    <View
                        style={styles.bottomView}
                    >
                        <TouchableOpacity
                            style={styles.buttonIcon}
                            onPress={() => navigate('PlayVideo', {
                                url: 'https://www.youtube.com/embed/XqZsoesa55w'
                            })}
                        >
                            <Image
                                style={styles.icon}
                                resizeMode='contain'
                                source={require('../../assets/ic-stone-play.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonIcon}
                            onPress={() => navigate('PlayVideo', {
                                url: 'https://www.youtube.com/embed/v2nQOUL6hWs'
                            })}
                        >
                            <Image
                                style={styles.icon}
                                resizeMode='contain'
                                source={require('../../assets/ic-stone-movie.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonIcon}
                        >
                            <Image
                                style={styles.icon}
                                resizeMode='contain'
                                source={require('../../assets/ic-stone-about.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    constain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewTop: {
        flexDirection: 'row',
        width: '100%',
        height: '25%'
    },
    viewBot: {
        flexDirection: 'row',
        marginLeft: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '20%',
        height: '100%',
        alignItems: 'flex-end',
    },
    viewText: {
        padding: 5,
        width: '50%',
        height: '100%',
        justifyContent: 'center'
    },
    logo: {
        width: '20%',
        height: '150%',
        position: 'absolute',
        left: 0
    },
    row: {
        width: Dimensions.get('window').width / 3 - 40,
        height: 3 * Dimensions.get('window').height / 5 - 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    subrow: {
        width: Dimensions.get('window').width / 3 - 40,
        height: 3 * Dimensions.get('window').height / 5 - 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 10
    },
    textRow: {
        fontSize: Constant.NUMBER.FONT_SIZE_LARGE,
        textAlign: 'center',
    },
    bottomView: {
        width: '30%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        padding: 5
    },
    icon: {
        width: 40,
        height: 40,
    }
})
