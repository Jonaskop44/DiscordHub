import Image from "next/image";
import FlyGuy from "/gif/FlyGuy.gif";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="bg-white min-h-full flex flex-col lg:relative">
      <div className="flex-grow flex flex-col h-screen">
        <main className="flex-grow flex flex-col bg-white">
          <div className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 pt-10 sm:pt-16">
              <Link href="/" className="inline-flex">
                <span className="sr-only">DiscordHub</span>
                <Image
                  className="h-12 w-auto"
                  src="/images/logo.png"
                  width={48}
                  height={48}
                  alt=""
                />
              </Link>
            </div>
            <div className="flex-shrink-0 my-auto py-16 sm:py-32">
              <p className="text-sm font-semibold text-[#0544b5] uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-base font-bold text-[#0544b5] hover:text-[#0070e0]"
                >
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="absolute inset-0 h-screen w-full object-cover"
          src="/images/404.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Custom404;
