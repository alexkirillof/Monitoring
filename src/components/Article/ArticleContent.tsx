import React, {useState, useEffect, useContext} from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    RefreshControl,

} from "react-native";
import {AppContext} from "../../context/AppContext";


export const ArticleContent = ({route, navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const { imageGallery,openGallery } = useContext(AppContext);

    const {id, product_group, article, description, competitor} = route.params || {};


    return (
        <View style={{height: "100%"}}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowBack} onPress={() => navigation.navigate("TodoList")}>
                    <Text style={styles.arrow}> &#8592;</Text>
                </TouchableOpacity>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerText}>
                        Карточка артикула
                    </Text>
                </View>
            </View>
            <View style={styles.block}>
                <Text style={styles.text}> Товарная группа: {product_group}</Text>
                <Text style={styles.text}> Артикул: {article}</Text>
                <Text style={styles.text}> Наименование: {description}</Text>
                <Text style={styles.text}> Магазин конкурента: {competitor}</Text>

                <TouchableOpacity style={styles.btn} onPress={openGallery}>
                    <Text>Загрузить фото</Text>
                </TouchableOpacity>

                {imageGallery != null &&
                    <Image source={{uri: imageGallery.uri}}
                           style={styles.img}/>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",

    },
    header:{
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems:'center'
    },
    textName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    text: {
        fontSize: 14,
        margin: 3,
    },
    block: {
        flex: 1,
        flexDirection: "column",
        marginTop: 15,
        padding: 15,
        backgroundColor: "#f3f6f0",
        borderRadius: 25,
    },
    arrowBack: {
        height: 50,
        aspectRatio: 1,
        backgroundColor: "#ccc",
        borderRadius: 25,
        paddingHorizontal: 6,
        marginRight:30
    },
    arrow: {
        color: "#fff",
        fontSize: 26,
        aspectRatio: 1,

    },
    headerTitle: {
        alignItems: "center",
        marginBottom: 30,
        marginTop: 30,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    btn: {
        width: "40%",
        height: 40,
        backgroundColor: "#b9fbb0",
        elevation: 3,
        alignItems: 'center',
        borderRadius: 6,
        shadowOffset: {
            width: 2,
            height: 2
        },
        marginBottom: 20,
        marginTop: 20,
        padding: 10
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 10
    },


});


