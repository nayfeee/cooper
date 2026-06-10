"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const phone = "07715 535619";
const tel = "tel:07715535619";
const whatsapp = "https://wa.me/447715535619";

const galleryImages = Array.from(
  { length: 15 },
  (_, i) => `/images/gallery/gallery${i + 1}.png`
);

const featuredImages = Array.from(
  { length: 6 },
  (_, i) => `/images/featured-project/featured-project${i + 1}.png`
);

const reviews = [
  {
    name: "Nicky Lewis",
    quote:
      "Absolutely thrilled with our new bathroom. Harry came up with a great idea and it exceeded our expectations.",
  },
  {
    name: "Alexis N Daniela Jepson",
    quote:
      "My new shower room looks amazing and feels so luxurious. True professionals, hardworking, punctual and respectful of my home.",
  },
  {
    name: "Bethany Morris",
    quote:
      "A full bathroom renovation finished to such a high standard. It turned out better than I could imagine.",
  },
  {
    name: "Mandy Gillett",
    quote:
      "This is the third bathroom Harry and Paul have done for us. Clean, tidy workers and all finished to perfection.",
  },
  {
    name: "Gilly Ann Bean",
    quote:
      "Amazing from start to finish. Excellent communication, great advice and the house was left tidy after each day.",
  },
];

