import Banner from "../Static/Component/Dashboard/Banner";
import About from "../Static/Component/Common/About";
import Service from "../Static/Component/Dashboard/Service";
import Activities from "../Static/Component/Dashboard/Activities";
import ClientFeedback from "../Static/Component/Dashboard/Client";
import Footer from "../Static/Component/Common/Footer";

import '../Static/css/slick.css'
import '../Static/css/typography.css'
import '../Static/css/style.css'
import '../Static/css/color.css'
import '../Static/css/responsive.css'
// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  return (
    <>
      <Banner />
      <About/>
      <Service/>
      <Activities/>
      <ClientFeedback/>
      <Footer/>
    </>
  );
};

export default DashboardDefault;
