"use client";

/*
 * R4 ADVERTISING — OUT-OF-HOME IN-CHARGE CALENDAR
 * ---------------------------------------------------------------------------
 * Single-file React component. Styling, logic, and period data embedded.
 * Period data is the AUTHORITATIVE set from R4's handover (156 rows,
 * standard + bus, 2026-2028), with is_active and forward-looking rules applied.
 *
 * INSTALL (React or Next.js):
 *   1. Drop this file in, e.g. components/InChargeCalendar.jsx
 *   2. Render on its own route:
 *        import InChargeCalendar from "@/components/InChargeCalendar";
 *        export default function Page(){ return <InChargeCalendar />; }
 *
 * - WhatsApp CTA + per-row WhatsApp links use WA_NUMBER.
 *   >>> WA_NUMBER is currently 15559572412, which is a PLACEHOLDER (fake
 *   >>> +1-555 range). Set R4's real WhatsApp Business number before launch.
 * - "Or see what your budget is worth first" links to `calculatorPath`
 *   (default "/calculator") — pass a prop to change it.
 * - Live period + countdowns compute automatically from today (local dates).
 *
 * Dates: 2027/2028 are exact from R4's migrations; 2026 is back-derived and
 * worth a spot-check (most of 2026 is deactivated/past anyway).
 * ---------------------------------------------------------------------------
 */

import React, { useEffect, useRef } from "react";

const calendarScope = ".inChargeCalendar";

