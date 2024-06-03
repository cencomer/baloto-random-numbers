import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [superNumber, setSuperNumber] = useState(null);
  const [displayedNumbers, setDisplayedNumbers] = useState([]);
  const [displayedSuperNumber, setDisplayedSuperNumber] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumbers = () => {
    setIsGenerating(true);
    const generatedNumbers = [];
    while (generatedNumbers.length < 5) {
      const randomNumber = Math.floor(Math.random() * 43) + 1;
      if (!generatedNumbers.includes(randomNumber)) {
        generatedNumbers.push(randomNumber);
      }
    }
    setNumbers(generatedNumbers);
    setSuperNumber(Math.floor(Math.random() * 16) + 1);
    setDisplayedNumbers([]);
    setDisplayedSuperNumber(null);
  };

  useEffect(() => {
    if (numbers.length > 0) {
      numbers.forEach((num, index) => {
        setTimeout(() => {
          setDisplayedNumbers(prev => [...prev, num]);
        }, 1000 * index);
      });

      setTimeout(() => {
        setDisplayedSuperNumber(superNumber);
        setIsGenerating(false); // Habilita el botón de nuevo después de mostrar todos los números
      }, 1000 * numbers.length);
    }
  }, [numbers, superNumber]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-fredoka">
      <header className="text-center py-4 px-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-yellow-200">Generador Baloto</h1>
        {displayedNumbers.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl mb-4">Números:</h2>
            <div className="flex justify-center space-x-2">
              {displayedNumbers.map((num, index) => (
                <div key={index} className="w-16 h-16 bg-yellow-400 border border-white text-gray-900 rounded-full flex items-center justify-center text-2xl shadow-md animate-appear">
                  {num}
                </div>
              ))}
              {displayedSuperNumber !== null && (
                <div className="w-16 h-16 bg-red-600 border border-white text-white rounded-full flex items-center justify-center text-2xl shadow-md animate-appear">
                  {displayedSuperNumber}
                </div>
              )}
            </div>
          </div>
        )}
        <p className="my-8">Da clic en "jugar" y encuentra tus 6 números de la suerte</p>
        <button
          onClick={generateNumbers}
          disabled={isGenerating}
          className={`px-6 py-3 rounded-full text-white text-lg font-semibold transition-all duration-300 ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-800'}`}
        >
          Jugar
        </button>
      </header>
    </div>
  );
}

export default App;
