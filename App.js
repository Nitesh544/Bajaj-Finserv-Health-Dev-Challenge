import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: input }),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <div>
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter JSON data"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <ul>
            {selectedOptions.includes('Alphabets') && (
              <li>
                <h3>Alphabets</h3>
                <ul>
                  {response.alphabets.map((alphabet) => (
                    <li key={alphabet}>{alphabet}</li>
                  ))}
                </ul>
              </li>
            )}
            {selectedOptions.includes('Numbers') && (
              <li>
                <h3>Numbers</h3>
                <ul>
                  {response.numbers.map((number) => (
                    <li key={number}>{number}</li>
                  ))}
                </ul>
              </li>
            )}
            {selectedOptions.includes('Highest Alphabet') && (
              <li>
                <h3>Highest Alphabet</h3