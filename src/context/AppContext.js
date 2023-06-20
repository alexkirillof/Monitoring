import React, {createContext, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchImageLibrary} from "react-native-image-picker";


export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [regName, setRegName] = useState("");
    const [regPhone, setRegPhone] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [imageGallery, setImageGallery] = useState('');


    const register = async (name, phone, password) => {
        setIsLoading(true);
        await axios.post(`${BASE_URL}`, {
            name, phone, password,
        }).then(res => {
            let userInfo = res.config.data
            let parsedData = JSON.parse(userInfo)
            setRegName(() => parsedData.name)
            console.log(regName);
            setRegPhone(() => parsedData.phone)
            console.log(regPhone);
            setRegPassword(() => parsedData.password);
            console.log(regPassword);
            setIsLoading(false);
        }).catch(e => {
            console.log(`register error${e}`);
            setIsLoading(false);
        });
    };


    const login = (name, phone, password) => {
        setIsLoading(true);
        axios.post(`${BASE_URL}`, {
            name, phone, password,
        }).then(res => {
            let userInfo = res.config.data;
            let parsedData = JSON.parse(userInfo);
            setIsAuth(true)
            setIsLoading(false);
        }).catch(e => {
            console.log(`register error${e}`);
            setIsLoading(false);
        });
    };

    const logout = () => {
        setIsLoading(true);
        axios
            .post(
                `${BASE_URL}`,
                {},
            )
            .then(res => {
                console.log(res.config.data);
                AsyncStorage.removeItem("isAuth");
                setIsAuth(false);
                setRegName('');
                setRegPassword('');
                setRegPhone('');
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`logout error ${e}`);
                setIsLoading(false);
            });
    };


    const openGallery = () => {
        const option = {
            mediaType: 'photo',
            quality: 1
        }
        launchImageLibrary(option, (res) => {
            if (res.didCancel) {
                console.log('User Cancelled image picker')
            } else if (res.errorCode) {
                console.log(res.errorMessage)
            } else {
                const data = res.assets[0]
                setImageGallery(data)
                console.log(data)
            }
        })
    }

    const clearImage = () => {
        setImageGallery(null)
    }


    return (
        <AppContext.Provider value={{
            isLoading,
            isAuth,
            register,
            login,
            logout,
            regName,
            regPhone,
            imageGallery,
            clearImage,
            openGallery
        }}>
            {children}
        </AppContext.Provider>
    );
};

