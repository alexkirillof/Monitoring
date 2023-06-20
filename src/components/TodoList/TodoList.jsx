import React, {useState, useEffect, useMemo, useContext} from "react";

import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    RefreshControl,
    ScrollView,
} from "react-native";
import {AppContext} from "../../context/AppContext";
const API_ENDPOINT = "https://647dde56af984710854a8134.mockapi.io/Posts";

export const TodoList = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showList, setShowList] = useState(false);
    const {clearImage, fetchData, prodData} = useContext(AppContext);


    useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT);
        setIsLoading(false);
    }, []);



    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size={"large"} color="#000000"/>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Ошибка загрузки данных ...Пожалуйста, проверьте ваше интернет соединение !</Text>
            </View>
        );
    }

    return (
        /*--header--*/
        <View>
            <View style={styles.header}>
                <Text style={styles.text}>
                    СПИСОК ДЕЛ
                </Text>
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    fetchData(API_ENDPOINT);
                    setShowList(true);
                }}>
                <Text style={styles.btnText}>ПОЛУЧИТЬ / ОБНОВИТЬ   СПИСОК</Text>
            </TouchableOpacity>

            {/*--render списка--*/}

            {showList && <FlatList
                data={prodData}
                keyExtractor={(item) => {
                    item.id.toString();
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => {
                    fetchData(API_ENDPOINT);
                }}/>}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                            <View style={styles.itemDescr}>
                                <Text> Задание: </Text>
                                <Text style={styles.itemText}> {item.description} </Text>
                                <Text style={styles.itemText}> {item.competitor} </Text>
                            </View>
                        <TouchableOpacity  key={item.id}
                                           style={styles.btn}
                                           onPress={() => {navigation.navigate("Article", {
                                               id: item.id,
                                               product_group: item.product_group,
                                               article: item.article,
                                               description: item.description,
                                               competitor: item.competitor,
                                           })
                                               {clearImage()}
                                           }}>

                                <Text>Взять в работу</Text>

                        </TouchableOpacity>

                    </View>
                )}
            />}
        </View>
    );
};


const styles = StyleSheet.create({
    searchBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderColor: "#5c6059",
        borderWidth: 1,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#f3f6f0",
        borderRadius: 10,
        height: 110,
        marginTop: 15,
        padding: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
        marginTop: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    btn: {
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
    btnText: {
        fontWeight: "bold",
    },
    itemDescr:{
        justifyContent:"flex-start",
        marginRight:10,
        width:"55%"
    },
    itemText:{
        fontSize:14
    }
});
