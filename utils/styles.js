import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },
    tipsImage: {
        width: '95%',
        height: 200,
        margin: 10,
        borderRadius: 10,
    },
    tipsListImage: {
        width: '50%',
        height: 100,
        marginRight: 10,
    },
    header: {
        fontSize: 30,
        alignSelf: "center"
    },
    tipsCard: {
        flexDirection: 'row',
    },
})