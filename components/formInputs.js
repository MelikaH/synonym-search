import React, { useState } from "react";

export default function Form(props) {

    const handleSubmit = props.handleSubmit;
    const setModal = props.setModal;
   const keyWord = props.keyWord;
   const synonymWord = props.synonymWord;
   const setKeyWord = props.setKeyWord;
   const setSynonymWord = props.setSynonymWord;
   const setDanger = props.setDanger;
   const danger = props.danger;

    return (
        // <form action="/api/form" method="post">
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label" htmlFor="word">Key word</label>
                <div className="control">
                    <input className={`input ${danger?'is-danger':''}`} type="text" placeholder="E.g. Cold" id="word" name="word" onChange={(e) => { setKeyWord(e.target.value) }} value={keyWord} />
                </div>
                <p className={`error ${danger?'has-text-danger':'is-hidden'}`}>This field is required!</p>
            </div>
            <div className="field">
                <label className="label" htmlFor="synonym">Synonyms</label>
                <div className="control">
                        <textarea className={`textarea ${danger?'is-danger':''}`} placeholder="Separate each synonym with a comma (e.g. cool, freezing)." id="synonym" name="synonym" onChange={(e) => { setSynonymWord(e.target.value) }}  value={synonymWord}></textarea>
                </div>
                <p className={`error ${danger?'has-text-danger':'is-hidden'}`}>This field is required!</p>

            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button className="button" type="submit">Submit</button>
                </div>
                <div className="control">
                    <button className="button is-light" onClick={() => setModal(false)}>Cancel</button>
                </div>
            </div>
        </form>
    )
  }