import Navbar from '../Navbar'
import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import About from "@/app/components/About";
import Cta from "@/app/components/Cta";
import Pricing from "@/app/components/Pricing";
import Testimonials from "@/app/components/Testimonials";
import Faq from "@/app/components/Faq";
import Team from "@/app/components/Team";
import Blog from "@/app/components/Blog";
import Contact from "@/app/components/Contact";
import Brands from "@/app/components/Brands";
import Footer from "@/app/components/Footer";
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
