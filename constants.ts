import { CampaignConfig, WheelSegment } from './types';

export const CAMPAIGN: CampaignConfig = {
  name: "RACE_NORTHGATE_2025",
  couponPrefix: "RACE-NG25",
  adminPassword: "raceadmin2025",
  googleSheetUrl: "https://script.google.com/macros/s/AKfycbwwpucQnUTb95adHl6TzOJRR8ygbiTr3imS0_vdXLVyz6b460n5Gg2eJIrHtMciTG4AdQ/exec", 
  segments: [
    { label: "10% OFF", value: 10, weight: 40, color: "#f97316" },
    { label: "20% OFF", value: 20, weight: 25, color: "#ea580c" },
    { label: "30% OFF", value: 30, weight: 15, color: "#c2410c" },
    { label: "40% OFF", value: 40, weight: 8, color: "#9a3412" },
    // { label: "50% OFF", value: 50, weight: 6, color: "#7c2d12" },
    // { label: "75% OFF", value: 75, weight: 4, color: "#f97316" },
    // { label: "100% OFF", value: 100, weight: 2, color: "#fbbf24" },
    // { label: "TRY AGAIN (10%)", value: 10, weight: 0, color: "#64748b" },
  ]
};

export const PROGRAMS = [
  {
    title: "Artificial Intelligence",
    bullets: ["Industry aligned curriculum", "Hands-on projects", "Executive mentorship"]
  },
  {
    title: "Cybersecurity",
    bullets: ["SOC analyst training", "Real-world simulations", "Global certifications"]
  },
  {
    title: "Business Analytics",
    bullets: ["Data-driven decision making", "Advanced Excel to Tableau", "Career coaching"]
  },
  {
    title: "Cloud Architecture",
    bullets: ["AWS/Azure expertise", "DevOps integration", "Scalable infrastructure design"]
  }
];

export const CONTACT_INFO = {
  phone: "+91 89040 58866",
  email: "enquiry@race.reva.edu.in",
  address: "RACE, REVA University, Yelahanka, Bangalore, Karnataka, 560 064",
  officialSite: "https://race.reva.edu.in/"
};