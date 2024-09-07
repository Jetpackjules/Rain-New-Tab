import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React from 'react';
import { createRoot } from 'react-dom/client';

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Options
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm`}
              >
                Account settings
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm`}
              >
                Support
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <a
                href="#"
                className={`${
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                } block px-4 py-2 text-sm`}
              >
                License
              </a>
            )}
          </MenuItem>
          <form method="POST" action="#">
            <MenuItem>
              {({ active }) => (
                <button
                  type="submit"
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full text-left px-4 py-2 text-sm`}
                >
                  Sign out
                </button>
              )}
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}

// Render the component
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<Example />);
  }
});