"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Palette,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Globe,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------
   TEMPLATE DATA
------------------------------------------------------------------- */

const templatesShowcase = [
  {
    id: 1,
    name: "Minimal Creator",
    cat: "Creator",
    img: "/templates/template-1.jpg",
    description: "Clean & personal",
  },
  {
    id: 2,
    name: "Bold Business",
    cat: "Business",
    img: "/templates/template-2.jpg",
    description: "Made for brands",
  },
  {
    id: 3,
    name: "Dark Premium",
    cat: "Premium",
    img: "/templates/template-3.jpg",
    description: "Elegant & powerful",
  },
  {
    id: 4,
    name: "Creative Portfolio",
    cat: "Portfolio",
    img: "/templates/template-4.jpg",
    description: "Show your work",
  },
  {
    id: 5,
    name: "Social Creator",
    cat: "Social",
    img: "/templates/template-5.jpg",
    description: "Built for creators",
  },
  {
    id: 6,
    name: "Elegant Brand",
    cat: "Brand",
    img: "/templates/template-6.jpg",
    description: "Simple & beautiful",
  },
];

/* ------------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------------- */

export default function TemplateShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = templatesShowcase.length;

  const next = () => {
    setActive((current) => (current + 1) % total);
  };

  const previous = () => {
    setActive((current) => (current - 1 + total) % total);
  };

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 4500);

    return () => clearInterval(interval);
  }, [paused, total]);

  return (
    <section className="relative overflow-hidden bg-[#cc00ff] py-10 dark:bg-zinc-950 sm:py-12 lg:py-14">

      {/* ============================================================
          BACKGROUND GLOW
      ============================================================ */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-indigo-500/10 blur-[100px]" />

      <div className="pointer-events-none absolute left-[10%] top-20 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-20 right-[10%] h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />


      {/* ============================================================
          CONTAINER
      ============================================================ */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ==========================================================
            MAIN SLIDER AREA
        =========================================================== */}

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* ========================================================
              DESKTOP GRID
          ========================================================= */}

          <div className="grid items-center gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">


            {/* ======================================================
                LEFT CONTENT
            ======================================================= */}

            <div className="relative z-20 text-center lg:text-left">

              <div className="mx-auto max-w-xl lg:mx-0">

                {/* HEADING */}

                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Your bio link,
                  <br className="sm:hidden" />
                  <span className="ml-2 sm:ml-0">
                    your vibe.
                  </span>
                </h2>


                {/* DESCRIPTION */}

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/90 sm:text-base lg:mx-0">
                  Pick a style you love. Customize everything. Launch your
                  beautiful bio link in minutes.
                </p>


                {/* ==================================================
                    ACTIVE TEMPLATE INFO
                =================================================== */}

                <div
                  key={templatesShowcase[active].id}
                  className="mx-auto mt-6 max-w-md lg:mx-0"
                >

                  {/* CATEGORY */}

                  <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                    {templatesShowcase[active].cat}
                  </div>


                  {/* TEMPLATE NAME */}

                  <h3 className="text-xl font-extrabold text-white">
                    {templatesShowcase[active].name}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className="mt-1 text-xs text-white/80">
                    {templatesShowcase[active].description}
                  </p>


                  {/* ==================================================
                      FEATURES
                  =================================================== */}

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-zinc-600 shadow-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Mobile Ready
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-zinc-600 shadow-sm">
                      <Check className="h-3 w-3 text-green-500" />
                      Fully Customizable
                    </span>

                  </div>

                </div>


                {/* ==================================================
                    CTA
                =================================================== */}

                <div className="mt-6">

                  <Link href="/templates">

                    <Button
                      size="lg"
                      className="
                        h-11 gap-2 rounded-xl
                        bg-zinc-900 px-6
                        text-xs font-bold text-white
                        shadow-lg transition-all duration-300
                        hover:-translate-y-0.5 hover:shadow-xl
                        dark:bg-white dark:text-zinc-900
                      "
                    >

                      <Palette className="h-4 w-4" />

                      Explore All Templates

                      <ArrowRight className="h-4 w-4" />

                    </Button>

                  </Link>

                </div>

              </div>

            </div>


            {/* ======================================================
                RIGHT — PHONE SLIDER
            ======================================================= */}

            <div className="relative py-8">


              {/* ====================================================
                  DESKTOP PREVIOUS
              ===================================================== */}

              <button
                type="button"
                onClick={previous}
                aria-label="Previous template"
                className="
                  absolute left-0 top-1/2 z-30 hidden
                  h-11 w-11 -translate-y-1/2
                  items-center justify-center
                  rounded-full border border-zinc-200
                  bg-white text-zinc-700 shadow-lg
                  transition-all duration-300
                  hover:scale-105 hover:border-indigo-400
                  hover:text-indigo-500
                  lg:flex
                  dark:border-white/10
                  dark:bg-zinc-900
                  dark:text-zinc-300
                "
              >
                <ArrowLeft className="h-4 w-4" />
              </button>


              {/* ====================================================
                  DESKTOP NEXT
              ===================================================== */}

              <button
                type="button"
                onClick={next}
                aria-label="Next template"
                className="
                  absolute right-0 top-1/2 z-30 hidden
                  h-11 w-11 -translate-y-1/2
                  items-center justify-center
                  rounded-full border border-zinc-200
                  bg-white text-zinc-700 shadow-lg
                  transition-all duration-300
                  hover:scale-105 hover:border-indigo-400
                  hover:text-indigo-500
                  lg:flex
                  dark:border-white/10
                  dark:bg-zinc-900
                  dark:text-zinc-300
                "
              >
                <ArrowRight className="h-4 w-4" />
              </button>


              {/* ====================================================
                  SLIDER STAGE

                  overflow-visible prevents phone shadow clipping
              ===================================================== */}

              <div className="relative flex h-[540px] w-full items-center justify-center overflow-visible sm:h-[570px]">

                {templatesShowcase.map((template, index) => {

                  const position =
                    (index - active + total) % total;

                  let style = "";

                  /* ACTIVE */

                  if (position === 0) {

                    style = `
                      z-20
                      translate-x-0
                      scale-100
                      opacity-100
                    `;

                  }

                  /* NEXT */

                  else if (position === 1) {

                    style = `
                      z-10
                      translate-x-[130px]
                      scale-[0.78]
                      opacity-35
                      blur-[1px]
                    `;

                  }

                  /* PREVIOUS */

                  else if (position === total - 1) {

                    style = `
                      z-10
                      -translate-x-[130px]
                      scale-[0.78]
                      opacity-35
                      blur-[1px]
                    `;

                  }

                  /* HIDDEN */

                  else {

                    style = `
                      z-0
                      scale-[0.65]
                      opacity-0
                      pointer-events-none
                    `;

                  }

                  return (

                    <div
                      key={template.id}
                      className={`
                        absolute
                        transition-all
                        duration-[1000ms]
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${style}
                      `}
                    >

                      <TemplatePreview
                        template={template}
                        active={position === 0}
                      />

                    </div>

                  );
                })}

              </div>


              {/* ====================================================
                  MOBILE CONTROLS
              ===================================================== */}

              <div className="mt-1 flex items-center justify-center gap-3 lg:hidden">

                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={previous}
                  aria-label="Previous template"
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    border border-zinc-200
                    bg-white
                    shadow-sm
                    transition-all duration-300
                    active:scale-95
                    dark:border-white/10
                    dark:bg-zinc-900
                  "
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>


                {/* DOTS */}

                <div className="flex items-center gap-1.5 px-2">

                  {templatesShowcase.map((_, index) => (

                    <button
                      key={index}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Go to template ${index + 1}`}
                      className={`
                        h-1.5 rounded-full
                        transition-all duration-500
                        ${
                          active === index
                            ? "w-6 bg-zinc-900 dark:bg-white"
                            : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
                        }
                      `}
                    />

                  ))}

                </div>


                {/* NEXT */}

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next template"
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    border border-zinc-200
                    bg-white
                    shadow-sm
                    transition-all duration-300
                    active:scale-95
                    dark:border-white/10
                    dark:bg-zinc-900
                  "
                >
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ------------------------------------------------------------------
   PHONE PREVIEW
------------------------------------------------------------------- */

function TemplatePreview({ template, active }) {

  return (

    <div
      className={`
        relative
        transition-all
        duration-700
        ${
          active
            ? "drop-shadow-[0_35px_60px_rgba(0,0,0,0.30)]"
            : ""
        }
      `}
    >

      {/* ============================================================
          CATEGORY LABEL
      ============================================================= */}

      <div
        className="
          absolute -left-12 top-20 z-40
          hidden -rotate-6
          rounded-full
          border border-white/30
          bg-black/60
          px-3 py-1.5
          text-[8px] font-bold
          uppercase tracking-wider
          text-white shadow-xl
          backdrop-blur-md
          sm:block
        "
      >
        {template.cat}
      </div>


      {/* ============================================================
          PHONE
      ============================================================= */}

      <div
        className="
          relative
          h-[470px] w-[240px]
          rounded-[38px]
          border-[6px] border-zinc-800
          bg-zinc-950 p-1.5
          shadow-2xl
          sm:h-[520px] sm:w-[265px]
        "
      >

        {/* ==========================================================
            PHONE NOTCH
        =========================================================== */}

        <div
          className="
            absolute left-1/2 top-2 z-50
            h-5 w-20
            -translate-x-1/2
            rounded-full
            bg-zinc-950
          "
        />


        {/* ==========================================================
            SCREEN
        =========================================================== */}

        <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-zinc-900">

          {/* ========================================================
              TEMPLATE IMAGE
          ========================================================= */}

          <img
            src={template.img}
            alt={`${template.name} mobile bio link template`}
            loading={active ? "eager" : "lazy"}
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="
              absolute inset-0
              h-full w-full
              object-cover
              transition-transform
              duration-[1400ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
            "
          />


          {/* ========================================================
              IMAGE OVERLAY
          ========================================================= */}

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />


          {/* ========================================================
              PROFILE
          ========================================================= */}

          <div className="absolute inset-x-0 top-14 z-10 text-center text-white sm:top-16">

            {/* PROFILE */}

            <div
              className="
                mx-auto flex
                h-14 w-14
                items-center justify-center
                rounded-full
                border-2 border-white/80
                bg-white/20
                text-xs font-black
                shadow-xl
                backdrop-blur-md
                sm:h-16 sm:w-16
              "
            >
              YB
            </div>


            {/* BRAND NAME */}

            <h4 className="mt-2 text-sm font-bold drop-shadow-md">
              Your Brand
            </h4>


            {/* HANDLE */}

            <p className="mt-0.5 text-[9px] text-white/80">
              @yourhandle
            </p>


            {/* ======================================================
                SOCIAL ICONS
            ======================================================= */}

            <div className="mt-3 flex items-center justify-center gap-2">

              {/* INSTAGRAM */}

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
                <Instagram className="h-3.5 w-3.5" />
              </div>


              {/* YOUTUBE */}

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
                <Youtube className="h-3.5 w-3.5" />
              </div>


              {/* FACEBOOK */}

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
                <Facebook className="h-3.5 w-3.5" />
              </div>


              {/* TWITTER */}

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md">
                <Twitter className="h-3.5 w-3.5" />
              </div>

            </div>

          </div>


          {/* ========================================================
              LINK BUTTONS
          ========================================================= */}

          <div className="absolute inset-x-4 bottom-6 z-10 space-y-2">

            {/* LINK 1 */}

            <div
              className="
                flex items-center gap-2
                rounded-xl
                border border-white/30
                bg-white/90
                px-3 py-2.5
                text-[9px] font-bold
                text-zinc-900
                shadow-xl
                backdrop-blur-md
                transition-transform duration-300
                hover:scale-[1.02]
              "
            >

              <Globe className="h-3 w-3 shrink-0" />

              <span className="flex-1 text-center">
                My latest collection
              </span>

            </div>


            {/* LINK 2 */}

            <div
              className="
                flex items-center gap-2
                rounded-xl
                border border-white/30
                bg-white/90
                px-3 py-2.5
                text-[9px] font-bold
                text-zinc-900
                shadow-xl
                backdrop-blur-md
                transition-transform duration-300
                hover:scale-[1.02]
              "
            >

              <Palette className="h-3 w-3 shrink-0" />

              <span className="flex-1 text-center">
                Free digital download
              </span>

            </div>


            {/* LINK 3 */}

            <div
              className="
                flex items-center gap-2
                rounded-xl
                border border-white/30
                bg-white/90
                px-3 py-2.5
                text-[9px] font-bold
                text-zinc-900
                shadow-xl
                backdrop-blur-md
                transition-transform duration-300
                hover:scale-[1.02]
              "
            >

              <Mail className="h-3 w-3 shrink-0" />

              <span className="flex-1 text-center">
                Book a consultation
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ============================================================
          TEMPLATE NUMBER
      ============================================================= */}

      <div className="pointer-events-none absolute -bottom-4 -right-8 text-7xl font-black tracking-tighter text-zinc-900/5 dark:text-white/5">
        {String(template.id).padStart(2, "0")}
      </div>

    </div>
  );
}