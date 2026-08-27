export type Language = "en" | "ar";

export interface GuestInfo {
  name: string;
  nameAr?: string;
  seats: number;
  plusOneAllowed: boolean;
  table?: string;
  customNote?: string;
}

export interface WeddingConfig {
  groom: {
    nameEn: string;
    nameAr: string;
    titleEn?: string;
    titleAr?: string;
  };
  bride: {
    nameEn: string;
    nameAr: string;
    titleEn?: string;
    titleAr?: string;
  };
  monogram: string;
  date: {
    iso: string; // "2026-09-10T19:00:00+02:00"
    displayEn: string;
    displayAr: string;
    day: string;
    monthEn: string;
    monthAr: string;
    year: string;
  };
  city: {
    en: string;
    ar: string;
  };
  country: {
    en: string;
    ar: string;
  };
  venue: {
    nameEn: string;
    nameAr: string;
    addressEn: string;
    addressAr: string;
    mapsUrl: string;
    isConfirmed: boolean;
  };
  eventTime: {
    displayEn: string;
    displayAr: string;
    isConfirmed: boolean;
  };
  timeline: {
    time: string;
    timeAr: string;
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
  }[];
  music: {
    enabled: boolean;
    defaultVolume: number;
    titleEn: string;
    titleAr: string;
    artist: string;
    customAudioUrl?: string;
  };
  galleryImages: {
    src: string;
    alt: string;
    captionEn?: string;
    captionAr?: string;
    aspectRatio?: "portrait" | "landscape" | "square" | "tall";
  }[];
  heroImage: string;
  venueImage: string;
  closingImage: string;
  social: {
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
}

export interface RSVPFormData {
  guestName: string;
  attending: boolean;
  guestCount: number;
  dietaryOrNotes?: string;
  phoneNumber?: string;
  submittedAt: string;
}
