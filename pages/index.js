import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { Inter } from '@next/font/google';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import Form from "@/components/formInputs";
import Search from "@/components/searchInput";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [modal_active, setModal] = useState(false);
  const [danger, setDanger] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [helpTab, setHelpTab] = useState(false);
  const [vocabularyTab, setVocabularyTab] = useState(false);
  const [showSynonyms, setShowSynonyms] = useState(false);
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [synonymWord, setSynonymWord] = useState('');
  const [searchWord, setSearchWord] = useState('');

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    if(event.target.word.value != '' && event.target.synonym.value != ''){
      try{
        let data = {
            // word: event.target.word.value,
            // synonym: event.target.synonym.value,
            
            word:keyWord.toLowerCase(),
            synonym:synonymWord.toLowerCase(),
          }
          fetch('/api/form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res)=>{
            console.log("response received!")
            if (res.status === 200) {
                console.log('Response succeeded!')
                setModal(false)
                setThankYou(true)
                setKeyWord('')
                setSynonymWord('')
                setDanger(false)
                setData(prevState => [...prevState, data]);
              }
          })
      }catch (error) {
        alert(error?.message || "Something went wrong");
      } 
    }
    else{
      setDanger(true);
    }
   
  }
  const handleSearch = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    try{
      let question = event.target.search.value.toLowerCase();
        
        fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(question)
        }).then((res)=>{
          console.log("response received!")
          if (res.status === 200) {
              console.log('Response succeeded!')
              setShowSynonyms(true)
              setSearchWord('')
              setResults(prevState => [...prevState, question]);
            }
        })
    }catch (error) {
      alert(error?.message || "Something went wrong");
    } 
  }


//looking does searched word is in any objects .word or .synonym
const filtered = data.filter(instance =>{
  return ((instance.word === results[results.length-1] || instance.synonym.includes(results[results.length-1])));
});
const sortByKey = filtered.sort((a,b)=>{
  if(a.word===results[results.length-1]){
    return -1;
  }
  else if(b.word===results[results.length-1]){
    return 1;
  }
  return a.name < b.name ? -1 : 1;;
});

//filtering synonyms from "sortByKey" array
const synsToArray = sortByKey.map(i => { return (i['synonym'])});
//dividing if synonym has more words in it
const allSyns = (synsToArray.map(i => { return (i.split(/[ ,]+/))})).flat(1);
//filtering only words from "sortByKey" array
const allKeys = sortByKey.map(i => { return (i['word'])});
//merging two arrays (with words and synonyms) into one
const allResult = allKeys.concat(allSyns);
//removing duplicates if any
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
const sorted = removeDuplicates(allResult);

//matching idexes
function ordered(allSyns)
{
  const result = []
  for (let i = 0, n = allSyns.length; i + 1 < n; i += 2) {
    result.push([allSyns[i]])
  }
  return result
}
const result = ordered(allSyns).map((pair, index) => {
  return [allKeys[index], ...pair].join(',')
});
//merging sorted array and removing duplicates to achieve correct result (return first synonyms of the word if the search word is already added as a word)
const finalResult = removeDuplicates(((result.map(i => { return (i.split(/[ ,]+/))})).flat(1)).concat(sorted));
console.log("rezult:",finalResult);

return (
    <>
      <Head>
        <title>Synonym Search Engine</title>
        <meta name="description" content="Enter a word to see its synonyms!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="main">
        <Navbar helpTab={helpTab} setHelpTab={setHelpTab} setVocabularyTab={setVocabularyTab} vocabularyTab={vocabularyTab}/>
        <div className={`modal ${modal_active ? "is-active" : ""} `} id="synonym_modal">
          <div className="modal-background" onClick={() => setModal(!modal_active)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Adding new word and its synonyms</p>
              <button className="delete" aria-label="close" onClick={() => setModal(false)}></button>
            </header>
            <section className="modal-card-body">
              <Form handleSubmit={handleSubmit} setModal={setModal} keyWord={keyWord} synonymWord={synonymWord} setKeyWord={setKeyWord} setSynonymWord={setSynonymWord} setDanger={setDanger} danger={danger}/>
            </section>
          </div>
        </div>
        <div className={`modal thankYouModal ${thankYou ? "is-active" : ""} `}>
          <div className="modal-background" onClick={() => setThankYou(!thankYou)}></div>
          <div className="modal-content">
            <p className="headline">Your new word is successfully added!</p>
            <p className="content">Thank you.</p>
          </div>
          <button className="modal-close is-large" onClick={() => setThankYou(!thankYou)} aria-label="close"></button>
        </div>
        {!helpTab && !vocabularyTab ?
        <><Search modal_active={modal_active} setModal={setModal} handleSearch={handleSearch} setSearchWord={setSearchWord} searchWord={searchWord}/> 
        {results[results.length-1] && results[results.length-1]?<section className="section synonyms-block">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-10">
              {results[results.length-1] && filtered && filtered.length>0?
              <>
                {/* <div id="spinner">
                  <Image
                  className="spinner icon"
                  src="/images/spinner.svg"
                  alt="spinner icon"
                  width={50}
                  height={50} 
                />
              </div> */}
                <div className="inner" id="list">
                <h2 className="headline">{`Synonyms for the word ${results[results.length-1]} are:`}</h2>
                <div className="synonim-container">

                 {/* {sorted ? sorted.map(i => {
                  return(
                    <p>{i}</p>
                  )
                 }):''} */}
                 {finalResult? finalResult.filter(word=>word!=results[results.length-1]).map(i=>{
                   return(
                    <p>{i}</p>
                  )
                 }):''}
                 </div>
                </div></>
               :<h2 className="headline">{`There is no synonyms for the word ${results[results.length-1]}.`}</h2>}
              </div>
            </div>
          </div>
        </section>:''}
        </>
        : ''}
        <section className={`section ${vocabularyTab?"is-active":'is-hidden'}`} id="vocabulary">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="inner">
                  <h2 className="headline">This is current vocabulary list:</h2>
                  <div className="inner">
                   <table className="is-narrow">
                        <thead>
                          <tr>
                            <th>Word</th>
                            <th>Synonym</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data && data.map(i=>{
                                                return (
                                                  <tr>
                                                    <td className="has-text-weight-bold">{i.word}</td>  
                                                    <td>{i.synonym}</td>                          
                        
                                                  </tr>
                                                )
                                              })}
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={`section help ${helpTab?"is-active":'is-hidden'}`} id="help">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="inner">
                  <h2 className="title is-2">Need help?</h2>
                  <p>We provide you with a step by step tutorial for Synonym search app for better understanding and correct usage.</p>
                  <ul>
                    <li>1. At the begining, your app has no data/words. You have to add them using "add a new word here button".</li>
                    <li>2. A modal will open and in the first filed you have to type in the word you want</li>
                    <li>3. In the second field, you enter all synonyms for that word, separated with comma.</li>
                    <li>4. When done, click SUBMIT button. If you want to quit, click CANCEL button or small x icon in a top right corner.</li>
                    <li>5. Your updated vocabulary is now on the My Vocabulary link, and you can search it through search input.</li>
                    <li>6. If the word you entered in a search bar is not in your vocabulary, message that the word has no synonyms will be displayed.</li>

                  </ul>
              </div>

              </div>
            </div>
          </div>
        </section>
       
      </main>
    </>
  )
}
