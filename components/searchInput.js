import Image from 'next/image';

export default function Search(props) {
    const setModal = props.setModal;
    const modal_active = props.modal_active;
    const handleSearch = props.handleSearch;
    const searchWord = props.searchWord;
    const setSearchWord = props.setSearchWord;

    return(
        <section className="section with_input">
          <div className="container">
          <div className="center">
            <Image
              className="logo"
              src="/images/Synonym.png"
              alt="logo"
              width={180}
              height={37}
              priority
            />
            <p className="content">
              Enter your word to find its synonyms.
            </p>
             <form onSubmit={handleSearch}>
                <div className="thirteen">
                    <input type="text" name="search" id="search" value={searchWord} onChange={(e) => { setSearchWord(e.target.value) }} />
                        <Image
                        src="/images/search.svg"
                        alt="magnifying glass icon"
                        width={15}
                        height={15}
                        />
                        <button type="submit" className='is-hidden'>Submit</button>
                </div>
            </form>
              
            <p className="content small">...or </p>
            <button className="button" onClick={() => setModal(!modal_active)}>add a new word here.</button>
          </div>
        
          </div>
        </section>
    )
}
