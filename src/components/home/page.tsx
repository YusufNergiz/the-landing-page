import Navbar from '../Navbar'
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Cta from "@/components/Cta";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Team from "@/components/Team";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Brands from "@/components/Brands";
import Footer from "@/components/Footer";
export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <About />
            <Cta />
            <Pricing />
            <Testimonials />
            <Faq />
            <Team />
            <Blog />
            <Contact />
            <Brands />
            <Footer />
        </>
    );
}
