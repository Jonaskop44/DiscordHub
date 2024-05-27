/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import BackgroundImage from "@/../public/images/background/hero-background-desktop.png";
import Navbar from "@/components/Navbar";
import { modeImages, heroImages } from "@/lib/constants";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bg-[#0b0d0f] flex justify-start flex-col items-center">
        <Image
          src={BackgroundImage}
          alt="hero"
          layout="fill"
          quality={100}
          draggable={false}
        />
        <div className="z-10 text-white mt-16 p-12 max-w-[87%] bg-[#0607073b] rounded-xl">
          <h1 className="mt-0 mr-auto mb-0 ml-auto text-center font-black text-5xl max-w-[700px] tracking-[-1px]">
            Let's make your System experience{" "}
            <span className="text-gradient">better.</span>
          </h1>
          <p className="mt-0 mr-auto mb-0 ml-auto text-center font-extralight pt-8 text-xl text-[#dedede] leading-none tracking-[-1px]">
            Introducing <span className="font-bold">SysMastro</span> - the most
            advanced System Manager yet.
          </p>
        </div>
        <div className="mt-4 max-w-hero-ui flex justify-center mb-60 hero-ui">
          {heroImages.map((image, index) => (
            <div key={index} className="wrap">
              <Image
                src={image.src}
                alt="test"
                className="rounded-xl max-w-[100%] align-middle"
              />
            </div>
          ))}
        </div>
        <div className="mt-4 mb-20 z-10">
          <h1 className="text-[#dedede] text-center uppercase font-extralight tracking-[9px] text-4xl">
            Three Modes
          </h1>
          <p className="mt-4 mr-auto mb-8 ml-auto text-center font-extralight text-xl leading-none text-[#dedede] font-sans">
            SysMastro is equipped with 3 modes tailored to your needs.
          </p>
          <div className="flex justify-center items-center">
            {modeImages.map((image, index) => (
              <div
                key={index}
                className="p-12 rounded-md opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out"
              >
                <Image
                  src={image.src}
                  alt="test"
                  className="max-w-[100%] max-h-[400px] scale-90 hover:scale-100 hover:opacity-100 transition-all duration-300 ease-in-out"
                />
                <p className="text-center font-normal text-2xl mt-8 mb-8 leading-none tracking-[-1px] text-[#b1b1b1]">
                  {image.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
