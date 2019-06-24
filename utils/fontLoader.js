import {Font} from 'expo';


const FontLoader = module.exports = async ()=>{
    await Font.loadAsync({
        'Title-font-Mali': require('../assets/Fonts/Mali-Bold.ttf'),
        'Normal-Text-Mali': require('../assets/Fonts/Mali-Light.ttf'),
        'Normal-text-open': require('../assets/Fonts/OpenSansCondensed-Light.ttf'),
        'Heading': require('../assets/Fonts/OpenSansCondensed-Bold.ttf')
      });
}

export default FontLoader;