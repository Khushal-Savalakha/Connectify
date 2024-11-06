import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";

export default function Home() {
    return (
        <div className="app__body">
            <Sidebar />
            <Feed />
            <Widget />
        </div>
    );
}
