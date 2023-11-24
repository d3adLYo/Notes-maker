import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('notesData', jsonValue);
    } catch (e) {
      // saving error
    }
  };

const getData = async () => {
try {
    const notesData = await AsyncStorage.getItem('notesData');
    return notesData !== null ? JSON.parse(notesData) : [];
} catch (e) {
    // error reading value
}
};

export { storeData, getData };