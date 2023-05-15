import axios from 'axios';
import * as React from 'react';
import { TbSend } from 'react-icons/tb';

import Layout from '@/components/layout/Layout';

export default function HomePage() {
  const sendPromt = async (promt: string) => {
    // use axios to send promt to backend
    const res = await axios.post('https://salary-gpt-back.vercel.app/predict', {
      promt,
    });
    return res.data;
  };
  const [conversation, setConversation] = React.useState<string[]>([]);
  return (
    <Layout>
      <main className='h-screen'>
        <div className='flex min-h-screen bg-[#444654]'>
          <div className=' flex h-screen w-[300px] flex-col bg-[#202123] p-4 text-white'>
            SalaryGPT
          </div>
          <div className='relative flex w-full flex-col'>
            <div className='flex h-[80vh] flex-col overflow-y-auto px-4'>
              {conversation.map((item: string, index: number) => (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  } flex`}
                >
                  <div
                    className={`${
                      index % 2 === 0 ? 'bg-[#2d3036]' : 'bg-[#56596b]'
                    } my-2 rounded-md px-4 py-3 text-white`}
                  >
                    {item}
                  </div>
                </div>
              ))}
            </div>
            <form
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSubmit={(e: any) => {
                e.preventDefault();
                const newCon = [...conversation, e.target.promt.value];
                setConversation(newCon);
                sendPromt(e.target.promt.value).then((res) => {
                  const n = [...newCon, res.predictedSalary];
                  setConversation(n);
                });
              }}
            >
              <div className='absolute bottom-0 right-0 w-full bg-[#2d3036] px-4 py-10'>
                <input
                  className=' relative w-full rounded-md bg-[#40414f] px-4 py-3 text-white'
                  name='promt'
                />
                <button className='absolute right-6 top-10 p-3' type='submit'>
                  <TbSend size={24} className='text-[#d9d9e3]' />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
