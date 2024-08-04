

import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import invariant from "tiny-invariant";

import { deleteEvent, getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

import Header from "../components/Header";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.eventId, "noteId not found");

  const event = await getEvent({ id: params.eventId });
  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ event });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.eventId, "eventId not found");

  await deleteEvent({ id: params.eventId, userId });

  return redirect("/events");
};

export default function EventDetailsPage() {
  const eventData = useLoaderData<typeof loader>();

  return (
    <>
    <Header />
    <div className="mt-40 h-screen w-full flex flex-col bg-slate-950">
    <div className="flex w-11/12 sm:w-4/5 md:w-2/3 lg:w-4/5 xl:w-2/3 2xl:w-1/2 flex-col mx-auto text-center bg-slate-950">
    <div className="w-full flex flex-col text-center justify-center items-center mb-10">
                <div className="flex flex-row">
                  <div><h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-slate-300 flex">
                    <Link
                      to={`/${eventData.event.id}`}
                    >
                      💿 {eventData.event.title}
                    </Link>
                  </h3>
                  </div>


                  <div>

                    <span className="text-pink-500"><AiOutlineThunderbolt /></span>

                  </div>

                </div>
                <p className="mt-4 underline underline-offset-4 decoration-dashed text-gray-400 decoration-pink-300">Author: Author Name - 2024.08.29</p>
                <div className="mt-10 flex flex-col items-center gap-x-4">
                  <img src={"/assets/image/event-priscilla-du-pree.jpg"} alt="event_id" width="600" height="400" className="rounded-md"/>
                  <p className="flex justify-start items-start px-4 md:px-3 py-6 text-slate-300">{eventData.event.body}</p>
                </div>
                <div className="px-4 flex w-full justify-end text-white underline underline-offset-2 decoration-dashed decoration-pink-200">Back to list</div>
              </div>
              
      <Form method="post" className="flex justify-center gap-6">
        <button
          type="submit"
          className="rounded bg-gradient-to-r from-cyan-400 via-blue-200 to-red-100 px-4 py-2 text-cyan-600 hover:bg-blue-600 focus:bg-blue-400"
        >
          Edit
        </button>
        <button
          type="submit"
          className="rounded bg-gradient-to-r from-cyan-400 via-blue-200 to-red-100 px-4 py-2 text-cyan-600 hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
    </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Event not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
