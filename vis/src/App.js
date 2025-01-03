import logo from './logo.svg';
import './App.css';

import text1818 from './texts/frankenstein1818.txt';
import text1831 from './texts/frankenstein1831.txt';
import { useEffect, useState } from 'react';
import { diffWords } from 'diff';

const App = () => {

  let [frankenstein1818, setFrankenstein1818] = useState("");
  let [frankenstein1831, setFrankenstein1831] = useState("");

  useEffect(() => {

    fetch(text1818).then(res => res.text()).then(text => setFrankenstein1818(text));
    fetch(text1831).then(res => res.text()).then(text => setFrankenstein1831(text));

  }, [])

  useEffect(() => {

    if (frankenstein1818 !== "" && frankenstein1831 !== "") {

      const diff = diffWords(frankenstein1818, frankenstein1831);
      const display = document.getElementById('display'),
            fragment = document.createDocumentFragment();
      let diffStr = "";

      diff.forEach((part, index) => {
        const color = part.added ? 'green' :
          part.removed ? 'red' : 'grey';
        let span = document.createElement('span');
        span.style.color = color;
        span.appendChild(document
          .createTextNode(part.value));
        fragment.appendChild(span);
        /*
        if (part.added || part.removed) {
          diffStr += `${index}, ${part.added ? "ADDED" : "REMOVED"}, \"${
            part.value.replaceAll("\"", "&quot;").replaceAll("\n", "<br>")
              .replaceAll("\t", "&emsp;").replaceAll(",", "&comma;")
          }\", ${part.count}\n`
        }
          */
      })
      display.appendChild(fragment);
      
    }

  }, [frankenstein1818, frankenstein1831])

  return (
    <div className="App">
      <pre id="display"></pre>
    </div>
  );
}

export default App;
