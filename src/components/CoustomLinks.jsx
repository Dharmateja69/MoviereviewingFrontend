import React from "react";
import { Link } from "react-router-dom";

export default function CoustomLinks({ to, children }) {
  return (
    <Link to={to} className="text-dark-subtle hover:text-white transition ">
      {children}
    </Link>
  );
}
