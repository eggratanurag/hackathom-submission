import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DropDown({page, sort, setArrange, arrangeBy}) {
   

  if (page === "fav") {
     return;
  }
  
  return (
    <Menu as="div" className="relative inline-block text-left w-28">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-3 text-sm font-semibold text-gray-400 shadow-sm ring-1 ring-inset ring-gray-400 hover:bg-gray-50">
          {arrangeBy}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>
          
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 ">
            <Menu.Item>
            
                <button
                onClick={()=> setArrange("newest")}
                  className="hover:bg-gray-100 w-full text-left text-gray-700' block px-4 py-2 text-sm"
                >
                  Newest
                </button>
             
            </Menu.Item>
            <Menu.Item>
              
                <button
                onClick={()=> setArrange("oldest")}
                  className="hover:bg-gray-100 w-full text-left text-gray-700' block px-4 py-2 text-sm"
                >
                  Oldest
                </button>
           
            </Menu.Item>
         
          
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}