import { useState, useEffect, useCallback } from 'react';
import { Transition } from '@headlessui/react';

import { useResizeDetector } from 'react-resize-detector';

// Im assuming we are gonna need router links in the Nav bar, if we dont remove this
import { Link } from "react-router-dom";

const NavTest = () => {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    // keep track of window resizing
    const { width, height, ref } = useResizeDetector();

    // toggles mobile nav off when sm size reached
    if (width > 640) {
        if (showMobileNav) {
            setShowMobileNav(false);
        }
    }

    return (
<nav className="bg-white shadow">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-12">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button type="button" className="inline-flex items-center justify-center p-2 m-0 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-transparent border-0" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setShowMobileNav(!showMobileNav)}>
          <span className="sr-only">Open main menu</span>

          <svg className={`h-6 w-6 ${showMobileNav ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>

          <svg className={`${showMobileNav ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
        <div className="flex-shrink-0 flex items-center">
          <h1 className="font-bold"><Link to="">BU Nexus</Link></h1>
        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-bold hover:underline" aria-current="page">Planner</a>
            <a href="#" className="text-gray-600 hover:text-black hover:underline px-3 py-2 rounded-md text-sm font-medium">Reviews</a>
          </div>
        </div>
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div class="relative">
          <div>
            <button type="button" class="bg-transparent border-0 text-sm rounded-full focus:outline-none p-0" id="user-menu" aria-expanded="false" aria-haspopup="true" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </button>
          </div>

          <Transition
            show={showUserDropdown}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {(ref) => (
                <div ref={ref} class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                <Link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
                <Link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                </div>
            )}
          </Transition>
        </div>
      </div>
    </div>
  </div>

  <div className={`${showMobileNav ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1">
      <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Planner</a>

      <a href="#" className="text-gray-800 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Reviews</a>
    </div>
  </div>
</nav>
    )
}

export default NavTest;