function scopeCalendarCss(css) {
  const fontFaces = [];
  const withoutFonts = css.replace(/@font-face\{[\s\S]*?\}/g, (match) => {
    fontFaces.push(match);
    return "";
  }).replace(/\/\*[\s\S]*?\*\//g, "");

  const prefixSelectorList = (selectorText) => {
    return selectorText.split(",").map((part) => {
      const sel = part.trim();

      if (!sel) {
        return sel;
      }

      if (sel === "html" || sel === "body" || sel === ":root") {
        return calendarScope;
      }

      if (sel === "*") {
        return `${calendarScope}, ${calendarScope} *`;
      }

      return `${calendarScope} ${sel}`;
    }).join(",");
  };

  const scopeRules = (input) => {
    let output = "";
    let index = 0;

    while (index < input.length) {
      const open = input.indexOf("{", index);

      if (open === -1) {
        output += input.slice(index);
        break;
      }

      const prelude = input.slice(index, open);
      let depth = 1;
      let cursor = open + 1;

      while (cursor < input.length && depth > 0) {
        if (input[cursor] === "{") {
          depth += 1;
        } else if (input[cursor] === "}") {
          depth -= 1;
        }

        cursor += 1;
      }

      const body = input.slice(open + 1, cursor - 1);
      const trimmed = prelude.trim();

      if (trimmed.startsWith("@media") || trimmed.startsWith("@supports")) {
        output += `${prelude}{${scopeRules(body)}}`;
      } else if (trimmed.startsWith("@")) {
        output += `${prelude}{${body}}`;
      } else if (trimmed) {
        output += `${prefixSelectorList(trimmed)}{${body}}`;
      }

      index = cursor;
    }

    return output;
  };

  return `${fontFaces.join("")}${scopeRules(withoutFonts)}`;
}

const STYLE_CSS = `
:root{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);--accent:#DBF905;--bg:#0D0E12;--panel:#101114;--panel2:#161619;--line:#1e1e22;--muted:#8a8a8a;--muted2:#6a6a6e;--wa:#25D366;}
*{box-sizing:border-box;}
html,body{margin:0;background:var(--bg);}
body{color:#fff;font-family:var(--text);line-height:1.5;}
.wrap{max-width:860px;margin:0 auto;padding:56px 28px 80px;}
.eyebrow{font-family:var(--eyebrow);color:var(--accent);font-size:14px;font-weight:700;font-style:italic;margin:0 0 14px;}
h1{font-family:var(--heading);font-weight:700;text-transform:uppercase;letter-spacing:.01em;font-size:54px;line-height:1.02;margin:0 0 16px;}
h1 .accent{color:var(--accent);}
.lead{color:#9a9a9a;font-size:17px;line-height:1.6;max-width:520px;margin:0 0 30px;}
.accent{color:var(--accent);}
/* status panel */
.status{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:26px;margin-bottom:22px;}
.status-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.status .lbl{color:var(--muted);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px;}
.status .pcode{font-family:var(--heading);font-weight:700;font-size:42px;line-height:1;letter-spacing:.01em;}
.status .pcode.live{color:var(--accent);}
.status .meta{color:var(--muted);font-size:13px;margin-top:8px;}
.status .meta b{color:#fff;}
.status .foot{color:var(--muted2);font-size:13px;line-height:1.55;margin-top:22px;border-top:1px solid var(--line);padding-top:18px;}
/* toggle */
.toggle{display:inline-flex;gap:6px;background:#141417;border:1px solid #222;border-radius:4px;padding:4px;margin-bottom:22px;}
.toggle button{background:transparent;color:#bbb;border:none;border-radius:3px;padding:9px 18px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;font-family:inherit;}
.toggle button.on{background:var(--accent);color:#0a0a0a;}
/* finder */
.finder{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:22px;margin-bottom:20px;}
.finder .lbl{color:var(--muted);font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;}
.finder .row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;}
.search{flex:1;min-width:180px;display:flex;align-items:center;gap:8px;background:#0a0a0a;border:1px solid #242424;border-radius:4px;padding:10px 12px;}
.search input{flex:1;background:transparent;border:none;color:#fff;font-size:14px;outline:none;font-family:inherit;}
.search svg{flex:none;color:var(--textLight);}
.yearfilters{display:flex;gap:6px;}
.yearfilters button{background:transparent;color:#bbb;border:1px solid #2a2a2e;border-radius:4px;padding:8px 14px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:inherit;}
.yearfilters button.on{background:var(--accent);color:#0a0a0a;border-color:var(--accent);}
/* list */
.listpanel{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:10px 0;margin-bottom:22px;}
.yearhead{display:flex;justify-content:space-between;align-items:baseline;padding:18px 22px 10px;}
.yearhead .y{font-family:var(--heading);font-weight:700;text-transform:uppercase;font-size:24px;letter-spacing:.01em;}
.yearhead .count{color:var(--muted);font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;}
.prow{display:flex;align-items:center;gap:14px;padding:13px 22px;border-top:1px solid #161619;}
.prow:hover{background:#141417;}
.prow.live{background:rgba(219,249,5,0.06);}
.prow .pc{font-weight:700;font-size:15px;width:42px;flex:none;}
.prow.live .pc{color:var(--accent);}
.prow .dates{color:#c5c5c8;font-size:15px;flex:1;}
.prow .pbadge{font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 9px;border-radius:3px;white-space:nowrap;}
.prow .pbadge.live{background:var(--accent);color:#0a0a0a;}
.prow .pbadge.soon{background:#fff;color:#0a0a0a;}
.prow .acts{display:flex;gap:4px;flex:none;}
.prow .acts button{background:transparent;border:none;cursor:pointer;padding:4px;display:flex;align-items:center;border-radius:3px;color:var(--textLight);}
.prow .acts button:hover{background:#232327;}
.prow .acts svg{width:15px;height:15px;color:var(--textLight);}
.empty{padding:30px 22px;color:var(--muted);font-size:14px;text-align:center;}
/* cta */
.cta{background:var(--panel2);border:1px solid var(--line);border-radius:6px;padding:26px;margin-bottom:24px;}
.cta h2{font-family:var(--heading);font-weight:700;text-transform:uppercase;letter-spacing:.01em;font-size:24px;margin:0 0 10px;}
.cta p{color:var(--muted);font-size:15px;line-height:1.6;margin:0 0 20px;max-width:490px;}
.wabtn{display:inline-flex;align-items:center;gap:10px;background:var(--wa);color:#0a2a12;border:none;border-radius:4px;padding:14px 22px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;text-decoration:none;font-family:inherit;}
.wabtn svg{width:16px;height:16px;}
.cta .alt{display:block;margin-top:16px;color:#fff;font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;text-decoration:underline;text-underline-offset:3px;}
.disclaimer{color:var(--muted2);font-size:13px;line-height:1.6;max-width:600px;}
.toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(20px);background:var(--accent);color:#0a0a0a;font-size:13px;font-weight:700;padding:11px 20px;border-radius:5px;opacity:0;pointer-events:none;transition:all .25s;z-index:50;}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
@media(max-width:560px){
  h1{font-size:38px;}
  .status-grid{grid-template-columns:1fr;gap:20px;}
  .prow .dates{font-size:13px;}
  .prow .pc{font-size:14px;}
}
`;
const scopedStyleCss = scopeCalendarCss(STYLE_CSS);

export default function InChargeCalendar({ calculatorPath = "/calculator" }) {
  const hostRef = useRef(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    host.innerHTML = '<div class="wrap" id="r4cal-app"></div><div class="toast" id="r4cal-toast">Copied</div>';

    
var WA_LINK = "https://api.whatsapp.com/send/?phone=15559572412&text=Hi%2C+I%27ve+been+looking+at+the+R4+in-charge+calendar.+I%27d+like+to+book+an+appointment+to+plan+my+next+campaign.&type=phone_number&app_absent=0";
var WA_NUMBER = "15559572412";
var ACCENT = "#DBF905";

var PERIODS=[
{c:"P1",y:2026,t:"bus",s:"2026-01-06",e:"2026-01-19",a:false},
{c:"P2",y:2026,t:"bus",s:"2026-01-20",e:"2026-02-02",a:false},
{c:"P3",y:2026,t:"bus",s:"2026-02-03",e:"2026-02-16",a:false},
{c:"P4",y:2026,t:"bus",s:"2026-02-17",e:"2026-03-02",a:false},
{c:"P5",y:2026,t:"bus",s:"2026-03-03",e:"2026-03-16",a:false},
{c:"P6",y:2026,t:"bus",s:"2026-03-17",e:"2026-03-30",a:false},
{c:"P7",y:2026,t:"bus",s:"2026-03-31",e:"2026-04-13",a:false},
{c:"P8",y:2026,t:"bus",s:"2026-04-14",e:"2026-04-27",a:false},
{c:"P9",y:2026,t:"bus",s:"2026-04-28",e:"2026-05-11",a:false},
{c:"P10",y:2026,t:"bus",s:"2026-05-12",e:"2026-05-25",a:false},
{c:"P11",y:2026,t:"bus",s:"2026-05-26",e:"2026-06-08",a:false},
{c:"P12",y:2026,t:"bus",s:"2026-06-09",e:"2026-06-22",a:false},
{c:"P13",y:2026,t:"bus",s:"2026-06-23",e:"2026-07-06",a:false},
{c:"P14",y:2026,t:"bus",s:"2026-07-07",e:"2026-07-20",a:false},
{c:"P15",y:2026,t:"bus",s:"2026-07-21",e:"2026-08-03",a:false},
{c:"P16",y:2026,t:"bus",s:"2026-08-04",e:"2026-08-17",a:true},
{c:"P17",y:2026,t:"bus",s:"2026-08-18",e:"2026-08-31",a:true},
{c:"P18",y:2026,t:"bus",s:"2026-09-01",e:"2026-09-14",a:true},
{c:"P19",y:2026,t:"bus",s:"2026-09-15",e:"2026-09-28",a:true},
{c:"P20",y:2026,t:"bus",s:"2026-09-29",e:"2026-10-12",a:true},
{c:"P21",y:2026,t:"bus",s:"2026-10-13",e:"2026-10-26",a:true},
{c:"P22",y:2026,t:"bus",s:"2026-10-27",e:"2026-11-09",a:true},
{c:"P23",y:2026,t:"bus",s:"2026-11-10",e:"2026-11-23",a:true},
{c:"P24",y:2026,t:"bus",s:"2026-11-24",e:"2026-12-07",a:true},
{c:"P25",y:2026,t:"bus",s:"2026-12-08",e:"2026-12-21",a:true},
{c:"P26",y:2026,t:"bus",s:"2026-12-22",e:"2027-01-04",a:true},
{c:"P1",y:2027,t:"bus",s:"2027-01-05",e:"2027-01-18",a:true},
{c:"P2",y:2027,t:"bus",s:"2027-01-19",e:"2027-02-01",a:true},
{c:"P3",y:2027,t:"bus",s:"2027-02-02",e:"2027-02-15",a:true},
{c:"P4",y:2027,t:"bus",s:"2027-02-16",e:"2027-03-01",a:true},
{c:"P5",y:2027,t:"bus",s:"2027-03-02",e:"2027-03-15",a:true},
{c:"P6",y:2027,t:"bus",s:"2027-03-16",e:"2027-03-29",a:true},
{c:"P7",y:2027,t:"bus",s:"2027-03-30",e:"2027-04-12",a:true},
{c:"P8",y:2027,t:"bus",s:"2027-04-13",e:"2027-04-26",a:true},
{c:"P9",y:2027,t:"bus",s:"2027-04-27",e:"2027-05-10",a:true},
{c:"P10",y:2027,t:"bus",s:"2027-05-11",e:"2027-05-24",a:true},
{c:"P11",y:2027,t:"bus",s:"2027-05-25",e:"2027-06-07",a:true},
{c:"P12",y:2027,t:"bus",s:"2027-06-08",e:"2027-06-21",a:true},
{c:"P13",y:2027,t:"bus",s:"2027-06-22",e:"2027-07-05",a:true},
{c:"P14",y:2027,t:"bus",s:"2027-07-06",e:"2027-07-19",a:true},
{c:"P15",y:2027,t:"bus",s:"2027-07-20",e:"2027-08-02",a:true},
{c:"P16",y:2027,t:"bus",s:"2027-08-03",e:"2027-08-16",a:true},
{c:"P17",y:2027,t:"bus",s:"2027-08-17",e:"2027-08-30",a:true},
{c:"P18",y:2027,t:"bus",s:"2027-08-31",e:"2027-09-13",a:true},
{c:"P19",y:2027,t:"bus",s:"2027-09-14",e:"2027-09-27",a:true},
{c:"P20",y:2027,t:"bus",s:"2027-09-28",e:"2027-10-11",a:true},
{c:"P21",y:2027,t:"bus",s:"2027-10-12",e:"2027-10-25",a:true},
{c:"P22",y:2027,t:"bus",s:"2027-10-26",e:"2027-11-08",a:true},
{c:"P23",y:2027,t:"bus",s:"2027-11-09",e:"2027-11-22",a:true},
{c:"P24",y:2027,t:"bus",s:"2027-11-23",e:"2027-12-06",a:true},
{c:"P25",y:2027,t:"bus",s:"2027-12-07",e:"2027-12-20",a:true},
{c:"P26",y:2027,t:"bus",s:"2027-12-21",e:"2028-01-03",a:true},
{c:"P1",y:2028,t:"bus",s:"2028-01-04",e:"2028-01-17",a:true},
{c:"P2",y:2028,t:"bus",s:"2028-01-18",e:"2028-01-31",a:true},
{c:"P3",y:2028,t:"bus",s:"2028-02-01",e:"2028-02-14",a:true},
{c:"P4",y:2028,t:"bus",s:"2028-02-15",e:"2028-02-28",a:true},
{c:"P5",y:2028,t:"bus",s:"2028-02-29",e:"2028-03-13",a:true},
{c:"P6",y:2028,t:"bus",s:"2028-03-14",e:"2028-03-27",a:true},
{c:"P7",y:2028,t:"bus",s:"2028-03-28",e:"2028-04-10",a:true},
{c:"P8",y:2028,t:"bus",s:"2028-04-11",e:"2028-04-24",a:true},
{c:"P9",y:2028,t:"bus",s:"2028-04-25",e:"2028-05-08",a:true},
{c:"P10",y:2028,t:"bus",s:"2028-05-09",e:"2028-05-22",a:true},
{c:"P11",y:2028,t:"bus",s:"2028-05-23",e:"2028-06-05",a:true},
{c:"P12",y:2028,t:"bus",s:"2028-06-06",e:"2028-06-19",a:true},
{c:"P13",y:2028,t:"bus",s:"2028-06-20",e:"2028-07-03",a:true},
{c:"P14",y:2028,t:"bus",s:"2028-07-04",e:"2028-07-17",a:true},
{c:"P15",y:2028,t:"bus",s:"2028-07-18",e:"2028-07-31",a:true},
{c:"P16",y:2028,t:"bus",s:"2028-08-01",e:"2028-08-14",a:true},
{c:"P17",y:2028,t:"bus",s:"2028-08-15",e:"2028-08-28",a:true},
{c:"P18",y:2028,t:"bus",s:"2028-08-29",e:"2028-09-11",a:true},
{c:"P19",y:2028,t:"bus",s:"2028-09-12",e:"2028-09-25",a:true},
{c:"P20",y:2028,t:"bus",s:"2028-09-26",e:"2028-10-09",a:true},
{c:"P21",y:2028,t:"bus",s:"2028-10-10",e:"2028-10-23",a:true},
{c:"P22",y:2028,t:"bus",s:"2028-10-24",e:"2028-11-06",a:true},
{c:"P23",y:2028,t:"bus",s:"2028-11-07",e:"2028-11-20",a:true},
{c:"P24",y:2028,t:"bus",s:"2028-11-21",e:"2028-12-04",a:true},
{c:"P25",y:2028,t:"bus",s:"2028-12-05",e:"2028-12-18",a:true},
{c:"P26",y:2028,t:"bus",s:"2028-12-19",e:"2029-01-01",a:true},
{c:"P1",y:2026,t:"standard",s:"2025-12-30",e:"2026-01-12",a:false},
{c:"P2",y:2026,t:"standard",s:"2026-01-13",e:"2026-01-26",a:false},
{c:"P3",y:2026,t:"standard",s:"2026-01-27",e:"2026-02-09",a:false},
{c:"P4",y:2026,t:"standard",s:"2026-02-10",e:"2026-02-23",a:false},
{c:"P5",y:2026,t:"standard",s:"2026-02-24",e:"2026-03-09",a:false},
{c:"P6",y:2026,t:"standard",s:"2026-03-10",e:"2026-03-23",a:false},
{c:"P7",y:2026,t:"standard",s:"2026-03-24",e:"2026-04-06",a:false},
{c:"P8",y:2026,t:"standard",s:"2026-04-07",e:"2026-04-20",a:false},
{c:"P9",y:2026,t:"standard",s:"2026-04-21",e:"2026-05-04",a:false},
{c:"P10",y:2026,t:"standard",s:"2026-05-05",e:"2026-05-18",a:false},
{c:"P11",y:2026,t:"standard",s:"2026-05-19",e:"2026-06-01",a:false},
{c:"P12",y:2026,t:"standard",s:"2026-06-02",e:"2026-06-15",a:false},
{c:"P13",y:2026,t:"standard",s:"2026-06-16",e:"2026-06-29",a:false},
{c:"P14",y:2026,t:"standard",s:"2026-06-30",e:"2026-07-13",a:false},
{c:"P15",y:2026,t:"standard",s:"2026-07-14",e:"2026-07-27",a:false},
{c:"P16",y:2026,t:"standard",s:"2026-07-28",e:"2026-08-10",a:true},
{c:"P17",y:2026,t:"standard",s:"2026-08-11",e:"2026-08-24",a:true},
{c:"P18",y:2026,t:"standard",s:"2026-08-25",e:"2026-09-07",a:true},
{c:"P19",y:2026,t:"standard",s:"2026-09-08",e:"2026-09-21",a:true},
{c:"P20",y:2026,t:"standard",s:"2026-09-22",e:"2026-10-05",a:true},
{c:"P21",y:2026,t:"standard",s:"2026-10-06",e:"2026-10-19",a:true},
{c:"P22",y:2026,t:"standard",s:"2026-10-20",e:"2026-11-02",a:true},
{c:"P23",y:2026,t:"standard",s:"2026-11-03",e:"2026-11-16",a:true},
{c:"P24",y:2026,t:"standard",s:"2026-11-17",e:"2026-11-30",a:true},
{c:"P25",y:2026,t:"standard",s:"2026-12-01",e:"2026-12-14",a:true},
{c:"P26",y:2026,t:"standard",s:"2026-12-15",e:"2026-12-28",a:true},
{c:"P1",y:2027,t:"standard",s:"2026-12-29",e:"2027-01-11",a:true},
{c:"P2",y:2027,t:"standard",s:"2027-01-12",e:"2027-01-25",a:true},
{c:"P3",y:2027,t:"standard",s:"2027-01-26",e:"2027-02-08",a:true},
{c:"P4",y:2027,t:"standard",s:"2027-02-09",e:"2027-02-22",a:true},
{c:"P5",y:2027,t:"standard",s:"2027-02-23",e:"2027-03-08",a:true},
{c:"P6",y:2027,t:"standard",s:"2027-03-09",e:"2027-03-22",a:true},
{c:"P7",y:2027,t:"standard",s:"2027-03-23",e:"2027-04-05",a:true},
{c:"P8",y:2027,t:"standard",s:"2027-04-06",e:"2027-04-19",a:true},
{c:"P9",y:2027,t:"standard",s:"2027-04-20",e:"2027-05-03",a:true},
{c:"P10",y:2027,t:"standard",s:"2027-05-04",e:"2027-05-17",a:true},
{c:"P11",y:2027,t:"standard",s:"2027-05-18",e:"2027-05-31",a:true},
{c:"P12",y:2027,t:"standard",s:"2027-06-01",e:"2027-06-14",a:true},
{c:"P13",y:2027,t:"standard",s:"2027-06-15",e:"2027-06-28",a:true},
{c:"P14",y:2027,t:"standard",s:"2027-06-29",e:"2027-07-12",a:true},
{c:"P15",y:2027,t:"standard",s:"2027-07-13",e:"2027-07-26",a:true},
{c:"P16",y:2027,t:"standard",s:"2027-07-27",e:"2027-08-09",a:true},
{c:"P17",y:2027,t:"standard",s:"2027-08-10",e:"2027-08-23",a:true},
{c:"P18",y:2027,t:"standard",s:"2027-08-24",e:"2027-09-06",a:true},
{c:"P19",y:2027,t:"standard",s:"2027-09-07",e:"2027-09-20",a:true},
{c:"P20",y:2027,t:"standard",s:"2027-09-21",e:"2027-10-04",a:true},
{c:"P21",y:2027,t:"standard",s:"2027-10-05",e:"2027-10-18",a:true},
{c:"P22",y:2027,t:"standard",s:"2027-10-19",e:"2027-11-01",a:true},
{c:"P23",y:2027,t:"standard",s:"2027-11-02",e:"2027-11-15",a:true},
{c:"P24",y:2027,t:"standard",s:"2027-11-16",e:"2027-11-29",a:true},
{c:"P25",y:2027,t:"standard",s:"2027-11-30",e:"2027-12-13",a:true},
{c:"P26",y:2027,t:"standard",s:"2027-12-14",e:"2027-12-27",a:true},
{c:"P1",y:2028,t:"standard",s:"2027-12-28",e:"2028-01-10",a:true},
{c:"P2",y:2028,t:"standard",s:"2028-01-11",e:"2028-01-24",a:true},
{c:"P3",y:2028,t:"standard",s:"2028-01-25",e:"2028-02-07",a:true},
{c:"P4",y:2028,t:"standard",s:"2028-02-08",e:"2028-02-21",a:true},
{c:"P5",y:2028,t:"standard",s:"2028-02-22",e:"2028-03-06",a:true},
{c:"P6",y:2028,t:"standard",s:"2028-03-07",e:"2028-03-20",a:true},
{c:"P7",y:2028,t:"standard",s:"2028-03-21",e:"2028-04-03",a:true},
{c:"P8",y:2028,t:"standard",s:"2028-04-04",e:"2028-04-17",a:true},
{c:"P9",y:2028,t:"standard",s:"2028-04-18",e:"2028-05-01",a:true},
{c:"P10",y:2028,t:"standard",s:"2028-05-02",e:"2028-05-15",a:true},
{c:"P11",y:2028,t:"standard",s:"2028-05-16",e:"2028-05-29",a:true},
{c:"P12",y:2028,t:"standard",s:"2028-05-30",e:"2028-06-12",a:true},
{c:"P13",y:2028,t:"standard",s:"2028-06-13",e:"2028-06-26",a:true},
{c:"P14",y:2028,t:"standard",s:"2028-06-27",e:"2028-07-10",a:true},
{c:"P15",y:2028,t:"standard",s:"2028-07-11",e:"2028-07-24",a:true},
{c:"P16",y:2028,t:"standard",s:"2028-07-25",e:"2028-08-07",a:true},
{c:"P17",y:2028,t:"standard",s:"2028-08-08",e:"2028-08-21",a:true},
{c:"P18",y:2028,t:"standard",s:"2028-08-22",e:"2028-09-04",a:true},
{c:"P19",y:2028,t:"standard",s:"2028-09-05",e:"2028-09-18",a:true},
{c:"P20",y:2028,t:"standard",s:"2028-09-19",e:"2028-10-02",a:true},
{c:"P21",y:2028,t:"standard",s:"2028-10-03",e:"2028-10-16",a:true},
{c:"P22",y:2028,t:"standard",s:"2028-10-17",e:"2028-10-30",a:true},
{c:"P23",y:2028,t:"standard",s:"2028-10-31",e:"2028-11-13",a:true},
{c:"P24",y:2028,t:"standard",s:"2028-11-14",e:"2028-11-27",a:true},
{c:"P25",y:2028,t:"standard",s:"2028-11-28",e:"2028-12-11",a:true},
{c:"P26",y:2028,t:"standard",s:"2028-12-12",e:"2028-12-25",a:true}
];

var DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Parse an ISO date as a LOCAL date (not UTC) — see handover README §3.
function parse(iso){ var p=iso.split("-"); return new Date(+p[0], +p[1]-1, +p[2]); }
function fmtDay(iso){ var d=parse(iso); return d.getDate()+" "+MONTHS[d.getMonth()]; }
function fmtDayYear(iso){ var d=parse(iso); return d.getDate()+" "+MONTHS[d.getMonth()]+" "+d.getFullYear(); }
// Row range: "9 Feb – 22 Feb 2027" (year on end only)
function fmtRange(p){ return fmtDay(p.s)+" \u2013 "+fmtDayYear(p.e); }
// Copy/WhatsApp range: "9 Feb 2027 – 22 Feb 2027"
function fmtRangeFull(p){ return fmtDayYear(p.s)+" \u2013 "+fmtDayYear(p.e); }
function today0(){ var t=new Date(); t.setHours(0,0,0,0); return t; }
function dayDiff(aIso, base){ return Math.round((parse(aIso)-base)/(864e5)); }
function cycleLabel(t){ return t==="bus" ? "Bus off-cycle" : "Standard"; }

var state = { cycle:"standard", year:"all", q:"" };

// Visible periods = active, in the chosen cycle, not finished (end >= today).
function visiblePeriods(){
  var t = today0();
  return PERIODS.filter(function(p){
    if(!p.a) return false;
    if(p.t !== state.cycle) return false;
    var end = parse(p.e); end.setHours(23,59,59,999);
    return end >= t;
  });
}

// Status looks across the active cycle only.
function statusInfo(){
  var t = today0();
  var inCycle = PERIODS.filter(function(p){ return p.a && p.t===state.cycle; });
  var live=null, next=null;
  for(var i=0;i<inCycle.length;i++){
    var s=parse(inCycle[i].s), e=parse(inCycle[i].e); e.setHours(23,59,59,999);
    if(t>=s && t<=e){ live=inCycle[i]; break; }
  }
  for(var j=0;j<inCycle.length;j++){ if(parse(inCycle[j].s) > t){ next=inCycle[j]; break; } }
  return {live:live, next:next, today:t};
}

function availableYears(){
  // years that still have visible (forward-looking, active) periods in this cycle
  var ys = {};
  visiblePeriods().forEach(function(p){ ys[p.y]=true; });
  return Object.keys(ys).map(Number).sort();
}

function matchPeriod(p){
  var q = state.q.trim().toLowerCase();
  if(state.year!=="all" && String(p.y)!==state.year) return false;
  if(!q) return true;
  var hay = (p.c+" period "+p.c.slice(1)+" "+p.y+" "+p.s+" "+p.e+" "+fmtRangeFull(p)).toLowerCase();
  return hay.indexOf(q) >= 0;
}

function waForPeriod(p){
  var msg = "Hi, I've been looking at the R4 in-charge calendar. I'd like to book an appointment about "+cycleLabel(p.t)+" "+p.c+" "+p.y+" ("+fmtRangeFull(p)+").";
  return "https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(msg);
}

function render(){
  var si = statusInfo();
  var h='';
  h+='<p class="eyebrow">Out-of-Home In-Charge Dates</p>';
  h+='<h1>Out-of-home runs to a fixed calendar.<br><span class="accent">Plan around it, not against it.</span></h1>';
  h+='<p class="lead">Every in-charge period for the next three years, standard and bus off-cycle. Find the dates you want, then book a conversation about them.</p>';

  // status panel
  h+='<div class="status"><div class="status-grid">';
  if(si.live){
    var endsIn = dayDiff(si.live.e, si.today);
    h+='<div><div class="lbl">In Charge Right Now</div><div class="pcode live">'+si.live.c+'</div>';
    h+='<div class="meta">'+fmtRange(si.live)+' \u00b7 ends in <b>'+endsIn+' days</b></div></div>';
  } else {
    h+='<div><div class="lbl">In Charge Right Now</div><div class="pcode" style="color:var(--muted)">\u2014</div>';
    h+='<div class="meta">Between periods \u2014 the next one is listed alongside.</div></div>';
  }
  if(si.next){
    var startsIn = dayDiff(si.next.s, si.today);
    h+='<div><div class="lbl">Next In Charge</div><div class="pcode">'+si.next.c+'</div>';
    h+='<div class="meta">'+fmtRange(si.next)+' \u00b7 starts in <b>'+startsIn+' days</b></div></div>';
  }
  h+='</div>';
  h+='<div class="foot">Roadside, rail and underground run on the standard in-charge cycle. Artwork and booking deadlines fall well before an in-charge date \u2014 the earlier you plan, the better the sites you get.</div>';
  h+='</div>';

  // cycle toggle
  h+='<div class="toggle"><button data-cycle="standard" class="'+(state.cycle==="standard"?"on":"")+'">Standard</button>';
  h+='<button data-cycle="bus" class="'+(state.cycle==="bus"?"on":"")+'">Bus Off-Cycle</button></div>';

  // finder
  h+='<div class="finder"><div class="lbl">Find a Period</div><div class="row">';
  h+='<div class="search"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  h+='<input id="searchbox" placeholder="P17, March, 2027..." value="'+state.q.replace(/"/g,"&quot;")+'"></div>';
  h+='<div class="yearfilters">';
  var ys = availableYears();
  h+='<button data-year="all" class="'+(state.year==="all"?"on":"")+'">All</button>';
  ys.forEach(function(y){ h+='<button data-year="'+y+'" class="'+(state.year===String(y)?"on":"")+'">'+y+'</button>'; });
  h+='</div></div></div>';

  // list
  h+='<div class="listpanel" id="listpanel">'+listHTML()+'</div>';

  // cta
  h+='<div class="cta"><h2>Found your dates? Let\'s get the sites booked.</h2>';
  h+='<p>The best inventory in any in-charge period goes early. Message us on WhatsApp and we\'ll get an appointment in the diary \u2014 no obligation, just a practical conversation.</p>';
  h+='<a class="wabtn" href="'+WA_LINK+'" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.4 5 5.1-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4a.4.4 0 000-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3A2.8 2.8 0 006 8.8c0 1.6 1.2 3.2 1.4 3.4s2.3 3.5 5.6 4.9c2.8 1.1 2.8.7 3.3.7a2.5 2.5 0 001.7-1.2 2 2 0 00.1-1.2c0-.1-.2-.2-.4-.3z"/></svg> Book an appointment on WhatsApp</a>';
  h+='<a class="alt" href="'+calculatorPath+'">Or see what your budget is worth first \u2192</a>';
  h+='</div>';

  h+='<p class="disclaimer">In-charge periods run to the media owners\' published calendars and can be revised. Bus runs an off-cycle calendar of its own. Confirm final dates with us before committing artwork or budget.</p>';

  host.querySelector("#r4cal-app").innerHTML=h;
  wire();
}

function listHTML(){
  var rows = visiblePeriods().filter(matchPeriod);
  if(rows.length===0) return '<div class="empty">No periods match that search.</div>';
  var si = statusInfo();
  // group by year
  var byYear = {};
  rows.forEach(function(p){ (byYear[p.y]=byYear[p.y]||[]).push(p); });
  var years = Object.keys(byYear).map(Number).sort();
  var out='';
  years.forEach(function(yr){
    var list = byYear[yr].sort(function(a,b){ return parse(a.s)-parse(b.s); });
    out+='<div class="yearhead"><span class="y">'+yr+'</span><span class="count">'+list.length+' Periods</span></div>';
    list.forEach(function(p){
      var isLive = si.live && si.live===p;
      var isNext = si.next && si.next===p;
      var badge='';
      if(isLive) badge='<span class="pbadge live">Live Now</span>';
      else if(isNext){ badge='<span class="pbadge soon">In '+dayDiff(p.s, si.today)+'d</span>'; }
      var copyTxt = (p.y+" "+p.c+": "+fmtRangeFull(p));
      out+='<div class="prow'+(isLive?" live":"")+'">';
      out+='<span class="pc">'+p.c+'</span>';
      out+='<span class="dates">'+fmtRange(p)+'</span>';
      out+=badge;
      out+='<span class="acts">';
      out+='<button title="Copy dates" data-copy="'+copyTxt.replace(/"/g,"&quot;")+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></svg></button>';
      out+='<a title="Ask about this period" href="'+waForPeriod(p)+'" target="_blank" rel="noopener"><button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.4 8.4 0 01-12 7.6L3 21l1.9-5.5A8.4 8.4 0 1121 11.5z"/></svg></button></a>';
      out+='</span></div>';
    });
  });
  return out;
}

function showToast(txt){
  var t=host.querySelector("#r4cal-toast"); t.textContent=txt; t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 1500);
}

function wire(){
  host.querySelectorAll('[data-cycle]').forEach(function(b){
    b.addEventListener('click',function(){
      state.cycle=b.getAttribute('data-cycle');
      // year chip may no longer exist in this cycle -> fall back to All
      if(state.year!=="all" && availableYears().indexOf(parseInt(state.year,10))<0) state.year="all";
      render();
    });
  });
  host.querySelectorAll('[data-year]').forEach(function(b){
    b.addEventListener('click',function(){ state.year=b.getAttribute('data-year'); render(); });
  });
  var sb=host.querySelector("#searchbox");
  if(sb) sb.addEventListener('input',function(e){
    state.q=e.target.value;
    host.querySelector("#listpanel").innerHTML=listHTML();
    wireRows();
  });
  wireRows();
}

function wireRows(){
  host.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var txt=b.getAttribute('data-copy');
      if(navigator.clipboard){ navigator.clipboard.writeText(txt).then(function(){ showToast('Copied'); }); }
      else showToast('Copied');
    });
  });
}

render();


    return () => { host.innerHTML = ""; };
  }, [calculatorPath]);

  return (

    <div className="inChargeCalendar">

      <style>{scopedStyleCss}</style>

      <div ref={hostRef} />

    </div>

  );
}
