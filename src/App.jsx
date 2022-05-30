import './App.css'
import randColor from './FUNCTIONS/randColor'
import rand from './FUNCTIONS/randNumbers'
import { useState, useEffect, useRef } from 'react'
import Circle from './Components/Circle'

function App() {
  const [kvadr, setKvadr] = useState([])

  // 1. Sukurti aplikaciją su mygtuku “Pridėti”, kurį paspaudus atsiranda rand 5-10 kvadratukai.
  // Paspaudus dar kartą dar prisideda rand kvadratukų skaičius.

  //  Į istoriją turi būti pridedami veiksmai tiek iš “Pridėti” tiek iš “Išvalyti” mygtukų paspaudimo.
  // const history = useRef()
  const addClick = useRef(0)

  const random = rand(5, 10)
  const pridetiKvadr = () => {
    for (let i = 0; i < random; i++) {
      setKvadr((kv) => [...kv, random])
    }
    addClick.current += 1
    localStorage.setItem('prideta kartu', JSON.stringify(addClick.current))
  }
  console.log('Adklikas: ', addClick.current)
  // Padaryti mygtuką “Išvalyti”, kurį paspaudus visi kvadratukai dingsta.
  const removeClick = useRef(0)

  const isvalytiKvadr = () => {
    setKvadr((kv) => kv.slice(kv.length))
    removeClick.current += 1
    localStorage.setItem('isvalyta kartu', JSON.stringify(removeClick.current))
  }

  // Padaryti mygtuką “Atgal”, kurį paspaudus kvadratukų skaičius pasidaro lygus skaičiui, buvusiam prieš paspaudus mygtuką “Pridėti”, o paspaudus dar kartą grįžtama dar vienu žingsniu atgal (t.y. reikia sukurti “undo” funkcionalumą).

  const undo = () => {
    setKvadr((kv) => kv.slice(0, kv.length - kv[kv.length - 1]))
  }

  // Puslapį perkrovus kvadratukų skaičius pasilieka nepakitęs.
  // Puslapiui persikrovus istorija yra užmirštama. Saugoma tik istorija iki puslapiui persikraunant.

  useEffect(() => {
    const keepUnchanged = JSON.parse(localStorage.getItem('kvadratukai'))
    if (keepUnchanged) {
      setKvadr(keepUnchanged)
      localStorage.clear()
    }
    console.log('Kvadr po refresho: ', keepUnchanged)
  }, [])

  useEffect(() => {
    localStorage.setItem('kvadratukai', JSON.stringify(kvadr))
  }, [kvadr])

  console.log('kvadratukai', kvadr)

  // 2. Patobulinti 1 uždavinį taip, kad šalia mygtuko “Atgal” atsirastų select laukelis, kuriame būtų sudedami visi padaryti žingsniai. T.y. jeigu mygtukas “Pridėti” buvo paspaustas 3 kartus select laukelis turi turėti tris pasirinkimus “1 žingsnis”, “2 žingsnis”, “3 žingsnis” ir t.t. Istorija turi būti atstatoma iki konkretaus žingsnio.(vietoj useRef čia naudojamas useState istorijai saugoti)

  const [zingsnis, setZingsnis] = useState([kvadr])

  console.log(zingsnis)

  useEffect(() => {
    // const select = document.getElementById('select')
    // const add = document.getElementById('add')
    // add.addEventListener('click', () => {
    //   const option = document.createElement('option')
    //   select.appendChild(option)
    //   option.innerText = istorija + 1 + ' zingsnis'
    // })
  })
  // 3. Sukurti komponentą su 3 apskritimais, kurie yra rand spalvų ir mygtuką “Keisti”. Apskritimus DOMe pasižymėti naudojant useRef hooką. Paspaudus mygtuką, panaudoti vanilaJS savybę element.style.background ir pakeisti apskritimų spalvas į kitas random spalvas.

  const circle1 = useRef()
  const circle2 = useRef()
  const circle3 = useRef()

  const changeColor = () => {
    circle1.current.style.backgroundColor = randColor()
    circle2.current.style.backgroundColor = randColor()
    circle3.current.style.backgroundColor = randColor()
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>1. uzduotis</h2>
        <div className='kvc'>
          {kvadr
            ? kvadr.map((_, i) => (
                <div
                  className='kv'
                  key={i}
                  style={{ backgroundColor: randColor() }}
                >
                  {i}
                </div>
              ))
            : null}
        </div>
        <div>
          <button id='add' onClick={pridetiKvadr}>
            Prideti
          </button>
          <button onClick={isvalytiKvadr}>Isvalyti</button>
          <button onClick={undo}>Atgal</button>
        </div>
        <h2>2. uzduotis</h2>
        <select
          id='select'
          value={zingsnis}
          onChange={(e) => setZingsnis(e.target.value)}
        >
          {zingsnis
            ? zingsnis.map((_, i) => (
                <option key={i}>{addClick.current} zingsnis</option>
              ))
            : null}
        </select>
        <h2 style={{ margin: '0px', marginTop: '50px' }}>3. uzduotis</h2>
        <Circle ref1={circle1} ref2={circle2} ref3={circle3} />
        <button onClick={changeColor}>Keisti</button>
      </header>
    </div>
  )
}

export default App
