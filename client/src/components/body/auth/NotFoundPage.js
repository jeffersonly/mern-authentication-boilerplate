import React from "react";
import Lottie from 'react-lottie';
import notFound404 from '../../utils/lottie/notfound404.json';

function NotFoundPage() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: notFound404,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    
    return (
        <div>
            <Lottie 
                options={defaultOptions}
                height={"100%"}
                width={"80%"}
            />
            <p className="text-404">Sorry, the page you were looking for does not exist or another error has occured.</p>
            <br/>
            <p className="text-404">Are you sure you're in the right place? Try navigating from our home page.</p>
        </div>
    );
};

export default NotFoundPage;
