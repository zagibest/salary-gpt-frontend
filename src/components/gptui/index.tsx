import classNames from 'classnames';
import React, { useState } from 'react';

interface Message {
  content: string;
  sender: 'user' | 'bot';
}

const ChatGPTUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleMessageSend = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { content: inputValue, sender: 'user' }]);
      // Call your ChatGPT API here and handle the response
      // For this example, let's assume the response is stored in `response`
      const response = '';
      setMessages([...messages, { content: response, sender: 'bot' }]);
      setInputValue('');
    }
  };

  return (
    <div className='flex h-screen flex-col'>
      <div className='flex-grow border p-4'>
        <div className='flex h-full flex-col'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={classNames('mb-2', {
                'text-right': message.sender === 'user',
                'text-left': message.sender === 'bot',
              })}
            >
              <span
                className={classNames('inline-block rounded-lg px-4 py-2', {
                  'bg-blue-500 text-white': message.sender === 'user',
                  'bg-gray-200': message.sender === 'bot',
                })}
              >
                {message.content}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='flex items-center border-t p-4'>
        <input
          type='text'
          className='mr-2 flex-grow rounded-lg border px-4 py-2'
          placeholder='Type your message...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleMessageSend();
            }
          }}
        />
        <button
          className='rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600'
          onClick={handleMessageSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatGPTUI;
