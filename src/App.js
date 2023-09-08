import './App.css';
import { useState } from 'react';
import Select from 'react-select';
import Books from './books.js';

function App() {

    const [ verse, setVerse ] = useState('')
    const [ title, setTitle ] = useState('')
    const header = 'The King James Bible'

    return <>
        <div className="container">
            <Header header={ header } /> {/* Components get rerendered when their props change */}
            <VerseTitle title={ title } />
            <VerseText text={ verse } />
            <VerseLookupForm callback={(data) => {
                setTitle(data.reference)

                let output = ''
                data.verses.forEach((v) => {
                    output += v.verse + ': '
                    output += v.text
                })

                setVerse(output)
            }} />        
        </div>
    </>
}

function Header({ header }) {

    return <h1>{ header }</h1>
}

function VerseTitle({ title }) {

    return <h2>{ title }</h2>
}

function VerseText({ text }) {

    return (
        <div className="verse-text">
            <p>{ text }</p>
        </div>
    )
}

function VerseLookupForm({ callback }) {

    // Name is the human-readable name, key is what gets passed to the API

    const [ book, setBook ] = useState(Books[0]) // Matthew by default cause the Gospels are cool
    const [ chapter, setChapter ] = useState(book.chapters[0])
    const [ verseStart, setVerseStart ] = useState({label: "Verse 1", value: 1})
    const [ verseEnd, setVerseEnd ] = useState({label: "Verse 1", value: 1})

    const verseStartOptions = (chapter) => {
        let opts = []

        for (let i = 1; i <= chapter.maxVerse; i++) {
            opts.push({label: "Verse " + i, value: i})
        }

        return opts
    }

    const verseEndOptions = (chapter, verse) => {
        let opts = []

        for (let i = verse.value; i <= chapter.maxVerse; i++) {
            opts.push({label: "Verse " + i, value: i})
        }

        return opts
    }
    
    // Make the callback async to resolve the promise
    const onFormSubmit = async () => {
        const results = await fetchVerseData( book, chapter, verseStart, verseEnd )
        callback(results)
    }

    return (
        <form name="select-verse">
            <Select
                className="verse-select"
                value={ book }
                options={ Books }
                onChange={ option => setBook(option) }
                placeholder="Select Book"
                isSearchable={ false }
            /> 
            <Select
                className="verse-select"
                value={ chapter }
                options={ book.chapters }
                onChange={ option => setChapter(option)}
                placeholder="Select Chapter"
                isSearchable={ false }
            />
            <Select
                className="verse-select"
                value={ verseStart }
                options={ verseStartOptions(chapter)}
                onChange={ option => {
                    setVerseStart(option)

                    if (option.value > verseEnd.value) {
                        setVerseEnd(option)
                    }
                }}
                placeholder="Select Starting Verse"
                isSearchable={ false }
            />
            <Select
                className="verse-select"
                value={ verseEnd } 
                options={ verseEndOptions(chapter, verseStart)}
                onChange={ option => setVerseEnd(option)}
                placeholder="Select Ending Verse"
                isSearchable={ false }
            />
            <button className="lookup-verse" type="button" onClick={ onFormSubmit }
            >Look Up Verse</button>
        </form>
    )
}

async function fetchVerseData( book, chapter, verseStart, verseEnd ) {

    const translation = 'kjv' // King James Version
    const url = 'https://bible-api.com/' + book.value + '+' + chapter.value + ':' + verseStart.value + '-' + verseEnd.value + "?translation=" + translation
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
    .catch(e => { return {title: 'Something went wrong...', text: e}});

    return results
}

export default App;