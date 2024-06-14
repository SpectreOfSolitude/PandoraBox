import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import hmiklogo from "../../../public/assets/hima.png";
import Image from "next/image";

interface InputState {
  nim: string;
}

const [input, setInput] = useState<InputState>({ nim: "" });

const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  // Your submit logic here
  console.log("Submitted nim:", input.nim);
};

const handleChange = (e: ChangeEvent <HTMLInputElement>) => {
  const { name, value } = e.target;
  setInput((prevData) => ({
    ...prevData,
    [name]: value,
  }));
}

const home = () => {
  return (
    <>

      <div className="card">
        <div className="flex justify-center items-center">
      <Image src={hmiklogo} width={300} height={300} alt="Logo HMIK" />

        </div>
        <form
        onSubmit={handleSubmit}
          method="POST"
          className="content-card-container"
        >
          <h3 className="align-center justify-center text-center">nim</h3>
          <div className="align-center justify-center items-center text-center text-black">
          <input
            onChange={handleChange}
            value={input.nim}
            type="string"
            placeholder="NIM"
            name="nim"
            required
            className="inputForm text-black"
          />

          <button className="submitBtn" type="submit">
            SUBMIT NIM
          </button>
          </div>
        </form>
      </div>

      {/* <button><a href='/result'>LIHAT HASIL VOTING</a></button> */}
    </>
  );
};

export default home;
