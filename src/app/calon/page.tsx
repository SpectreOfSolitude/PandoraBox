'use client';

import React, { useContext, useState, useEffect, MouseEvent } from "react";
import candidate2 from "../../../public/assets/Candidate1.jpeg";
import candidate1 from "../../../public/assets/Candidate2.jpeg";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {Router} from "next/router";

interface InputState {
  nim: string;
  choice_id: number;
}

const Form = () => {
  const APIEndpoint =  process.env.NEXT_PUBLIC_API_ENDPOINT
  const [input, setInput] = useState<InputState>({ nim: "" , choice_id: 0 });
  const router = useRouter();
  let nimParam = ""
  
  useEffect(() => {

      let params = new URLSearchParams(window.location.search);
      let nimParam = params.get('nim');
  }, [])


  const handleVote1 = async (e:MouseEvent) => {
    e.preventDefault();
    try {
      let params = new URLSearchParams(window.location.search);
      let nimParam = params.get('nim');
      console.log(nimParam)
      console.log(`${APIEndpoint}api/vote?nim=${nimParam}&choice_id=1`)
      
      const response =await fetch(`${APIEndpoint}api/vote?nim=${nimParam}&choice_id=1`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "nim": nimParam,
          "choice_id": 1,
        }),
      });

      console.log(response)
      if (response.ok) {
        console.log("ping")

        router.push("/");
      } else {
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
  }

  const handleVote2 = async (e: MouseEvent) => {
    e.preventDefault()
    try {
      let params = new URLSearchParams(window.location.search);
      let nimParam = params.get('nim');
      console.log("ping")
      console.log(`${APIEndpoint}api/vote?nim=${nimParam}&choice_id=2`)
      
      const response =await fetch(`${APIEndpoint}api/vote?nim=${nimParam}&choice_id=2`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "nim": nimParam,
          "choice_id": 2,
        }),
      });

      console.log(response)
      if (response.ok) {
        console.log("ping")

        router.push("/");
      } else {
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
  }

  return (
    <div className="bg-gradient-to-b from-red-900 via-red-500 to-red-300 min-h-screen min-w-full">
      <form className="">

        <table className="w-full">
          <tbody className="flex p-8 gap-28 g-10 justify-center">
            <tr className="flex p-8 gap-28 g-10 justify-center">
            <td>
              <div className="max-w-sm justify-center rounded overflow-hidden shadow-lg">
                <Image className="w-full" src={candidate1} width={150} height={250} alt="Foto kandidat 1" />
                <div className="">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Abudzar - Killa</div>
                    <div className="font-bold text-l mb-2">Visi</div>
                    <p className="text-black text-base">
                      Menjadikan hmk sebagai tempat tumbuh kembang bersama yang ber-atmosfer kekeluargaan dan kuat dalam hal "ASPEK": Amanah
                      Sinergis
                      Produktif
                      Efektif
                      Komunikatif
                    </p>
                    <div className="font-bold text-l my-2">Misi</div>
                    <ul className="text-black">
                      <li className="mt-2">
                        Menjadikan hmk sebagai wadah untuk menampung aspirasi mahasiswa kimia.
                      </li>
                      <li className="mt-2">
                        Menjadikan hmk sebagai sarana pengembangan minat, bakat, dan karakter mahasiswa kimia.
                      </li>
                      <li className="mt-2">
                        Meningkatkan aspek kolaboratif antara HMK dengan pihak internal maupun pihak eksternal.
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center mt-8">
                  </div>
                  <div className="flex justify-center pt-4 pb-8 mt-4">
                    <button onClick={handleVote1} className="justify-center inline-block rounded bg-neutral-800 px-12 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                      VOTE PASLON 1
                    </button>
                  </div>
                  <div className="flex justify-center mt-8">
                  </div>
                </div>
              </div>
            </td>
            <td className="">
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <Image className="w-full" src={candidate2} width={150} height={250} alt="Foto kandidat 1" />

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">Alfiyyah - Aulia</div>
                  <div className="font-bold text-l mb-2">Visi</div>
                  <p className="text-black text-base">
                    Terwujudnya HMK yang aktif, kreatif, kolaboratif, sebagai sarana untuk berkreasi dan berinovasi
                  </p>
                  <div className="font-bold text-l my-2">Misi</div>
                  <ul className="text-black">
                    <li className="mt-2">
                      Menumbuhkan eksistensi dan kolaborasi internal maupun eksternal HMK UPGRICS
                    </li>
                    Menggali potensi mahasiswa/i berdasarkan kompetensi akademik/non akademik
                    <li className="mt-2">
                      ⁠Menciptakan rasa kebersamaan, saling memiliki, dan saling menghormati antar seluruh anggota HMK
                    </li>
                    <li className="mt-2">
                      Membangun suasana kerja dengan prinsip SuSan (Serius dan Santai)
                    </li>
                    <li className="mt-2">
                      Meningkatkan Komunikasi Internal yang cepat dan efektif
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center pt-4 pb-8 mt-4">
                  <button onClick={handleVote2} className="justify-center inline-block rounded bg-neutral-800 px-12 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                    VOTE PASLON 2
                  </button>
                </div>
                <div className="flex justify-center mt-8">
                </div>
              </div>
            </td>
            </tr>
          </tbody>
        </table>


        <div className="">

        </div>
      </form>
    </div>
  );
};

export default Form;
