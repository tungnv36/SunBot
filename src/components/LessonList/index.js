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
    Animated
} from 'react-native'
import Constant from '../../constants/Constant'
import { BlurView, VibrancyView } from 'react-native-blur';
import CallApi from '../../Api/CallApi';

export default class LessonList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr_lesson: [
                // { key: '0', name: 'Bài 1', background: '#1176BF' },
                // { key: '1', name: 'Bài 2', background: '#F31527' },
                // { key: '2', name: 'Bài 3', background: '#82B354' },
                // { key: '3', name: 'Bài 4', background: '#8D59B9' },
                // { key: '4', name: 'Bài 5', background: '#D9524D' },
                // { key: '5', name: 'Bài 6', background: '#1176BF' },
                // { key: '6', name: 'Bài 7', background: '#F31527' },
                // { key: '7', name: 'Bài 8', background: '#82B354' },
                // { key: '8', name: 'Bài 9', background: '#8D59B9' },
                // { key: '9', name: 'Bài 10', background: '#D9524D' },
                // { key: '10', name: 'Bài 11', background: '#1176BF' },
                // { key: '11', name: 'Bài 12', background: '#F31527' },
            ],
            bottomSunBot: new Animated.Value(0),
            scaleItem: new Animated.Value(0)
        }
    }

    componentWillMount() {
        this.getLesson()
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

    getLesson = async () => {
        const { navigation } = this.props;
        const key = navigation.getParam('key', '0');

        const api = CallApi.createAPI()
        const taskGet = await api.getLesson(key)
        var items = []
        if (taskGet.ok) {
            console.log('taskGet A', taskGet.data)
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
                        content: data[i].content
                    })
                }
                console.log('items', items)
                this.setState({
                    arr_lesson: items
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
        return (
            <ImageBackground
                style={styles.constain}
                source={require('../../assets/bg-sunbot-2.png')}
            >
                <View
                    style={{
                        width: '100%',
                        height: '10%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
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
                    <Text
                        style={{
                            fontSize: 22,
                            color: '#F00',
                            fontWeight: 'bold',
                            fontFamily: 'Pacifico',
                        }}
                    >
                        Danh sách bài học
                    </Text>
                    <View
                        style={{
                            width: 50,
                            height: 50
                        }}
                    />
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '65%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <FlatList
                        style={{
                            flex: 1,
                            // width: (this.state.arr_courses.length * (Dimensions.get('window').width / 3 - 40) + this.state.arr_courses.length * 20) > Dimensions.get('window').width ? '100%' : this.state.arr_courses.length * (Dimensions.get('window').width / 3 - 40) + this.state.arr_courses.length * 20,
                            // height: '75%',
                            // marginLeft: 10,
                            // marginRight: 10,
                            // marginTop: 20
                        }}
                        data={this.state.arr_lesson}
                        renderItem={
                            ({ item, index }) => (
                                <TouchableOpacity
                                    style={[styles.row, {
                                        transform:[{
                                            scale: this.state.scaleItem
                                        }]
                                    }]}
                                    onPress={() => navigate('Lesson', {
                                        key: item.key,
                                        description: item.description,
                                        index: index + 1,
                                        content: item.content
                                    })}
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
                                            {`Bài ${index + 1}`}
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
                </View>
                <ImageBackground
                    style={styles.viewTop}
                    source={require('../../assets/pannel-bottom.png')}
                >
                    <Animated.Image
                        style={[styles.logo, {
                            transform: [{
                                translateY: this.state.bottomSunBot.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [Dimensions.get('window').height / 2, 10]
                                }),
                            }]
                        }]}
                        source={require('../../assets/sunbot-right.png')}
                        resizeMode='contain'
                    />
                    <View
                        style={styles.viewBot}
                    ></View>
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
                            {`Khoá ${index}`}
                        </Text>
                        <Text
                            style={{
                                color: '#FFF',
                                fontSize: 12,
                            }}
                        >
                            {description}
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
        left: 0,
        bottom: -10
    },
    // row: {
    //     width: (Dimensions.get('window').width - 120) / 6,
    //     height: (Dimensions.get('window').width - 120) / 6,
    //     borderRadius: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     margin: 10,
    //     backgroundColor: '#FFF'
    //     // borderWidth: 1,
    //     // borderColor: '#FFF'
    // },
    row: {
        width: Dimensions.get('window').width / 3 - 40,
        height: 3 * Dimensions.get('window').height / 5 - 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    subrow: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // width: (Dimensions.get('window').width - 120) / 6,
        // height: (Dimensions.get('window').width - 120) / 6,
        // borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 10,
        // borderWidth: 1,
        // borderColor: '#FFF'
    },
    textRow: {
        color: '#525252',//'#737373',
        fontSize: Constant.NUMBER.FONT_SIZE_LARGE
    },
    bottomView: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingRight: 10,
        // paddingTop: 10,
        // backgroundColor: '#DDD'
    },
    buttonIcon: {
        padding: 5
    },
    icon: {
        width: 40,
        height: 40
    },
    iconSmall: {
        height: Dimensions.get('window').height / 7,
        width: Dimensions.get('window').height / 7,
    },
    titleView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingBottom: 15
    },
    centerView: {
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        fontSize: Constant.NUMBER.FONT_SIZE_22,
        fontWeight: 'bold',
        fontFamily: 'Pacifico',
        color: '#FFF'
    },
    subTitle: {
        fontSize: Constant.NUMBER.FONT_SIZE_12,
        color: '#FFF'
    }
})