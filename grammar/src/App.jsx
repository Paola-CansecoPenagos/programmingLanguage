import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './App.css';

// Importa la función evaluarCodigo
import { evaluarCodigo } from './component/index';

function App() {
  const [code, setCode] = useState('// Escribe tu código aquí\n');
  const [evalResult, setEvalResult] = useState('');

  function handleEditorChange(value, event) {
    setCode(value);
  }


  function handleEvaluate() {
    const resultado = evaluarCodigo(code);
    setEvalResult(resultado);
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', height: '70vh', width: '80vw' }}>
        <Editor
          defaultValue={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
          }}
        />
        <button onClick={handleEvaluate}>Evaluar Código</button>
        <div className="resultados">
          {evalResult.success ? (
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <br />
              <strong>Resultado:</strong> {JSON.stringify(evalResult.resultado)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <br />
              <strong>Error:</strong> {evalResult.error}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
