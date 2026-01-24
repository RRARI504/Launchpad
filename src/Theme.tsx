// needs something in dash editor to open this component
// could add dashboard name change here if needed
/**
 * need bgColor POST and PATCH
 * need navColor POST and PATCH
 * need text color POST and PATCH - idk if i need this or not
 * need font POST and PATCH
 * display all themes the user has - GET
 * might also add a default palette if user has no them
 */


import { useState, useEffect} from 'react';
import Color from './ColorPicker';
import axios from 'axios';



function Theme ({dashboard, ownerId}: {dashboard: { name: string, ownerId: number}, ownerId: number}) {
  const [themesList, setThemesList] = useState([] as {navColor: string, bgColor: string, font: string}[]);
  const [currTheme, setCurrTheme] = useState(themesList[0]);
  // const [form, setForm] = useState({navColor: 'white', bgColor: 'white', font: 'ariel'});
  //const [test, setTest] = useState('test')
  const [navColorPick, setNavColorPick] = useState('#ff0000');
  const [bgColorPick, setBgColorPick] = useState('#ff0000');
  const [fontPick, setFontPick] = useState('#ff0000');
  // first lets get all the themes of that user
  const allThemes = async () => {
    
    try {
      const test = await axios.get(`/theme/${ownerId}`);
      setThemesList(test.data);

    } catch (error) {
      console.error('Failed to get all of your themes', error);
    }
  }
  
  const colorPicker = (e: any) => {
    console.log(e)
    //setNavColorPick(e.value.toString('hex'))
    
  }

  // POST to make a new theme
  // make sure field is completely filled out
  // const newTheme = async () => {
  //   const ownerId = dashboard.ownerId; // need to send this in the request as well
  //   try {
  //     if({isPublic: boolean, navColor: string, bgColor: string, font: string}, ownerId){
  //       // so if none of those fields are empty
  //       await axios.post('/theme', {isPublic, navColor, bgColor, font, ownerId})
  //     }
  //   } catch (error) {
  //     console.error('Failed to submit theme', error);
  //   }
  // }

// test
// const picker = Color();

  useEffect(() => {
    // if the owner is provided
    if(dashboard.ownerId){
      allThemes();
    }
  }, [dashboard.ownerId])

  return (
    <div>
    {
      themesList.map((theme) => {
        return <ul>
          <button onClick={() => setCurrTheme(theme)}> navColor: {theme.navColor} bgColor: {theme.bgColor} font: {theme.font}</button>
        </ul>
      })
    }
      <form>
        <label>navColor</label>
        <div id='navColor'>
          <Color onValueChange={colorPicker}/>
        </div>
        <label>bgColor</label>
        <div id='bgColor'>
          <Color onValueChange={colorPicker}/>
        </div>
        <label>font</label>
        <div id='font'>
          <Color onValueChange={colorPicker}/>
        </div>
      </form>
    </div>
  )
}

export default Theme;