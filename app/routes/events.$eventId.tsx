import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteEvent, getEvent } from "~/models/event.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.eventId, "noteId not found");

  const event = await getEvent({ id: params.eventId, userId });
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
    <div className="w-11/12 sm:w-2/3 md:w-1/2">
      <h3 className="text-2xl font-bold text-slate-300">{eventData.event.title}</h3>
      <p className="py-6 text-slate-300">{eventData.event.body}</p>
      <hr className="my-4" />
      <Form method="post" className="flex justify-end">
        <button
          type="submit"
          className="rounded bg-gradient-to-r from-cyan-400 via-blue-200 to-red-100 px-4 py-2 text-cyan-600 hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
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
