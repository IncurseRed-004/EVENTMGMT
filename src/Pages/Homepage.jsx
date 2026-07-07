import React from "react";
import Banner from "../Components/Banner";
import Eventpage from "./Eventpage";
import Banner2 from "../Components/Banner2";

function Home(){
    return(
        <>
        <div>
            <Banner />
            <Eventpage />
            <Banner2 />
        </div>
        </>
    )
}
export default Home;