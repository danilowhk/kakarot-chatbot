import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react';

const Home: NextPage = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (event : any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (e : any) => {
      e.preventDefault();
      // const message = e.target.elements.message.value;
      console.log("Message", message);
      fetch('/api/ask/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({message})
      })
      .then(res => res.json())
      .then(data => {

          setResponse(data.message);
      })
  }


  const questions : string[] = [    " Hey Goku, can you tell me about Kakarot, the zkEVM written in Cairo?",    "What is a ZkEvm?",    "Is Kakarot a blockchain, or what is it?",    " When can we expect to see Kakarot on mainnet?",    "Is Starkware behind the Kakarot project?",    "What is your favorite food?",       "What are your most memorable battles?",    "What is your relationship with Vegeta like?",   "What is the Dragon Ball world like?",];

  const QuestionButton = ({ question }: { question: string }) => (
    <div className="col-span-1">
      <button className="bg-gray-300 rounded-lg p-2" onClick={() => setMessage(question)}>
        {question}
      </button>
    </div>
  );

  return (
<div className="mt-20 container mx-auto px-6 py-10 bg-gray-200 rounded-lg shadow-md bg-gray-200 bg-center bg-cover bg-no-repeat bg-opacity-[90%]">
<div
  className="bg-gray-100 rounded-lg shadow-md bg-gray-200 bg-center bg-cover bg-no-repeat h-[100%]"
  style={{
    backgroundImage: `url('/images/goku3.png')`,
    minHeight: '100vh',
    height: '100vh',
    opacity: '0.5',
    display: 'block',
    content: ' ',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '-1'
  }}
></div>
   <div className="flex flex-col items-center mb-10">
   <h1 className="text-4xl font-bold text-gray-800">Kakarot Chatbot</h1>

    <Image
      src="/images/goku.png"
      alt="Son Goku's avatar"
      width={96}
      height={96}
      className="w-48 h-48 rounded-full my-8"
    />
    <p className="text-gray-700 text-4xl mt-8 font-bold sm:px-10 px-5 text-center">Ask Son Goku anything:</p>
  </div>
  <div className="grid grid-cols-3 gap-4 text-gray-700 sm:px-10 px-5">
    {questions.map((question) => (
      <QuestionButton key={question} question={question} />
    ))}
  </div>
  <form onSubmit={handleSubmit} className="w-full mt-10  border-black sm:px-10 px-5">
    <div className="flex items-center border-b border-b-2 border-red-500 py-5 w-full">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Type your question here"
        value={message}
        onChange={handleChange}
      />
      <button
        className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="submit"
      >
        Ask
      </button>
    </div>
  </form>
  {response ? (
    <div className="mt-4 text-gray-700 w-full">
      <p className="font-bold text-xl">Goku:</p>
      <p className="text-lg">{response}</p>
    </div>
  ) : (
    <></>
  )}
</div>
  );
}

export default Home

