import './App.css';
import { useEffect, useState } from 'react';

// TODO: add basic search functionality
// TODO: add randomizer (how to get a list of available books and verses?)

function App() {

    const [ verse, setVerse ] = useState('')
    const [ title, setTitle ] = useState('Bible Verses')

    return <>
        <div className="container">
            <VerseTitle title={ title } /> {/* Components get rerendered when their props change */}
            <VerseText text={ verse } />
            <VerseLookupForm callback={(data) => {
                setTitle(data.title)
                setVerse(data.text)
            }} />        
        </div>
    </>
}

function VerseTitle({ title }) {
    return <h1>{ title }</h1>
}

function VerseText({ text }) {
    return <p>{ text }</p>
}

function VerseLookupForm({ callback }) {

    const [ book, setBook ] = useState('Matthew')
    const books = [
        {
            name: "Matthew",
            chapters: [
                {
                    chapter: 9,
                    maxVerse: 15,
                }
            ]
        },
        {
            name: "John",
            chapters: [
                {
                    chapter: 9,
                    maxVerse: 75,
                }
            ]
        }
    ]

    const bookChoices = books.map(( choice ) => <option value={choice.name} key={choice.name}>{ choice.name }</option>)

    // Make the callback async to resolve the promise
    const onFormSubmit = async () => {
        const results = await fetchVerseData( book, 9, 9 )
        callback(results)
    }

    return (
        <form name="select-verse">
            <label htmlFor="book">Select Book: </label>
                <select id="book" name="book" key={ book } defaultValue={ book }onChange={(e) => setBook(e.target.value)}>
                    { bookChoices }
                </select>
            <button className="lookup-verse" type="button" onClick={ onFormSubmit }
            >Look Up Verse</button>
        </form>
    )
}

async function fetchVerseData( book, verse, chapter ) {

    const url = 'https://bible-api.com/' + book + '+' + chapter + ':' + verse + "?translation=kjv"
    let results = await fetch(url, {
        method: 'GET',
        accepts: 'application/json',
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw res.statusText
        }
    })
    .then((data) => {
        let output = '';
        let verses = data.verses;

        verses.forEach((verse) => output += verse.text + ' ') // pad with a space

        return {
            title: data.reference,
            text: output,
        }
    })
    .catch(e => console.log(e));

    return results
}

export default App;