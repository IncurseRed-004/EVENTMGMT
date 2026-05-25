import React from "react";
import Banner from "../Components/Banner";
import Eventpage from "./Eventpage";
import Banner2 from "../Components/Banner2";

function Home({events}){
    return(
        <>
        <div>
            <Banner />
            <Eventpage events={events} />
            <Banner2 />
        </div>
        </>
    )
}
export default Home;