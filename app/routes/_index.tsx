import type { MetaFunction } from "@remix-run/node";

import { useOptionalUser } from "~/utils";


import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";


export const meta: MetaFunction = () => [{ title: "Remix Sample - Box " }];



export default function Index() {
  const user = useOptionalUser();
  console.log('user', user);

  return (
    <>
      <header className="header left-0 top-0 py-6 z-40 flex w-full items-center absolute bg-transparent">
        <div className="container mx-2 md:mx-auto">
          <div className="relative mx-2 flex items-center justify-end">
            <ul className="flex gap-8">
              <li className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-blue-300 to-teal-400 text-lg font-bold">🌴 About Remix LA</li>
              <li className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-blue-200 to-red-300 text-lg font-bold">🌴 Contact</li>
            </ul>
          </div>
        </div>
      </header>
      <main className="flex flex-col relative sm:items-center sm:justify-center">
        <div className="box__container w-full h-[100vh]">
          <BackgroundGradientAnimation>

            <div className="absolute z-50 flex flex-col inset-0 items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
              <div className="absolute w-full z-60 flex text-white top-40 sm:top-1/4 justify-center">
                  <img src={"/assets/image/remix-trans.png"} alt="Remix logo" width="300" height="150" className="opacity-80" />
              </div>
              <div className="absolute w-full z-60 flex text-2xl text-[#3c328f] top-40 sm:top-1/4 justify-center mt-24 opacity-70">
                  Los Angeles
              </div>
              <div className="mt-6 sm:mt-20 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col md:flex-row justify-center gap-4 absolute px-3">
                <div className="bg-slate-900 w-full text-sm rounded-md opacity-55 px-4 py-5">
                  <h3 className="text-2xl">Event</h3>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore nisi.
                </div>
                <div className="bg-slate-900 w-full text-sm rounded-md opacity-55 px-4 py-5">
                  <h3 className="text-2xl">Blog</h3>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ua. Ut enim ad minim veniam.
                </div>
              </div>
              <div className="absolute text-white top-2/3">
                <img src={"/assets/image/discord-logo-black.png"} alt="discord logo" width="180" height="40" />
              </div>
              <div className="absolute text-black text-2xl top-2/3 mt-8">
                <img src={"/assets/image/meetup_logo.png"} alt="meetuplogo" width="150" height="30" />
              </div>
            </div>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
              <div className="flex w-full justify-center gap-4 mt-64">
              </div>
              <div>
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                </p>
              </div>
            </div>
          </BackgroundGradientAnimation>
        </div>
      </main>
      <footer className="w-full footer mx-auto text-center top-full h-30 bg-slate-900 p-6 text-base-content">
        <div className="w-full h-full opacity-50"><p className="text-slate-100">Copyright © 2024 Remix Los Angeles</p></div>
      </footer>
    </>
  );
}
