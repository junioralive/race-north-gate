
export interface WheelSegment {
  label: string;
  value: number;
  weight: number;
  color: string;
}

export interface UserSubmission {
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle?: string;
  interest?: string;
  timestamp: string;
  reward?: string;
  coupon?: string;
}

export interface CampaignConfig {
  name: string;
  couponPrefix: string;
  segments: WheelSegment[];
  adminPassword: string;
  googleSheetUrl?: string;
}

export enum AppState {
  LANDING = 'landing',
  FORM = 'form',
  SPIN = 'spin',
  RESULT = 'result',
  ADMIN = 'admin'
}