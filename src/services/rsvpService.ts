import { RSVPFormData } from "@/types";

const LOCAL_STORAGE_KEY = "mohamed_menna_rsvp_submission";
const ALL_RSVP_KEY = "mohamed_menna_all_rsvps";

export async function submitRSVP(data: RSVPFormData): Promise<{ success: boolean; message?: string }> {
  try {
    // 1. Store the user's specific response in localStorage for instant retrieval on page reload
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      
      // Also maintain a cumulative local list for organizer review
      const existingAll = localStorage.getItem(ALL_RSVP_KEY);
      const list: RSVPFormData[] = existingAll ? JSON.parse(existingAll) : [];
      list.push(data);
      localStorage.setItem(ALL_RSVP_KEY, JSON.stringify(list));
    }

    // 2. Send to API endpoint (handles webhooks, email alerts, or database logging)
    try {
      await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Graceful fallback if backend API is not responding or running in static export
      console.warn("Backend API endpoint not reachable; saved locally.");
    }

    return { success: true };
  } catch (error) {
    console.error("RSVP submission error:", error);
    return { success: false, message: "Could not submit RSVP. Please try again." };
  }
}

export function getStoredRSVP(): RSVPFormData | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function exportRSVPs(): RSVPFormData[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ALL_RSVP_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}
