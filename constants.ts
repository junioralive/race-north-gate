import { CampaignConfig, WheelSegment } from './types';

export const CAMPAIGN: CampaignConfig = {
  name: "RACE_NORTHGATE_2025",
  couponPrefix: "RACE-NG25",
  adminPassword: "raceadmin2025",
  googleSheetUrl: "https://script.google.com/macros/s/AKfycbwwpucQnUTb95adHl6TzOJRR8ygbiTr3imS0_vdXLVyz6b460n5Gg2eJIrHtMciTG4AdQ/exec", 
  segments: [
    { label: "₹10,000 OFF", value: 10, weight: 40, color: "#f97316" },
    { label: "₹5000 OFF", value: 20, weight: 25, color: "#ea580c" },
    { label: "Free Access to Workshops", value: 30, weight: 15, color: "#c2410c" },
    { label: "1-on-1 with C-Suite Leaders", value: 40, weight: 8, color: "#9a3412" },
    { label: "Hampers", value: 50, weight: 22, color: "#7c2d12" },
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