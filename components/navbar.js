import React,{useState} from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Navbar(props) {
  const help = props.helpTab;
  const setHelp = props.setHelpTab;
  const vocabulary = props.vocabularyTab;
  const setVocabulary = props.setVocabularyTab;
  const [menu, setMenu] = useState(false);

  const handleHelp = () => {
    setVocabulary(false);
    setHelp(true);
    setMenu(false);
  }
  const handleVocabulary = () => {
    setVocabulary(true);
    setHelp(false);
    setMenu(false);
  }

  const handleHome = () => {
    setVocabulary(false);
    setHelp(false);
    setMenu(false);
  }
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" onClick={() => handleHome()}>
            <Image
              className="logo"
              src="/images/Synonym.png"
              alt="logo"
              width={180}
              height={37}
              priority
            />
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={()=>setMenu(!menu)}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${menu?"is-active":''}`}>
          <div className="navbar-start">
            <Link href="#help" as='/' passHref legacyBehavior>
              <a className={`navlink ${help ? "is-active" : ""} `} onClick={() => handleHelp()}>Help Desk</a>
            </Link>
            <Link href="#vocabulary" as='/' passHref legacyBehavior>
            <a className={`navlink ${vocabulary ? "is-active" : ""} `} onClick={() => handleVocabulary()}>My Vocabulary</a>
            </Link>
          </div>

          {/* <div className="navbar-end">
            <div className="navbar-item">
                <a className="button" href="/">ADD NEW SYNONYM</a>
            </div>
          </div> */}
        </div>
      </nav>
    </>
  )
}
