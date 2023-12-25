import Footer from "../Common/Footer";
import About from "../Common/About";

import Banner from './Banner';
import ServiceFAQ from './ServiceFAQ';
import Analitics from './Analitics';
import OurTeam from './OurTeam';

export default function AboutUs() {
  return (
    <>
      <Banner/>
      <About/>
      <ServiceFAQ/>
      <Analitics/>
      <OurTeam/>
      <Footer/>
    </>
  )
}