const processSteps = [
  {
    title: "Consult",
    text: "A proper conversation about how the room needs to work, how it should feel and what the finished space needs to achieve.",
  },
  {
    title: "Design",
    text: "Layout, fittings, finishes, storage and practical details planned together so the room works beautifully every day.",
  },
  {
    title: "Install",
    text: "Plumbing, tiling, electrics, ventilation, cabinetry and finishing handled with care by a trusted family-run team.",
  },
  {
    title: "Finish",
    text: "A clean, considered bathroom with the details, durability and finish expected from a premium renovation.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(
  value: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number
) {
  const progress = clamp((value - inputStart) / (inputEnd - inputStart), 0, 1);
  return outputStart + (outputEnd - outputStart) * progress;
}

function MobilePaperStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const designRef = useRef<HTMLElement | null>(null);
  const installRef = useRef<HTMLElement | null>(null);
  const finishRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frameId: number | null = null;

    const updateStack = () => {
      frameId = null;
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight || 800;
      const travel = Math.max(1, sectionHeight - viewportHeight);
      const progress = clamp((window.scrollY - sectionTop) / travel, 0, 1);

      const designY = mapRange(progress, 0.02, 0.28, 100, 0);
      const installY = mapRange(progress, 0.34, 0.60, 100, 0);
      const finishY = mapRange(progress, 0.66, 0.92, 100, 0);

      if (designRef.current) designRef.current.style.transform = `translate3d(0, ${designY}%, 0)`;
      if (installRef.current) installRef.current.style.transform = `translate3d(0, ${installY}%, 0)`;
      if (finishRef.current) finishRef.current.style.transform = `translate3d(0, ${finishY}%, 0)`;
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateStack);
    };

    updateStack();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section className="mobilePaperMotionStack" aria-label="The Cooper Way" ref={sectionRef}>
      <div className="mobilePaperMotionStage">
        <div className="sectionLabel">The Cooper Way</div>
        <div className="mobilePaperMotionCards">
          <section className="mobilePaperMotionCard" style={{ transform: "translate3d(0, 0%, 0)", zIndex: 1 }}>
            <h2>{processSteps[0].title}</h2>
            <p>{processSteps[0].text}</p>
          </section>
          <section ref={designRef} className="mobilePaperMotionCard" style={{ transform: "translate3d(0, 100%, 0)", zIndex: 2 }}>
            <h2>{processSteps[1].title}</h2>
            <p>{processSteps[1].text}</p>
          </section>
          <section ref={installRef} className="mobilePaperMotionCard" style={{ transform: "translate3d(0, 100%, 0)", zIndex: 3 }}>
            <h2>{processSteps[2].title}</h2>
            <p>{processSteps[2].text}</p>
          </section>
          <section ref={finishRef} className="mobilePaperMotionCard" style={{ transform: "translate3d(0, 100%, 0)", zIndex: 4 }}>
            <h2>{processSteps[3].title}</h2>
            <p>{processSteps[3].text}</p>
          </section>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
    Desktop timing:
    0.00 - 0.34: image sits full-screen, title fades in and holds
    0.34 - 0.44: title fades out in place
    0.44 - 0.64: image slowly shrinks/docks left while brief rises
    0.64 - 0.78: docked image and brief hold as a full-screen composition
    0.76 - 0.84: image/brief clear, project gallery takes over
    0.84 - 1.00: gallery holds longer as the final full-screen moment
  */
  const imageWidth = useTransform(scrollYProgress, [0, 0.44, 0.64, 0.76, 0.84], ["100vw", "100vw", "48vw", "48vw", "48vw"]);
  const imageHeight = useTransform(scrollYProgress, [0, 0.44, 0.64, 0.76, 0.84], ["100vh", "100vh", "78vh", "78vh", "78vh"]);
  const imageX = useTransform(scrollYProgress, [0, 0.44, 0.64, 0.76, 0.84], ["0vw", "0vw", "-24vw", "-24vw", "-78vw"]);
  const imageY = useTransform(scrollYProgress, [0, 0.44, 0.64, 0.76, 0.84], ["0vh", "0vh", "4vh", "4vh", "4vh"]);
  const imageRadius = useTransform(scrollYProgress, [0.44, 0.64], ["0px", "3px"]);
  const imageOpacity = useTransform(scrollYProgress, [0.76, 0.84], [1, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.18, 0.34, 0.44], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.18], [36, 0]);

  const briefOpacity = useTransform(scrollYProgress, [0.52, 0.66, 0.76, 0.84], [0, 1, 1, 0]);
  const briefY = useTransform(scrollYProgress, [0.52, 0.66], [130, 0]);

  const galleryOpacity = useTransform(scrollYProgress, [0.76, 0.83], [0, 1]);
  const galleryY = useTransform(scrollYProgress, [0.76, 0.84], [120, 0]);

  const mobileImageX = useTransform(scrollYProgress, [0.16, 0.38], ["0%", "-105%"]);
  const mobileTitleOpacity = useTransform(scrollYProgress, [0.05, 0.18, 0.31, 0.4], [0, 1, 1, 0]);
  const mobileBriefOpacity = useTransform(scrollYProgress, [0.34, 0.48, 0.62, 0.72], [0, 1, 1, 0]);
  const mobileBriefY = useTransform(scrollYProgress, [0.34, 0.48, 0.62, 0.72], [60, 0, 0, -60]);
  const mobileGalleryOpacity = useTransform(scrollYProgress, [0.68, 0.78, 0.94], [0, 1, 1]);
  const mobileGalleryY = useTransform(scrollYProgress, [0.68, 0.78], [70, 0]);

  return (
    <section className="featuredProject" id="featured" ref={sectionRef}>
      <div className="featuredDesktopStage" aria-hidden="true">
        <motion.div className="featuredImageDock" style={{ width: imageWidth, height: imageHeight, x: imageX, y: imageY, borderRadius: imageRadius, opacity: imageOpacity }}>
          <Image src={featuredImages[0]} alt="Checkerboard bathroom renovation in Darwen" fill priority className="featuredMainImage" />
          <div className="featuredImageShade" />
        </motion.div>

        <motion.div className="featuredTitleBlock" style={{ opacity: titleOpacity, y: titleY }}>
          <span>Featured Project</span>
          <h2>Darwen Residence</h2>
          <p>Checkerboard floors, bespoke storage and a bathroom built around real everyday living.</p>
        </motion.div>

        <motion.div className="featuredBriefLayer" style={{ opacity: briefOpacity, y: briefY }}>
          <article className="featuredBriefCard">
            <span>The Brief</span>
            <h3>Luxury that still works hard.</h3>
            <p>
              Tom and Shana wanted a bathroom that felt more spacious without compromising practicality. A larger shower, integrated laundry area and premium finish all had to work together in one carefully planned room.
            </p>
            <p>
              Cooper Plumbing & Heating created a bespoke shower area with a Roca black stone tray, dual shower setup, integrated niches, enhanced ventilation, metro tiling, recessed spotlights and custom cabinetry topped with a countertop basin.
            </p>
          </article>
        </motion.div>

        <motion.div className="featuredGalleryReveal" style={{ opacity: galleryOpacity, y: galleryY }}>
          <div className="featuredGrid">
            {featuredImages.slice(1).map((src, index) => (
              <div className={`featuredGridItem featuredGridItem${index + 1}`} key={src}>
                <Image src={src} alt={`Darwen bathroom renovation detail ${index + 1}`} fill />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="featuredMobileStage">
        <motion.div className="featuredMobileImage" style={{ x: mobileImageX }}>
          <Image src={featuredImages[0]} alt="Checkerboard bathroom renovation in Darwen" fill className="featuredMainImage" />
          <div className="featuredImageShade" />
          <motion.div className="featuredMobileTitle" style={{ opacity: mobileTitleOpacity }}>
            <span>Featured Project</span>
            <h2>Darwen Residence</h2>
          </motion.div>
        </motion.div>

        <motion.article className="featuredMobileBrief" style={{ opacity: mobileBriefOpacity, y: mobileBriefY }}>
          <span>The Brief</span>
          <h3>Luxury that still works hard.</h3>
          <p>
            Tom and Shana wanted a bathroom that felt more spacious without compromising practicality. A larger shower, integrated laundry area and premium finish all had to work together in one carefully planned room.
          </p>
          <p>
            Cooper Plumbing & Heating created a bespoke shower area with a Roca black stone tray, dual shower setup, integrated niches, enhanced ventilation, metro tiling, recessed spotlights and custom cabinetry topped with a countertop basin.
          </p>
        </motion.article>

        <motion.div className="featuredMobileGallery" style={{ opacity: mobileGalleryOpacity, y: mobileGalleryY }}>
          <div className="featuredMobileGrid">
            {featuredImages.slice(1).map((src, index) => (
              <div className={`featuredMobileGridItem featuredMobileGridItem${index + 1}`} key={src}>
                <Image src={src} alt={`Darwen bathroom renovation mobile detail ${index + 1}`} fill />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLElement | null>(null);
  const processRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const suppressMobileCtaUntilRef = useRef(0);

  const [activeReview, setActiveReview] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [mobileHeaderCompact, setMobileHeaderCompact] = useState(false);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 720);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  useEffect(() => {
    const updateMobileCta = () => {
      const contact = contactRef.current;
      const isSmall = window.innerWidth <= 720;

      if (Date.now() < suppressMobileCtaUntilRef.current) {
        setShowMobileCta(false);
        return;
      }

      if (!contact || !isSmall) {
        setShowMobileCta(false);
        return;
      }

      const contactTop = contact.getBoundingClientRect().top;
      setMobileHeaderCompact(window.scrollY > 70);
      setShowMobileCta(window.scrollY > 90 && contactTop > window.innerHeight * 0.72);
    };

    updateMobileCta();
    window.addEventListener("scroll", updateMobileCta, { passive: true });
    window.addEventListener("resize", updateMobileCta);
    return () => {
      window.removeEventListener("scroll", updateMobileCta);
      window.removeEventListener("resize", updateMobileCta);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const targets: Record<string, HTMLElement | HTMLDivElement | null> = {
      featured: document.getElementById("featured"),
      reviews: reviewsRef.current,
      process: processRef.current,
      gallery: galleryRef.current,
      contact: contactRef.current,
    };

    const target = targets[id] ?? document.getElementById(id);
    if (!target) return;

    const isSmallScreen = window.innerWidth <= 720;
    const offset = isSmallScreen ? 100 : 24;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

    if (isSmallScreen) {
      suppressMobileCtaUntilRef.current = Date.now() + 1400;
      setShowMobileCta(false);
    }

    window.scrollTo({ top, behavior: "smooth" });
  };

  const headerColor = useTransform(heroProgress, [0, 0.72, 0.86], ["#ffffff", "#ffffff", "#211d1b"]);
  const headerBg = useTransform(heroProgress, [0, 0.55, 0.86], ["rgba(247, 245, 241, 0.045)", "rgba(247, 245, 241, 0.12)", "rgba(247, 245, 241, 0.68)"]);
  const mobileHeaderBg = useTransform(heroProgress, [0, 0.55, 0.86], ["rgba(247, 245, 241, 0.025)", "rgba(247, 245, 241, 0.06)", "rgba(247, 245, 241, 0.14)"]);
  const ctaBg = useTransform(heroProgress, [0, 0.86], ["rgba(255, 255, 255, 0.2)", "rgba(33, 29, 27, 0.08)"]);
  const logoWidth = useTransform(heroProgress, [0, 0.28], ["285px", "168px"]);
  const mobileLogoWidth = useTransform(heroProgress, [0, 0.22], ["210px", "148px"]);

  const currentReview = reviews[activeReview];

  return (
    <main>
      <motion.header className="siteHeader" style={{ background: isMobile ? mobileHeaderBg : headerBg, color: headerColor }}>
        <nav className="desktopNav" aria-label="Main navigation">
          <div className="navSide navLeft">
            <a href="#featured" onClick={(event) => { event.preventDefault(); scrollToSection("featured"); }}>Featured</a>
            <a href="#reviews" onClick={(event) => { event.preventDefault(); scrollToSection("reviews"); }}>Reviews</a>
            <a href="#process" onClick={(event) => { event.preventDefault(); scrollToSection("process"); }}>Process</a>
          </div>

          <motion.a href="#top" className="brandMark brandLogoLink" aria-label="Cooper Plumbing & Heating home" style={{ width: logoWidth }}>
            <span className="brandLogoMask" aria-hidden="true" />
          </motion.a>

          <div className="navSide navRight">
            <a href="#gallery" onClick={(event) => { event.preventDefault(); scrollToSection("gallery"); }}>Gallery</a>
            <a href="#contact" onClick={(event) => { event.preventDefault(); scrollToSection("contact"); }}>Contact</a>
            <motion.a href={tel} className="navCta" style={{ background: ctaBg }}>Call {phone}</motion.a>
          </div>
        </nav>

        <nav className="mobileNav" aria-label="Mobile navigation">
          <motion.div className="mobileNavLinks" initial={false} animate={isMobile && mobileHeaderCompact ? { opacity: 0, y: -14, height: 0 } : { opacity: 1, y: 0, height: "auto" }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
            <button type="button" onPointerDown={(event) => { event.preventDefault(); scrollToSection("featured"); }}>Featured</button>
            <button type="button" onPointerDown={(event) => { event.preventDefault(); scrollToSection("gallery"); }}>Gallery</button>
            <button type="button" onPointerDown={(event) => { event.preventDefault(); scrollToSection("reviews"); }}>Reviews</button>
            <a href={tel}>Call</a>
          </motion.div>

          <motion.a href="#top" className="mobileBrand brandLogoLink" aria-label="Cooper Plumbing & Heating home" style={{ width: mobileLogoWidth }}>
            <span className="brandLogoMask" aria-hidden="true" />
          </motion.a>
        </nav>
      </motion.header>

      <AnimatePresence>
        {showMobileCta && (
          <motion.a href={tel} className="mobileBottomCta" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
            Start Your Bathroom Project
            <span aria-hidden="true">→</span>
          </motion.a>
        )}
      </AnimatePresence>

      <section className="hero heroClean" id="top" ref={heroRef}>
        <video className="heroVideo" autoPlay muted loop playsInline preload="auto">
          <source src="/videos/mobile-hero.mp4" media="(max-width: 720px)" type="video/mp4" />
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </section>

      <section className="intro introStatement">
        <p className="introEyebrow">Blackburn & surrounding towns</p>
        <h1>Trusted bathroom fitters in Blackburn & Lancashire</h1>
        <p>
          A trusted family-run team specialising in full bathroom renovations, plumbing and heating — combining quality workmanship with personal service from first idea to final finish.
        </p>
      </section>

      <FeaturedProject />

      <section className="reviews" id="reviews" ref={reviewsRef}>
        <div className="reviewTopline">
          <span>Reputation</span>
          <span>50+ five-star reviews</span>
        </div>
        <h2>Bathrooms that feel even better than they look.</h2>
        <div className="reviewStage">
          <AnimatePresence mode="wait">
            <motion.blockquote key={activeReview} initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -24, filter: "blur(8px)" }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
              “{currentReview.quote}”
              <footer>{currentReview.name}</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </section>

      <div id="process" ref={processRef}>
        <section className="paperStack desktopPaperStack">
          <div className="sectionLabel">The Cooper Way</div>
          <div className="stackInner">
            {processSteps.map((step, index) => (
              <section key={step.title} className="paperStep" style={{ zIndex: index + 1 }}>
                <h2>{step.title}</h2>
                <p>{step.text}</p>
              </section>
            ))}
          </div>
        </section>
        <MobilePaperStack />
      </div>

      <section className="immersiveGallery" id="gallery" ref={galleryRef}>
        <div className="galleryIntro">
          <div className="sectionLabel">Selected Work</div>
          <h2>Every finish, fixture and detail has a job to do.</h2>
        </div>
        <div className="galleryMosaic">
          {galleryImages.map((src, index) => (
            <motion.figure
              className={`mosaicItem mosaicItem${(index % 8) + 1}`}
              key={src}
              initial={{ opacity: 0, y: 70, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration: 0.95,
                delay: (index % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image src={src} alt={`Cooper Plumbing & Heating bathroom project ${index + 1}`} fill sizes="(max-width: 720px) 92vw, 34vw" />
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="contact" id="contact" ref={contactRef}>
        <p>Ready to transform your bathroom?</p>
        <h2>Start with a conversation<span className="conversationDots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span><span className="srOnly">...</span></h2>
        <div className="contactLinks">
          <a href={tel}>{phone}</a>
          <a href={whatsapp}>WhatsApp</a>
          <a href="https://www.facebook.com/CooperPlumbingHeating" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </section>
    </main>
  );
}
