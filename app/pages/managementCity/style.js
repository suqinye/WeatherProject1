import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        inputView: {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15
        },
        inputBtn: {
            height: 35,
            backgroundColor: '#fff',
            borderRadius: 2,
            borderColor: '#c9c9c9',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderWidth: 1,
        },
        groupBtn: {
            height: 33,
            width: 170,
            backgroundColor: '#eaf7ff',
            borderRadius: 5,
            borderColor: '#2fb5fe',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        listGruoup: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
        },
        rowStaff: {
            paddingTop: 10,
            alignItems: 'center',
            height: 85,
        },
        horizontalList: {
            width: screenWidth,
        }
    }
)