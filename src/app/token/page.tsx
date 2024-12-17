'use client';

import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import hmklogo from "../../../public/assets/hima.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface InputState {
  token: string;
}

const Home = () => {
  const APIEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
  const [input, setInput] = useState<InputState>({ token: "" });
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted token:", input.token);
    console.log(APIEndpoint)

    try {
      console.log("ping")
      console.log(`${APIEndpoint}api/getToken?token=${input.token}`)

      const response = await fetch(`${APIEndpoint}api/checktoken`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "token": input.token,
        }),
      });

      console.log(response)
      if (response.ok) {
        
        console.log("ping")
        console.log(response)

        const data = await response.json(); // Tarik data dari response
        const nim = data.nim;
        const params = new URLSearchParams({ nim });

        router.push(`/calon?${params.toString()}`);

        // router.push("/calon");
      } else {
        console.error('Response indicates failure.');
        // Handle failed response condition as needed
      }

      if (!response.ok) {
        console.log("ping")
        throw new Error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Fetch error:', error);
      // Handle fetch error as needed
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  }

  return (
    <>
      <div 
        className="min-h-screen min-w-full flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('/assets/bg2.jpg')`, // Path gambar
          backgroundSize: '100% 100%',  // Lebar dan tinggi gambar disesuaikan dengan lebar dan tinggi elemen pembungkus
          backgroundPosition: 'center', // Posisi gambar
          backgroundRepeat: 'no-repeat', // Tidak mengulang gambar
          width: '100%',  // Lebar elemen pembungkus
          height: '100%', // Menetapkan tinggi sesuai dengan viewport
        }}
      >

        <div className="flex justify-center items-center p-10">
          <Image src={hmklogo} width={300} height={300} alt="Logo HMIK" />
        </div>

        <form
          onSubmit={handleSubmit}
          method="POST"
          className="content-card-container"
        >
          <h2 className="text-black font-sans font-bold text-xl text-center pb-4">Periksa Email Mahasiswa Anda</h2>
          <div className="flex align-center justify-center items-center text-center">
            <div className="align-center justify-center items-center text-center relative w-72 min-w-[200px] h-10">
              <input
                onChange={handleChange}
                value={input.token}
                type="text"
                name="token"
                required
                className="peer w-full h-full bg-transparent text-black font-sans font-normal outline outline-0 
              focus:outline-0 disabled:bg-black disabled:border-0 transition-all placeholder-shown:border 
              placeholder-shown:border-black placeholder-shown:border-t-black border focus:border-2 border-t-transparent 
              focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-black focus:border-black"

                placeholder=" "
              />
              <label
                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal 
              !overflow-visible truncate leading-tight peer-focus:leading-tight peer-disabled:text-transparent 
              peer-disabled:peer-placeholder-shown:text-black transition-all -top-1.5 
              peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] 
              before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 
              peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t 
              peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none 
              before:transition-all peer-disabled:before:border-transparent after:content[' '] 
              after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] 
              after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t 
              peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none 
              after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] 
              text-black peer-focus:text-gray-900 peer-focus:before:!border-black
              peer-focus:after:!border-gray-900">
                Masukkan Token
              </label>

              <button className="bg-black mt-5 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded" type="submit">
                SUBMIT TOKEN
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <button><a href='/result'>LIHAT HASIL VOTING</a></button> */}
    </>
  );
};

export default Home;
