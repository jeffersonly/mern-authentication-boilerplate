import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import useWindowDimensions from "../../utils/window-dimensions/windowDimensions";
import Lottie from 'react-lottie';
import sharingworkLottie from '../../utils/lottie/landingpage-sharingwork.json';
import typingLottie from '../../utils/lottie/landingpage-typing.json';
import chattingLottie from '../../utils/lottie/landingpage-chatting.json';
import { WaveDivider1, WaveDivider2, WaveDivider3 } from "../../utils/page-dividers/pageDividers";
import antdIcon from "../../utils/icons/antd-icon.svg";
import axiosIcon from "../../utils/icons/axios-icon.png";
import cloudinaryIcon from "../../utils/icons/cloudinary-icon.png";
import googleapisIcon from "../../utils/icons/googleapis-icon.png";
import gsapIcon from "../../utils/icons/gsap-icon.png";
import lottieIcon from "../../utils/icons/lottie-icon.svg";
import mongodbIcon from "../../utils/icons/mongodb-icon.png";
import nodeIcon from "../../utils/icons/node-icon.png";
import reactIcon from "../../utils/icons/react-icon.png";
import reduxIcon from "../../utils/icons/redux-icon.png";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
    // Size of width of window
    const { width } = useWindowDimensions();
    const [firstLottieWidth, setFirstLottieWidth] = useState("50%");
    const [remainingLottieWidths, setRemainingLottieWidths] = useState("85%");

    useEffect(() => {
        if(width <= 768) {
            setFirstLottieWidth("80%");
            setRemainingLottieWidths("100%");
        } else {
            setFirstLottieWidth("50%");
            setRemainingLottieWidths("85%");
        }
    }, [width]);

    // GSAP Animations
    useEffect(() => {
        // Section 1
        gsap.from(".landing-page-row.section1 .landing-page-text-container.text .landing-page-1-text-items h1", {
            duration: 0.75,
            x: -500,
            opacity: 0,
            ease: Power3.easeOut,
            stagger: 0.25,
            scrollTrigger: {
                trigger: ".landing-page-row.section1 .landing-page-text-container.text .landing-page-1-text-items",
                start: "top 100%",
                end: "bottom 25%",
                toggleActions: "restart reverse restart reverse"
            }
        });

        gsap.from(".landing-page-row.section1 .landing-page-text-container.image", {
            duration: 0.75,
            x: 500,
            opacity: 0,
            ease: Power3.easeOut,
            scrollTrigger: {
                trigger: ".landing-page-row.section1 .landing-page-text-container.image", 
                start: "top 100%",
                end: "bottom 25%",
                toggleActions: "restart reverse restart reverse"
            }
        });

        // Section 2
        gsap.from(".landing-page-row.section2 .landing-page-text-container.image", {
            duration: 0.75,
            left: -500,
            opacity: 0,
            ease: Power3.easeOut,
            scrollTrigger: {
                trigger: ".landing-page-row.section2 .landing-page-text-container.image", 
                start: "top 50%",
                end: "bottom 25%",
                toggleActions: "restart reverse restart reverse"
            }
        });

        gsap.from(".landing-page-row.section2 .landing-page-text-container.text .landing-page-text-alt", {
            duration: 0.75,
            x: -500,
            opacity: 0,
            ease: Power3.easeOut,
            scrollTrigger: {
                trigger: ".landing-page-row.section2 .landing-page-text-container.text .landing-page-text-alt", 
                start: "top 65%",
                end: "bottom 20%",
                toggleActions: "restart reverse restart reverse"
            }
        }); 

        gsap.from(".landing-page-row.section2 .landing-page-text-container.text ul li", {
            duration: 1,
            y: 500,
            opacity: 0,
            ease: Power3.easeOut,
            stagger: 0.25,
            scrollTrigger: {
                trigger: ".landing-page-row.section2 .landing-page-text-container.text ul li",
                start: "top 120%",
                end: "bottom 70%",
                toggleActions: "restart reverse restart reverse"
            }
        });
        

        // Section 3
        gsap.from(".landing-page-row.section3 .landing-icon", {
            duration: 1,
            y: 500,
            opacity: 0,
            ease: Power3.easeOut,
            stagger: 0.15,
            scrollTrigger: {
                trigger: ".landing-page-row.section3 .landing-icon",
                start: "top 100%",
                end: "bottom 60%",
                toggleActions: "restart reverse restart reverse"
            }
        });

        // Section 4
        gsap.from(".landing-page-row.section4 .landing-page-text-container.image", {
            duration: 0.75,
            left: -500,
            opacity: 0,
            ease: Power3.easeOut,
            scrollTrigger: {
                trigger: ".landing-page-row.section4 .landing-page-text-container.image", 
                start: "top 80%",
                end: "bottom 25%",
                toggleActions: "restart reverse restart reverse"
            }
        });

        gsap.from(".landing-page-row.section4 .landing-page-text-container.text .landing-page-text-alt.header", {
            duration: 0.75,
            x: -500,
            opacity: 0,
            ease: Power3.easeOut,
            scrollTrigger: {
                trigger: ".landing-page-row.section4 .landing-page-text-container.text .landing-page-text-alt.header", 
                start: "top 85%",
                end: "bottom 20%", 
                toggleActions: "restart reverse restart reverse"
            }
        }); 

        gsap.from(".landing-page-row.section4 .landing-page-text-container.text ul li", {
            duration: 0.75,
            x: 500,
            opacity: 0,
            ease: Power3.easeOut,
            stagger: 0.25,
            scrollTrigger: {
                trigger: ".landing-page-row.section4 .landing-page-text-container.text ul li",
                start: "top 80%",
                toggleActions: "restart reverse restart reverse"
            }
        });

        gsap.from(".landing-page-row.section4 .landing-page-text-alt.contact", {
            duration: 0.75,
            x: -500,
            opacity: 0,
            ease: Power3.easeOut,
            scrollTrigger: {
                trigger: ".landing-page-row.section4 .landing-page-text-alt.contact", 
                start: "top 90%",
                toggleActions: "restart reverse restart reverse"
            }
        }); 
    }, [])

    return (
        <>
            <Row className="landing-page-row section1">
                <Col sm={{span: 24}} md={{span: 12}} className="landing-page-text-container text">
                    <div style={{display: "block"}} className="landing-page-1-text-items">
                        <h1 className="landing-page-text">
                            MERN Auth BP
                        </h1>
                        <h1 className="landing-page-subtext">
                            Welcome! This is the MERN authentication boilerplate that I created for other developers (and for myself) to use for future projects. 
                            This website is a demo of what the boilerplate looks like and is made available for others to test the functionalities.
                        </h1>
                    </div>
                </Col>
                <Col sm={{span: 24}} md={{span: 12}} className="landing-page-text-container image">
                    <Lottie 
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: typingLottie,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }}
                        height={"auto"}
                        width={firstLottieWidth}
                    />
                </Col>
            </Row>
                
            <Row className="landing-page-row section2"> 
                <WaveDivider1/>
                <Col sm={{span: 24}} md={{span: 12}} className="landing-page-text-container image">
                    <Lottie 
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: sharingworkLottie,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }}
                        height={"auto"}
                        width={remainingLottieWidths}
                    />
                </Col> 
                <Col sm={{span: 24}} md={{span: 12}} className="landing-page-text-container text">
                    <div style={{display: "block"}}>
                        <h1 className="landing-page-text-alt">
                            Why I made this Template
                        </h1>
                        <ul>
                            <li>To practice</li>
                            <li>For general use (in future projects)</li>
                            <li>For others to use as an example (check out the source code!)</li>
                        </ul>
                    </div>
                </Col>
                <WaveDivider2/>
            </Row>

            <Row gutter={[4, 4]} className="landing-page-row section3">
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={antdIcon} alt="antd-icon" />
                    </div>
                    <h2 className="icon-text">Antd</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={axiosIcon} alt="axios-icon" />
                    </div>
                    <h2 className="icon-text">Axios</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={cloudinaryIcon} alt="cloudinary-icon" /> 
                    </div>
                    <h2 className="icon-text">Cloudinary</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={googleapisIcon} alt="googleapis-icon" /> 
                    </div>
                    <h2 className="icon-text">GoogleAPIs</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={gsapIcon} alt="gsap-icon" />
                    </div>
                    <h2 className="icon-text">GSAP</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={lottieIcon} alt="lottie-icon" /> 
                    </div>
                    <h2 className="icon-text">Lottie</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={nodeIcon} alt="node-icon" /> 
                    </div>
                    <h2 className="icon-text">Node</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={mongodbIcon} alt="mongodb-icon" /> 
                    </div>
                    <h2 className="icon-text">MongoDB</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={reactIcon} alt="react-icon" /> 
                    </div>
                    <h2 className="icon-text">React</h2>
                </Col>
                <Col sm={{span: 12}} md={{span: 6}} className="landing-icon">
                    <div className="icon-items">
                        <img src={reduxIcon} alt="redux-icon" /> 
                    </div>
                    <h2 className="icon-text">Redux</h2>
                </Col>
            </Row>

            <Row className="landing-page-row section4"> 
                <WaveDivider3/>
                <Col sm={{span: 24}} md={{span: 12}} className="landing-page-text-container image">
                    <Lottie 
                        options={{
                            loop: true,
                            autoplay: true,
                            animationData: chattingLottie,
                            rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice"
                            }
                        }}
                        height={"auto"}
                        width={remainingLottieWidths}
                    />
                </Col> 
                <Col sm={{span: 24}} md={{span: 12}} className="landing-page-text-container text">
                    <div style={{display: "block"}}>
                        <h1 className="landing-page-text-alt header">
                            Functionalities Implemented
                        </h1>
                        <ul>
                            <li>Account Registration</li>
                            <li>Login (By Email & oAuth via Google/Facebook)</li>
                            <li>Forgot Password/Reset Password</li>
                            <li>Account Activation (via email using JWT)</li>
                            <li>Account Deletion</li>
                            <li>Admin and User Panel</li>
                            <li>Admin Privileges (can delete user accounts)</li>
                        </ul>
                    </div>
                </Col>
                <h1 className="landing-page-text-alt contact">
                    If you have any questions feel free to contact me at jeffersonly98@gmail.com!
                </h1>
            </Row>
        </>
    );
};

export default LandingPage;