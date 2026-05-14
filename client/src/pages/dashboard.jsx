import {useState} from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/SearchBar";

// try something simple for now, just a message
export default function DashBoard(){
    
    return (
        
        <div>
            
           {/* nav bar and search bar will be together in one div */}
           <div className = "flex flex-col justify-center items-center">
            <Navbar/>
            <SearchBar/>
           </div>
           {/* sidebar and main content will be together in one div */}
           <div className = "flex">
            <Sidebar/>
            <div className = "flex-1 flex justify-center items-center">
                {/* main content will go here, such as game cards ,forms etc */}
                <h1>Where the main content will go</h1>
            </div>
           </div>
        </div>)
}