import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // replace w/api request
  const DOCUMENTS = [
    {
      uid: 1,
      title: "bill 1",
      signing_date: "YYYY-MM-DD",
      president: "uncle sam",
    },
    {
      uid: 1,
      title: "bill 2",
      signing_date: "YYYY-MM-DD",
      president: "uncle sam",
    },
    {
      uid: 1,
      title: "bill 3",
      signing_date: "YYYY-MM-DD",
      president: "uncle sam",
    },
  ];

  return (
    <>
      {
        DOCUMENTS.map((doc) => {
          return (
            <li>
              <ul key={doc.uid}>
                <div>
                  {doc.title}
                </div>
                <div>
                  {doc.signing_date}
                </div>
                <div>
                  {doc.president}
                </div>
              </ul>
            </li>
          )
        })
      }
    </>
  )
}

export default App
