import React from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import MobileMenuItem from "./MobileMenuItem";

const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  sections,
  logout,
  navigation,
  classes,
}) => (
  // <Dialog
  //   open={mobileMenuOpen}
  //   onClose={() => setMobileMenuOpen(false)}
  //   className="lg:hidden"
  // >
  //   <div className="fixed inset-0 z-10" />
  //   <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
  //     <div className="flex items-center justify-between">
  //       <Link to="/" className="-m-1.5 p-1.5">
  //         <img
  //           alt="Pro Trader"
  //           src="https://firebasestorage.googleapis.com/v0/b/smk24-6f0bf.appspot.com/o/App%20Logo%20Inspiraton%20138.svg?alt=media&token=e1fbc45f-5fc8-4809-9843-d31e3ebb1ad0"
  //           className="h-9 w-auto"
  //         />
  //       </Link>
  //       <button
  //         type="button"
  //         onClick={() => setMobileMenuOpen(false)}
  //         className="-m-2.5 rounded-md p-2.5 text-gray-700"
  //       >
  //         <span className="sr-only">Close menu</span>
  //         <XMarkIcon aria-hidden="true" className="h-6 w-6" />
  //       </button>
  //     </div>
  //     <div className="mt-10 flow-root">
  //       <div className="-my-4">
  //         <MobileMenuItem to="/" label="Dashboard" />
  //         {sections.map((section) => (
  //           <div className="space-y-2" key={section.label}>
  //             <Disclosure as="div" className="-mx-3">
  //               <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
  //                 {section.label}
  //                 <ChevronDownIcon
  //                   aria-hidden="true"
  //                   className="h-5 w-5 flex-none group-data-[open]:rotate-180"
  //                 />
  //               </DisclosureButton>
  //               <DisclosurePanel className="mt-2 space-y-2">
  //                 {section.items?.map((item) => (
  //                   <DisclosureButton
  //                     key={item.name}
  //                     as="a"
  //                     href={item.href}
  //                     className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
  //                   >
  //                     {item.name}
  //                   </DisclosureButton>
  //                 ))}
  //               </DisclosurePanel>
  //             </Disclosure>
  //           </div>
  //         ))}

  //         <MobileMenuItem to="/news" label="News" />
  //         <MobileMenuItem to="/calendar" label="Calendar" />
  //         <MobileMenuItem to="/profile" label="Profile" />
  //         <MobileMenuItem label="Log out" onClick={logout} />
  //       </div>
  //     </div>
  //   </DialogPanel>
  // </Dialog>

  <DisclosurePanel className="sm:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2 ">
      {navigation.map((item) => (
        <DisclosureButton
          key={item.name}
          as="a"
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={classes(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
        >
          {item.name}
        </DisclosureButton>
      ))}
    </div>
  </DisclosurePanel>
);

export default MobileMenu;
