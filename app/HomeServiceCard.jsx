"use client";

import React from "react";
import {
  Store,
  Calendar,
  Mail,
  Coffee,
  Music,
  BarChart3,
  ArrowUpRight,
  Check,
  Play,
  Users,
  MousePointer2,
  Download,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: Store,
    title: "Sell Digital Products & PDFs",
    description:
      "Sell templates, ebooks, presets, code packs and digital downloads with instant checkout.",
    badge: "0% Fees",
    type: "product",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    number: "02",
    icon: Calendar,
    title: "1:1 Consultation & Bookings",
    description:
      "Let your audience book paid 30-minute calls with Google Meet or Jitsi integration.",
    badge: "Calendar Sync",
    type: "calendar",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    number: "03",
    icon: Mail,
    title: "Lead Capture & Newsletters",
    description:
      "Collect email subscribers and send newsletters directly to your audience.",
    badge: "Email Engine",
    type: "email",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    number: "04",
    icon: Coffee,
    title: "Tip Jar & Support",
    description:
      "Accept simple $3, $5, $10 or custom tips from people who love your work.",
    badge: "Donations",
    type: "tip",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
  {
    number: "05",
    icon: Music,
    title: "Media & Audio Players",
    description:
      "Showcase YouTube videos, Spotify tracks, podcasts and other rich media.",
    badge: "Rich Media",
    type: "media",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    number: "06",
    icon: BarChart3,
    title: "Real-Time Audience Analytics",
    description:
      "Track visitors, clicks, CTR, referrers, devices and page performance.",
    badge: "Live Analytics",
    type: "analytics",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
];

/* =====================================================
   PRODUCT GRAPHIC
===================================================== */

function ProductGraphic() {
  return (
    <div className="graphic product-graphic">
      <div className="product-window">
        <div className="product-preview">
          <div className="preview-lines">
            <span />
            <span />
            <span />
          </div>

          <Download size={20} strokeWidth={2.2} />
        </div>

        <div className="product-info">
          <div>
            <div className="product-name">Digital Pack</div>
            <div className="product-price">$19</div>
          </div>

          <button className="buy-button">BUY</button>
        </div>

        <div className="purchase-success">
          <Check size={12} strokeWidth={3} />
          Purchased
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   CALENDAR GRAPHIC
===================================================== */

function CalendarGraphic() {
  const dates = [12, 13, 14, 15, 16];

  return (
    <div className="graphic calendar-graphic">
      <div className="calendar-window">
        <div className="calendar-header">
          <div>
            <span className="calendar-month">September</span>
            <span className="calendar-year">2026</span>
          </div>

          <Calendar size={17} />
        </div>

        <div className="calendar-dates">
          {dates.map((date, index) => (
            <div
              key={date}
              className="calendar-date"
              style={{
                "--date-index": index,
              }}
            >
              {date}
            </div>
          ))}
        </div>

        <button className="calendar-book">
          Book a Call
          <ArrowUpRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* =====================================================
   EMAIL GRAPHIC
===================================================== */

function EmailGraphic() {
  return (
    <div className="graphic email-graphic">
      <div className="email-window">
        <div className="email-top">
          <div className="email-icon">
            <Mail size={16} />
          </div>

          <div>
            <div className="email-title">Join Newsletter</div>
            <div className="email-subtitle">Get the latest updates</div>
          </div>
        </div>

        <div className="email-input">your@email.com</div>

        <button className="email-button">Subscribe</button>

        <div className="email-success">
          <Check size={11} />
          Subscribed
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   TIP GRAPHIC
===================================================== */

function TipGraphic() {
  return (
    <div className="graphic tip-graphic">
      <div className="tip-window">
        <div className="tip-top">
          <div className="coffee-circle">
            <Coffee size={18} />
          </div>

          <div>
            <div className="tip-title">Support my work</div>
            <div className="tip-subtitle">Leave a little tip</div>
          </div>
        </div>

        <div className="tip-options">
          <span>$3</span>
          <span className="tip-active">$5</span>
          <span>$10</span>
        </div>

        <button className="tip-button">Send Support</button>
      </div>
    </div>
  );
}

/* =====================================================
   MEDIA GRAPHIC
===================================================== */

function MediaGraphic() {
  return (
    <div className="graphic media-graphic">
      <div className="media-window">
        <div className="media-cover">
          <div className="media-play">
            <Play size={15} fill="currentColor" />
          </div>
        </div>

        <div className="media-details">
          <div>
            <div className="media-title">Latest Episode</div>
            <div className="media-subtitle">Podcast • 24:18</div>
          </div>

          <Music size={15} />
        </div>

        <div className="media-progress">
          <span />
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   ANALYTICS GRAPHIC
===================================================== */

function AnalyticsGraphic() {
  const bars = [35, 58, 45, 76, 53, 88, 68, 94, 62, 82];

  return (
    <div className="graphic analytics-graphic">
      <div className="analytics-window">
        <div className="analytics-top">
          <div>
            <div className="analytics-label">Visitors</div>
            <div className="analytics-number">24.8K</div>
          </div>

          <div className="live-pill">
            <span />
            LIVE
          </div>
        </div>

        <div className="chart">
          {bars.map((height, index) => (
            <span
              key={index}
              style={{
                height: `${height}%`,
                animationDelay: `${index * 0.08}s`,
              }}
            />
          ))}
        </div>

        <div className="analytics-stats">
          <div>
            <Users size={11} />
            <span>8.2K</span>
          </div>

          <div>
            <MousePointer2 size={11} />
            <span>3.6K</span>
          </div>

          <strong>+18.4%</strong>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   GRAPHIC SWITCH
===================================================== */

function ServiceGraphic({ type }) {
  switch (type) {
    case "product":
      return <ProductGraphic />;

    case "calendar":
      return <CalendarGraphic />;

    case "email":
      return <EmailGraphic />;

    case "tip":
      return <TipGraphic />;

    case "media":
      return <MediaGraphic />;

    case "analytics":
      return <AnalyticsGraphic />;

    default:
      return null;
  }
}

/* =====================================================
   MAIN
===================================================== */

export default function FeatureGrid() {
  return (
    <div className="relative overflow-hidden ">

      <div className="">

        {/* HEADER */}
                           <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
               
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                        Create, monetize, and own your audience
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                        Everything you need to turn your social media followers into paying clients, subscribers, and community members.
                    </p>
                </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 pb-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="feature-card group relative min-h-[245px] overflow-hidden rounded-[24px] border border-zinc-200/70 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-white/10 dark:bg-zinc-950"
              >
                {/* Subtle glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl transition-all duration-700 ease-out group-hover:scale-150" />

                {/* Number */}
                <div className="absolute right-5 top-4 text-[9px] font-black tracking-widest text-zinc-200 dark:text-zinc-800">
                  {feature.number}
                </div>

                <div className="relative flex h-full items-start justify-between gap-3">

                  {/* CONTENT */}
                  <div className="flex min-w-0 flex-1 flex-col">

                    {/* Icon */}
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${feature.iconBg} ${feature.iconColor} shadow-sm transition-all duration-500 ease-out group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <Icon size={18} strokeWidth={2.3} />
                    </div>

                    {/* Badge */}
                    <div className="mb-2 w-fit rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-[7px] font-bold uppercase tracking-wider text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
                      {feature.badge}
                    </div>

                    {/* Title */}
                    <h3 className="max-w-[185px] text-[17px] font-black leading-[1.15] tracking-tight text-zinc-900 dark:text-white">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 max-w-[200px] text-[11px] leading-5 text-zinc-500 dark:text-zinc-400">
                      {feature.description}
                    </p>

                    {/* Link */}
                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-1 text-[8px] font-bold text-zinc-900 transition-all duration-500 ease-out group-hover:gap-2 dark:text-white">
                        Explore feature
                        <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </div>

                  {/* GRAPHIC */}
                  <div className="feature-card-graphic flex w-[190px] shrink-0 items-center justify-center pt-8">
                    <ServiceGraphic type={feature.type} />
                  </div>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out group-hover:w-2/3" />
              </article>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        /* =================================================
           BASE
        ================================================= */

        .gradient-text {
          background: linear-gradient(
            90deg,
            #f97316,
            #8b5cf6,
            #ec4899
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .graphic {
          width: 190px;
          flex-shrink: 0;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* =================================================
           PRODUCT
        ================================================= */

        .product-window {
          position: relative;
          width: 175px;
          padding: 10px;
          border: 1px solid #e4e4e7;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
          transform: rotate(2deg);
          animation: productFloat 4.2s ease-in-out infinite;
          will-change: transform;
        }

        .feature-card:hover .product-window {
          animation-play-state: paused;
          transform: rotate(0deg) translateY(-4px) scale(1.02);
        }

        .product-preview {
          position: relative;
          display: flex;
          height: 80px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #fb923c,
            #f97316,
            #ea580c
          );
          color: white;
        }

        .preview-lines {
          position: absolute;
          left: 12px;
          top: 12px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          opacity: 0.7;
        }

        .preview-lines span {
          display: block;
          width: 42px;
          height: 4px;
          border-radius: 999px;
          background: white;
        }

        .preview-lines span:nth-child(2) {
          width: 30px;
        }

        .preview-lines span:nth-child(3) {
          width: 36px;
        }

        .product-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 9px 2px 2px;
        }

        .product-name {
          font-size: 10px;
          font-weight: 800;
          color: #18181b;
        }

        .product-price {
          margin-top: 2px;
          font-size: 9px;
          font-weight: 700;
          color: #71717a;
        }

        .buy-button {
          border: 0;
          border-radius: 9px;
          padding: 7px 12px;
          background: #18181b;
          color: white;
          font-size: 8px;
          font-weight: 900;
          cursor: pointer;
          animation: buyPress 3.8s ease-in-out infinite;
          will-change: transform;
        }

        .purchase-success {
          position: absolute;
          right: 8px;
          top: 8px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 8px;
          border-radius: 999px;
          background: #16a34a;
          color: white;
          font-size: 7px;
          font-weight: 800;
          opacity: 0;
          animation: purchaseDone 3.8s ease-in-out infinite;
        }

        /* =================================================
           CALENDAR
        ================================================= */

        .calendar-window {
          width: 178px;
          padding: 12px;
          border: 1px solid #e4e4e7;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
          transform: rotate(-2deg);
          animation: calendarFloat 4.5s ease-in-out infinite;
          will-change: transform;
        }

        .feature-card:hover .calendar-window {
          animation-play-state: paused;
          transform: rotate(0deg) translateY(-4px) scale(1.02);
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #3b82f6;
        }

        .calendar-month {
          display: block;
          font-size: 11px;
          font-weight: 900;
          color: #18181b;
        }

        .calendar-year {
          display: block;
          margin-top: 1px;
          font-size: 7px;
          color: #a1a1aa;
        }

        .calendar-dates {
          position: relative;
          display: flex;
          gap: 5px;
          margin-top: 12px;
        }

        .calendar-date {
          position: relative;
          z-index: 2;
          display: flex;
          height: 24px;
          width: 24px;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #f4f4f5;
          color: #71717a;
          font-size: 7px;
          font-weight: 800;
          animation: dateSelect 5s ease-in-out infinite;
          animation-delay: calc(var(--date-index) * 0.75s);
          will-change: transform, background-color, color;
        }

        /*
          Each date gets a short "selected" moment.
          The stagger makes the selection visually travel
          from 12 -> 13 -> 14 -> 15 -> 16.
        */

        .calendar-date:nth-child(1) {
          --active-color: #3b82f6;
        }

        .calendar-date:nth-child(2) {
          --active-color: #3b82f6;
        }

        .calendar-date:nth-child(3) {
          --active-color: #3b82f6;
        }

        .calendar-date:nth-child(4) {
          --active-color: #3b82f6;
        }

        .calendar-date:nth-child(5) {
          --active-color: #3b82f6;
        }

        .calendar-book {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-top: 11px;
          border: 0;
          border-radius: 9px;
          padding: 7px;
          background: #eff6ff;
          color: #2563eb;
          font-size: 8px;
          font-weight: 900;
          animation: calendarButton 5s ease-in-out infinite;
        }

        /* =================================================
           EMAIL
        ================================================= */

        .email-window {
          width: 178px;
          padding: 12px;
          border: 1px solid #e4e4e7;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
          animation: emailFloat 4.3s ease-in-out infinite;
          will-change: transform;
        }

        .email-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .email-icon {
          display: flex;
          height: 31px;
          width: 31px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #f5f3ff;
          color: #7c3aed;
        }

        .email-title {
          font-size: 10px;
          font-weight: 900;
          color: #18181b;
        }

        .email-subtitle {
          margin-top: 2px;
          font-size: 7px;
          color: #a1a1aa;
        }

        .email-input {
          margin-top: 11px;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          padding: 7px 8px;
          color: #a1a1aa;
          font-size: 7px;
          animation: typing 3.8s ease-in-out infinite;
        }

        .email-button {
          width: 100%;
          margin-top: 7px;
          border: 0;
          border-radius: 8px;
          padding: 7px;
          background: #7c3aed;
          color: white;
          font-size: 8px;
          font-weight: 900;
          animation: emailButton 3.8s ease-in-out infinite;
        }

        .email-success {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-top: 7px;
          color: #16a34a;
          font-size: 7px;
          font-weight: 800;
          animation: successFade 3.8s ease-in-out infinite;
        }

        /* =================================================
           TIP
        ================================================= */

        .tip-window {
          width: 178px;
          padding: 12px;
          border: 1px solid #e4e4e7;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
          animation: tipFloat 4.4s ease-in-out infinite;
          will-change: transform;
        }

        .tip-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .coffee-circle {
          display: flex;
          height: 34px;
          width: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #fffbeb;
          color: #d97706;
          animation: coffeeBounce 3.8s ease-in-out infinite;
        }

        .tip-title {
          font-size: 10px;
          font-weight: 900;
          color: #18181b;
        }

        .tip-subtitle {
          margin-top: 2px;
          font-size: 7px;
          color: #a1a1aa;
        }

        .tip-options {
          display: flex;
          gap: 6px;
          margin-top: 12px;
        }

        .tip-options span {
          flex: 1;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          padding: 6px 3px;
          text-align: center;
          color: #71717a;
          font-size: 8px;
          font-weight: 800;
          animation: tipSelect 3.8s ease-in-out infinite;
        }

        .tip-options span:nth-child(1) {
          animation-delay: 0s;
        }

        .tip-options span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .tip-options span:nth-child(3) {
          animation-delay: 0.3s;
        }

        .tip-options .tip-active {
          border-color: #f59e0b;
          background: #fffbeb;
          color: #d97706;
        }

        .tip-button {
          width: 100%;
          margin-top: 9px;
          border: 0;
          border-radius: 9px;
          padding: 7px;
          background: #f59e0b;
          color: white;
          font-size: 8px;
          font-weight: 900;
        }

        /* =================================================
           MEDIA
        ================================================= */

        .media-window {
          width: 178px;
          padding: 9px;
          border: 1px solid #e4e4e7;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
          animation: mediaFloat 4.6s ease-in-out infinite;
          will-change: transform;
        }

        .media-cover {
          position: relative;
          display: flex;
          height: 82px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #ec4899,
            #8b5cf6,
            #6366f1
          );
        }

        .media-play {
          display: flex;
          height: 35px;
          width: 35px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: white;
          color: #7c3aed;
          animation: playPulse 3s ease-in-out infinite;
        }

        .media-details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 2px 4px;
          color: #7c3aed;
        }

        .media-title {
          font-size: 9px;
          font-weight: 900;
          color: #18181b;
        }

        .media-subtitle {
          margin-top: 2px;
          font-size: 7px;
          color: #a1a1aa;
        }

        .media-progress {
          height: 3px;
          overflow: hidden;
          border-radius: 999px;
          background: #f4f4f5;
        }

        .media-progress span {
          display: block;
          width: 38%;
          height: 100%;
          border-radius: inherit;
          background: #8b5cf6;
          animation: mediaProgress 4.2s ease-in-out infinite;
        }

        /* =================================================
           ANALYTICS
        ================================================= */

        .analytics-window {
          width: 180px;
          padding: 12px;
          border: 1px solid #e4e4e7;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
          animation: analyticsFloat 4.5s ease-in-out infinite;
          will-change: transform;
        }

        .analytics-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .analytics-label {
          font-size: 7px;
          color: #a1a1aa;
          font-weight: 700;
        }

        .analytics-number {
          margin-top: 2px;
          font-size: 17px;
          font-weight: 950;
          color: #18181b;
        }

        .live-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 999px;
          background: #ecfdf5;
          padding: 4px 6px;
          color: #059669;
          font-size: 6px;
          font-weight: 900;
        }

        .live-pill span {
          height: 5px;
          width: 5px;
          border-radius: 50%;
          background: #10b981;
          animation: livePulse 2.4s ease-in-out infinite;
        }

        .chart {
          display: flex;
          height: 66px;
          align-items: flex-end;
          gap: 5px;
          margin-top: 12px;
          padding-bottom: 1px;
        }

        .chart span {
          flex: 1;
          min-height: 8px;
          border-radius: 4px 4px 2px 2px;
          background: linear-gradient(
            to top,
            #10b981,
            #34d399
          );
          transform-origin: bottom;
          animation: chartBars 3s ease-in-out infinite;
          will-change: transform;
        }

        .analytics-stats {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 9px;
          padding-top: 8px;
          border-top: 1px solid #f4f4f5;
        }

        .analytics-stats div {
          display: flex;
          align-items: center;
          gap: 3px;
          color: #71717a;
          font-size: 7px;
          font-weight: 700;
        }

        .analytics-stats strong {
          color: #059669;
          font-size: 7px;
        }

        /* =================================================
           FLOAT
        ================================================= */

        @keyframes productFloat {
          0%,
          100% {
            transform: translateY(0) rotate(2deg);
          }

          50% {
            transform: translateY(-5px) rotate(1deg);
          }
        }

        @keyframes calendarFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }

          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        @keyframes emailFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes tipFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes mediaFloat {
          0%,
          100% {
            transform: translateY(0) rotate(1deg);
          }

          50% {
            transform: translateY(-5px) rotate(0deg);
          }
        }

        @keyframes analyticsFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        /* =================================================
           PRODUCT ANIMATION
        ================================================= */

        @keyframes buyPress {
          0%,
          58%,
          100% {
            transform: scale(1);
          }

          63% {
            transform: scale(0.91);
          }

          69% {
            transform: scale(1.04);
          }

          75% {
            transform: scale(1);
          }
        }

        @keyframes purchaseDone {
          0%,
          58% {
            opacity: 0;
            transform: translateY(-4px) scale(0.9);
          }

          65%,
          82% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          91%,
          100% {
            opacity: 0;
            transform: translateY(-3px) scale(0.96);
          }
        }

        /* =================================================
           CALENDAR ANIMATION
        ================================================= */

        @keyframes dateSelect {
          0%,
          10% {
            background: #f4f4f5;
            color: #71717a;
            transform: scale(1);
            box-shadow: none;
          }

          13%,
          25% {
            background: #3b82f6;
            color: white;
            transform: scale(1.06);
            box-shadow: 0 5px 14px rgba(59, 130, 246, 0.25);
          }

          28%,
          100% {
            background: #f4f4f5;
            color: #71717a;
            transform: scale(1);
            box-shadow: none;
          }
        }

        @keyframes calendarButton {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }

          65% {
            transform: translateY(1px);
          }

          70% {
            transform: translateY(-1px);
          }

          75% {
            transform: translateY(0);
          }
        }

        /* =================================================
           EMAIL
        ================================================= */

        @keyframes typing {
          0%,
          25%,
          100% {
            opacity: 1;
          }

          32%,
          43% {
            opacity: 0.55;
          }

          50%,
          75% {
            opacity: 1;
          }
        }

        @keyframes emailButton {
          0%,
          60%,
          100% {
            transform: scale(1);
          }

          66% {
            transform: scale(0.96);
          }

          72% {
            transform: scale(1.02);
          }

          78% {
            transform: scale(1);
          }
        }

        @keyframes successFade {
          0%,
          58% {
            opacity: 0;
            transform: translateY(3px);
          }

          66%,
          84% {
            opacity: 1;
            transform: translateY(0);
          }

          92%,
          100% {
            opacity: 0;
            transform: translateY(-2px);
          }
        }

        /* =================================================
           TIP
        ================================================= */

        @keyframes coffeeBounce {
          0%,
          60%,
          100% {
            transform: translateY(0) rotate(0);
          }

          67% {
            transform: translateY(-3px) rotate(-4deg);
          }

          74% {
            transform: translateY(1px) rotate(3deg);
          }

          80% {
            transform: translateY(0) rotate(0);
          }
        }

        @keyframes tipSelect {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }

          68% {
            transform: translateY(-2px);
          }

          75% {
            transform: translateY(0);
          }
        }

        /* =================================================
           MEDIA
        ================================================= */

        @keyframes playPulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.07);
          }
        }

        @keyframes mediaProgress {
          0% {
            width: 20%;
          }

          50% {
            width: 65%;
          }

          100% {
            width: 38%;
          }
        }

        /* =================================================
           ANALYTICS
        ================================================= */

        @keyframes chartBars {
          0%,
          100% {
            transform: scaleY(0.9);
          }

          50% {
            transform: scaleY(1.04);
          }
        }

        @keyframes livePulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.45;
            transform: scale(0.8);
          }
        }

        /* =================================================
           HOVER
        ================================================= */

        .feature-card {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .feature-card-graphic {
          transition:
            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.7s ease;
        }

        .feature-card:hover .feature-card-graphic {
          transform: translateX(-2px);
        }

        /* =================================================
           DARK MODE
        ================================================= */

        .dark .product-window,
        .dark .calendar-window,
        .dark .email-window,
        .dark .tip-window,
        .dark .media-window,
        .dark .analytics-window {
          border-color: #27272a;
          background: #18181b;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.25);
        }

        .dark .product-name,
        .dark .calendar-month,
        .dark .email-title,
        .dark .tip-title,
        .dark .media-title,
        .dark .analytics-number {
          color: #ffffff;
        }

        .dark .calendar-date {
          background: #27272a;
          color: #a1a1aa;
        }

        .dark .calendar-book {
          background: rgba(59, 130, 246, 0.12);
        }

        .dark .email-input,
        .dark .tip-options span {
          border-color: #3f3f46;
          background: #18181b;
        }

        .dark .email-icon {
          background: rgba(124, 58, 237, 0.12);
        }

        .dark .coffee-circle {
          background: rgba(245, 158, 11, 0.1);
        }

        .dark .tip-options .tip-active {
          background: rgba(245, 158, 11, 0.1);
        }

        .dark .media-progress {
          background: #27272a;
        }

        .dark .analytics-stats {
          border-color: #27272a;
        }

        /* =================================================
           REDUCED MOTION
        ================================================= */

        @media (prefers-reduced-motion: reduce) {
          .product-window,
          .calendar-window,
          .email-window,
          .tip-window,
          .media-window,
          .analytics-window,
          .buy-button,
          .purchase-success,
          .calendar-date,
          .calendar-book,
          .email-input,
          .email-button,
          .email-success,
          .coffee-circle,
          .tip-options span,
          .media-play,
          .media-progress span,
          .chart span,
          .live-pill span {
            animation: none !important;
          }

          .feature-card,
          .feature-card-graphic {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

