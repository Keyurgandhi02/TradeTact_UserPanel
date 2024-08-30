import React from "react";
import { Link } from "react-router-dom";

function MobileMenuItem({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    >
      {label}
    </Link>
  );
}

export default MobileMenuItem;
