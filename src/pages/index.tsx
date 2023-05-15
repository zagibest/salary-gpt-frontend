import { useRequest } from 'ahooks';
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

  const sendAPI = useRequest(sendPromt, {
    manual: true,
    onSuccess: (data) => {
      const n = [...conversation, data.predictedSalary];
      setConversation(n);
    },
  });

  const [conversation, setConversation] = React.useState<string[]>([]);
  return (
    <Layout>
      <main className='h-screen'>
        <div className='flex min-h-screen bg-[#444654]'>
          <div className=' flex h-screen w-[300px] flex-col bg-[#202123] p-4 text-white'>
            <h1 className='text-xl font-semibold'>SalaryGPT</h1>
          </div>
          <div className='relative flex w-full flex-col'>
            <div className='flex h-[80vh] flex-col overflow-y-auto px-4'>
              {conversation.map((item: string, index: number) => (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
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

              {sendAPI.loading && (
                <div className='w-48 animate-pulse rounded-md bg-[#56596b] px-4 py-5' />
              )}
            </div>
            <form
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSubmit={(e: any) => {
                e.preventDefault();
                const newCon = [...conversation, e.target.promt.value];
                setConversation(newCon);
                sendAPI.run(e.target.promt.value);
              }}
            >
              <div className='absolute bottom-0 right-0 w-full bg-[#2d3036] px-4 py-10'>
                <input
                  className=' relative w-full rounded-md bg-[#40414f] px-4 py-3 text-white'
                  name='promt'
                />
                <button
                  className='absolute right-6 top-10 p-3'
                  type='submit'
                  disabled={sendAPI.loading}
                >
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
