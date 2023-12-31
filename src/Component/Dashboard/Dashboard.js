import { Fragment } from "react"; 
import PageContent from "../Common/PageContent/PageContent"; 
import Project from "../Project/Project";
import Experience from "../Experience/Experience";
import Education from "../Education/Education";
import Skills from "../Skills/Skills";
import About from "../About/About";
import Home from "../Home/Home";
import Footer from "../Common/Footer/Footer";
import Contact from "../Contact/Contact";
import Navbar from "../Common/Navbar/Navbar"; 

const Dashboard = () =>{
    return (
        <Fragment>
          <main> 
            <Navbar />
            <PageContent>              
            </PageContent> 
            <Home />
            <About />
            <Skills />
            <Project />
            <Experience />
            <Education />
            <Contact />
            <Footer />
            
          </main>
        </Fragment>
      );
}

export default Dashboard;