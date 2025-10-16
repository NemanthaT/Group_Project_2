import { getDonorStats } from "../models/donorModel.js";
import { getDoneeStats } from "../models/doneeModel.js";
import { getRecentDonationsAdmin } from "../models/donationModel.js";

// Get admin dashboard overview stats
export async function getAdminOverview(req, res) {
  try {
    const donorStats = await getDonorStats();
    const doneeStats = await getDoneeStats();
    const recentDonations = await getRecentDonationsAdmin(5);
    const stats = {
      ...donorStats,
      ...doneeStats
    };
    res.json({ success: true, stats, recentDonations });
  } catch (err) {
    console.error("Error in getAdminOverview:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
}
