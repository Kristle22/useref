import './App.css';
import randColor from './FUNCTIONS/randColor';
import rand from './FUNCTIONS/randNumbers';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [kvadr, setKvadr] = useState([]);

  const addClick = useRef(0)

  // Sukurti aplikaciją su mygtuku “Pridėti”, kurį paspaudus atsiranda rand 5-10 kvadratukai.
  // Paspaudus dar kartą dar prisideda rand kvadratukų skaičius.

  //  Į istoriją turi būti pridedami veiksmai tiek iš “Pridėti” tiek iš “Išvalyti” mygtukų paspaudimo.

  const random = rand(5, 10);
  const pridetiKvadr = () => {
    for (let i = 0;i < random;i++) {
      setKvadr(kv => [...kv, random])
      addClick.current += 1;
      console.log(kvadr);
      localStorage.setItem('prideta', JSON.stringify(addClick.current));
    }
  }
  // Padaryti mygtuką “Išvalyti”, kurį paspaudus visi kvadratukai dingsta. 
  const isvalytiKvadr = () => {
    setKvadr(kv => kv.slice(kv.length));
  }

  // Padaryti mygtuką “Atgal”, kurį paspaudus kvadratukų skaičius pasidaro lygus skaičiui, buvusiam prieš paspaudus mygtuką “Pridėti”, o paspaudus dar kartą grįžtama dar vienu žingsniu atgal (t.y. reikia sukurti “undo” funkcionalumą). 

  const undo = () => {
    setKvadr(kv => kv.slice(0, kv.length - kv[kv.length - 1]));
  }

  // Puslapį perkrovus kvadratukų skaičius pasilieka nepakitęs.
  useEffect(() => {
    setKvadr(JSON.parse(localStorage.getItem('kvadratai') ?? '[]'));
  }, []);

  useEffect(() => {
    if (null === kvadr) {
      return;
    }
    localStorage.setItem('kvadratai', JSON.stringify(kvadr));
  }, [kvadr]);
  console.log(kvadr.length);

  // Puslapiui persikrovus istorija yra užmirštama. Saugoma tik istorija iki puslapiui persikraunant.

  const [values, setValues] = useState([]);

  useEffect(() => {
    setValues(localStorage.removeItem('kvadratai')
    );
  }, [values])

  return (
    <div className="App">
      <header className="App-header">
        <div className='kvc'>{kvadr ? kvadr.map((_, i) => <div className='kv' key={i} style={{ backgroundColor: randColor() }}>{i}</div>) : null}
        </div>
        <button onClick={pridetiKvadr}>Prideti</button>
        <button onClick={isvalytiKvadr}>Isvalyti</button>
        <button onClick={undo}>Atgal</button>
      </header>
    </div>
  );
}

export default App;
