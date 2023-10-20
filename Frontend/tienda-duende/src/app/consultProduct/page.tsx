import Link from "next/link";
import React from "react";

const ConsultProduct = () => {
  return (
    <div>
      <header className="">
        <header className="bg-green-200 py-5 mb-3"></header>
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-amber-800 text-3xl">TIENDA DUENDE</h1>
        </div>
        <nav
          className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4"
          data-te-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div
              className="!visible mt-2 hidden flex-grow basis-[100%] items-center justify-center lg:mt-0 lg:!flex lg:basis-auto"
              id="navbarSupportedContent8"
              data-te-collapse-item
            >
              <ul
                className="list-style-none flex flex-col pl-0 lg:mt-1 lg:flex-row"
                data-te-navbar-nav-ref
              >
                <li
                  className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <a className="text-white" href="#">
                    Home
                  </a>
                </li>
                <li
                  class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <a class="text-white" href="#" data-te-nav-link-ref>
                    Link
                  </a>
                </li>

                <li
                  class="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-link-ref
                >
                  <a class="text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400">
                    Disabled
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="text-black">ConsultProduct</div>
    </div>
  );
};

export default ConsultProduct;
