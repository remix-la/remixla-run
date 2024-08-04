import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { AiOutlineThunderbolt } from "react-icons/ai";

import { getEventAllListItems } from "~/models/event.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";


import Header from "../components/Header";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  //const eventListItems = await getEventListItems({ userId });
  const eventListItems = await getEventAllListItems();
  return json({ eventListItems });
};

export default function EventsPage() {
  const data = useLoaderData<typeof loader>();
  const myValue = useOutletContext();
  console.log('data', data.eventListItems.length);
  console.log('outlet', myValue);
  const user = useUser();

  return (
    <div className="h-full w-full flex flex-col bg-slate-950">
      <Header />

      <main className="mt-52 h-full w-full flex flex-col px-2 bg-slate-950 mx-auto">
        {/* <div id="eventlist" className="w-full sm:w-2/3 md:w-3/5 flex flex-col"> */}
        <div className="flex w-11/12 sm:w-4/5 md:w-2/3 lg:w-4/5 xl:w-2/3 2xl:w-1/2 flex-col mx-auto text-center bg-slate-950">

          {data.eventListItems.map((event) => (
            <>
              {/* <div key={event.id} className="flex w-full flex-col mx-10 py-2 justify-center text-white gap-y-2"> */}
              <div className="w-full flex flex-col text-center justify-center items-center mb-10">
                <div className="flex flex-row">
                  <div><h3 className="text-2xl font-bold text-slate-300 flex">
                    <Link
                      to={`/event/${event.id}`}
                    >
                      💿 &nbsp;{event.title}
                    </Link>
                  </h3>
                  </div>


                  <div>

                    <span className="text-pink-500"><AiOutlineThunderbolt /></span>

                  </div>

                </div>
                <p className="mt-4 underline underline-offset-4 decoration-dashed text-gray-400 decoration-pink-300">Author Name - 2024.08.29</p>
                <div className="grid grid-cols-1 lg:grid-cols-3 mt-10">
                <div className="col-span-1 flex justify-center">
                  <img src={"/assets/image/event-priscilla-du-pree.jpg"} alt="event_id" width="300" height="200" />
                </div>
                <div className="col-span-2">
                <p className="flex justify-start items-start px-4 md:px-3 py-6 text-slate-300">{event.body.slice(0, 350)} ...</p>
                </div>
                </div>
                <div className="pr-10 flex w-full justify-end text-pink-200 text-md italic">
                  <Link to={`/event/${event.id}`}>read more...</Link>
                </div>
              </div>

            </>
          ))}
        </div>

        <div className="w-full px-5 flex flex-col mt-10 h-screen bg-slate-950">
          <div className="mt-10 w-full flex justify-center text-center py-5">
            {/* <Outlet /> */}
            <Outlet context={myValue} />
          </div>
        </div>
      </main>
    </div>
  );
}
