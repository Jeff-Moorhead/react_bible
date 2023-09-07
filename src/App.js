import './App.css';
import { useEffect, useState } from 'react';

// TODO: add basic search functionality
// TODO: add randomizer (how to get a list of available books and verses?)

function App() {

    const [ verse, setVerse ] = useState('')
    const fetchVerseData = () => {
        const url = "https://bible-api.com/matthew+9:9-13?translation=kjv"
        fetch(url, {
            method: 'GET',
            accepts: 'application/json',
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            let output = '';
            let verses = data.verses;

            verses.forEach((verse) => output += verse.text + ' ') // pad with a space
            setVerse(output)
        });
    }

    useEffect(() => fetchVerseData())

    return <h1>{ verse }</h1>
}

function VerseTitle() {

}

function VerseText() {

}

export default App;