import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CogIcon } from '@heroicons/react/outline';

export default function SettingsMenu() {
  const [weatherVisible, setWeatherVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [temperatureVisible, setTemperatureVisible] = useState(false);

  useEffect(() => {
    // Load the visibility states from Chrome storage
    chrome.storage.sync.get(['weatherVisible', 'dateVisible', 'temperatureVisible'], (result) => {
      // if (result.weatherVisible !== undefined) {
      //   setWeatherVisible(result.weatherVisible);
      //   updateVisibility('weather-module', result.weatherVisible);
      // }
      if (result.dateVisible !== undefined) {
        setDateVisible(result.dateVisible);
        updateVisibility('date-module', result.dateVisible);
      }
      if (result.temperatureVisible !== undefined) {
        setTemperatureVisible(result.temperatureVisible);
        updateVisibility('temperature-module', result.temperatureVisible);
      }
    });


  }, []);

  const updateVisibility = (elementId, isVisible) => {
    const element = document.getElementById(elementId);
    if (element) {
      if (isVisible) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
  };

  const toggleVisibility = (setter, state, storageKey, elementId) => {
    const newState = !state;
    setter(newState);
    chrome.storage.sync.set({ [storageKey]: newState });
    updateVisibility(elementId, newState);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
  };

  const handleMouseLeave = () => {
    const menuButton = document.querySelector('[aria-haspopup="menu"]');
    if (menuButton) {
      menuButton.click();
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border-none shadow-none bg-transparent text-sm font-medium text-white-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <CogIcon className="h-8 w-8 text-white-600 opacity-100" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Menu.Items
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white bg-opacity-99 backdrop-blur-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        onClick={handleMenuClick}
        onMouseLeave={handleMouseLeave}
      >
        <div className="py-1">

          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 font-sans"
                onClick={(e) => {
                  e.preventDefault();
                  toggleVisibility(setDateVisible, dateVisible, 'dateVisible', 'date-module');
                }}
              >
                <div className="flex justify-between items-center">
                  <span>Show Date</span>
                  <input
                    type="checkbox"
                    checked={dateVisible}
                    onChange={() => toggleVisibility(setDateVisible, dateVisible, 'dateVisible', 'date-module')}
                    className="custom-checkbox pointer-events-none"
                  />
                </div>
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 font-sans"
                onClick={(e) => {
                  e.preventDefault();
                  toggleVisibility(setTemperatureVisible, temperatureVisible, 'temperatureVisible', 'temperature-module');
                }}
              >
                <div className="flex justify-between items-center">
                  <span>Show Temperature</span>
                  <input
                    type="checkbox"
                    checked={temperatureVisible}
                    onChange={() => toggleVisibility(setTemperatureVisible, temperatureVisible, 'temperatureVisible', 'temperature-module')}
                    className="custom-checkbox pointer-events-none"
                  />
                </div>
              </a>
            )}
          </Menu.Item>
          {/* <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 font-sans"
                onClick={(e) => {
                  e.preventDefault();
                  toggleVisibility(setWeatherVisible, weatherVisible, 'weatherVisible', 'weather-module');
                }}
              >
                <div className="flex justify-between items-center">
                  <span>Show Weather</span>
                  <input
                    type="checkbox"
                    checked={weatherVisible}
                    onChange={() => toggleVisibility(setWeatherVisible, weatherVisible, 'weatherVisible', 'weather-module')}
                    className="custom-checkbox pointer-events-none"
                  />
                </div>
              </a>
            )}
          </Menu.Item> */}
        <Menu.Item> 
        <a href="https://ko-fi.com/A0A5131I72" target="_blank">
            <div className="flex justify-center items-center">
            <img
                height="26"
                className='opacity-90'
                style={{ border: '0px', height: '36px' }}
                src="https://storage.ko-fi.com/cdn/kofi2.png?v=3"
                alt="Buy Me a Tea at ko-fi.com"
            />
            </div>
        </a>
        {/* <a href='' target='_blank'> test!
        </a> */}
        {/* <a href='https://ko-fi.com/A0A5131I72' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> */}
        </Menu.Item>

        </div>
      </Menu.Items>
    </Menu>
  );
}

// Render the component
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<SettingsMenu />);
  }
});