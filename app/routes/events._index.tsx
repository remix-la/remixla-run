import { Link } from "@remix-run/react";

export default function EventIndexPage() {
  return (
    <div className="mt-5 flex w-full justify-center bg-slate-950">
    <div className="mt-5 flex w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 justify-end bg-slate-950">
    <p>
      <Link to="new" className="text-gray-300 underline text-sm">
        create a new event.
      </Link>
    </p>
    </div>
    </div>
  );
}
