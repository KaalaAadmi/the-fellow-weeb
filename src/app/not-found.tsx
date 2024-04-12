import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-full min-w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className={buttonVariants({
                className: "w-2/4",
              })}
            >
              Go back home
            </Link>
            <Button
              variant={"ghost"}
              className="w-2/4"
              // className="rounded-md border border-transparent bg-gray-300 px-8 py-3 text-center font-medium text-white hover:bg-gray-700"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
