import React from "react";
import { BsSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Container from "../Container";
export default function NavBar() {
  return (
    <div className="bg-secondary shadow-gray-500">
      <Container className="  p-2">
        <div className="flex justify-between items-center">
          <Link to="/"><img src="./logo192.png" alt=" " className="h-10" /></Link>
          <ul className="flex items-center space-x-4">
            <li>
              <button className="bg-dark-subtle p-1 rounded ">
                <BsSunFill className="text-white" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transation text-white"
                placeholder="search.."
              />
            </li>
           <Link to="/auth/signin"    className="text-white font-semibold text-lg ">Login</Link> 
          </ul>
        </div>
      </Container>
    </div>
  );
}
