import { Fragment, useState } from "react";
import AnimatedText from "@/src/components/AnimatedText";
import AboutPopup from "@/src/components/popup/AboutPopup";
import Image from 'next/image'

const aboutData = {
  lastName: "Thunder!",
  bithday: "01.07.1990",
  address: "Avon str. 22, NYC, USA",
  phn: "+77 022 155 02 02",
  email: "example@gmail.com",
  serviceLists: [
    "Website Development",
    "Digital Experience",
    "Content Marketing",
    "Social Media Design",
    "Shared Web Hosting",
  ],
  skills: {
    programming: [
      { name: "WordPress", value: "95" },
      { name: "JavaScript", value: "80" },
      { name: "Angular", value: "90" },
    ],
    language: [
      { name: "English", value: "95" },
      { name: "Russian", value: "80" },
      { name: "Arabic", value: "90" },
    ],
  },
  education: [
    { year: "2014 - 2016", unv: "Oxford Univercity", degree: "Master Degree" },
    { year: "2010 - 2014", unv: "Texas Univercity", degree: "Bachelor Degree" },
    { year: "2008 - 2010", unv: "Simone College", degree: "Associate Degree" },
  ],
  working: [
    {
      year: "2018 - running",
      company: "Envato Elements",
      deg: "Exclusive Author",
    },
    { year: "2015 - 2018", company: "Avo Corporation", deg: "Content Manager" },
    { year: "2012 - 2015", company: "FC Barcelona", deg: "Football Player" },
  ],
  partnersLogos: [
    "img/partners/1.png",
    "img/partners/2.png",
    "img/partners/3.png",
    "img/partners/4.png",
  ],
};

const MarketPlace = () => {
  const [popup, setPopup] = useState(false);
  return (
    <Fragment >
        <div className="flex md:flex-row" >
            <div className="flex-[0.5] md:flex-[0.5]">
                <h1 className="h1-text-responsive">MarketPlace</h1>
                <p className="descri-text">Welcome, pick a username before anyone else, acquire gears and devices <br className="hidden xl:block"/>early and get ready to play!
                </p>
            </div>
            <div className="flex-[0.4] md:flex-[0.4] pt-12 ">
               
            </div>
        </div>
    </Fragment>
  );
};
export default MarketPlace;
