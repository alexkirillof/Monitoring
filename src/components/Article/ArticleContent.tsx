import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {AppContext} from '../../context/AppContext';

export const ArticleContent = ({
  route,
  navigation,
}: {
  route: string;
  navigation: string;
}) => {
  const {
    imageGallery,
    regName,
    openGallery,
    isPromotion,
    setIsPromotion,
    price,
    setPrice,
    comment,
    setComment,
    noPrice,
    setNoPrice,
    sendData,
    data,
    actualDate,
  } = useContext(AppContext);
  const {id, product_group, article, description, competitor} =
    route.params || {};

  return (
    <View style={{height: '100%'}}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.arrowBack}
          onPress={() => navigation.navigate('TodoList')}>
          <Text style={styles.arrow}> &#8592;</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Карточка артикула</Text>
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

        {imageGallery != '' && (
          <Image source={{uri: imageGallery.uri}} style={styles.img} />
        )}
        <TextInput
          style={styles.input}
          value={price}
          keyboardType="number-pad"
          placeholder={'Ц Е Н А'}
          onChangeText={text => setPrice(text)}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isPromotion}
            onValueChange={setIsPromotion}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Акция</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={noPrice}
            onValueChange={setNoPrice}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Ценник отсутствует</Text>
        </View>
        <TextInput
          style={[styles.input, styles.commentInput]}
          placeholder="К О М Е Н Т А Р И Й"
          value={comment}
          onChangeText={text => setComment(text)}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              sendData(
                regName,
                product_group,
                article,
                data,
                description,
                competitor,
                price,
                isPromotion,
                noPrice,
                comment,
                actualDate,
              );
              console.log('ушло');
            }}>
            <Text style={styles.textName}>О Т П Р А В И Т Ь</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    margin: 3,
  },
  block: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f3f6f0',
    borderRadius: 25,
  },
  arrowBack: {
    height: 50,
    aspectRatio: 1,
    backgroundColor: '#b9fbb0',
    borderRadius: 25,
    paddingHorizontal: 6,
    marginRight: 30,
  },
  arrow: {
    color: '#000',
    fontSize: 26,
    aspectRatio: 1,
  },
  headerTitle: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    width: '55%',
    height: 40,
    backgroundColor: '#b9fbb0',
    elevation: 3,
    alignItems: 'center',
    borderRadius: 6,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    marginBottom: 15,
    marginTop: 10,
    padding: 10,
  },
  img: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  input: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    height: 40,
    width: '55%',
  },
  commentInput: {
    width: '100%',
  },
});
