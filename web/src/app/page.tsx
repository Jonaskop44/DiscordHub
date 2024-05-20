/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import BackgroundImage from "@/../public/images/background/hero-background-desktop.png";

const Home = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={BackgroundImage}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
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
    </div>
  );
};

export default Home;
