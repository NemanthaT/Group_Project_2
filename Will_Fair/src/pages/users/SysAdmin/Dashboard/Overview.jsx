import StatCard from "./StatCard";
import styles from "../Styles";
import { Users, DollarSign, AlertCircle } from 'lucide-react';

const Overview = ({ stats, donations }) => (
  <div>
    <div style={styles.statsGrid}>
      <StatCard icon={Users} title="Total Donors" value={stats.totalDonors} color="#4f46e5" />
      <StatCard icon={Users} title="Total Donees" value={stats.totalDonees} color="#10b981" />
      <StatCard icon={DollarSign} title="Total Donations" value={`$${stats.totalDonations.toLocaleString()}`} color="#f59e0b" />
      <StatCard icon={AlertCircle} title="Pending Verifications" value={stats.pendingVerifications} color="#ef4444" />
    </div>
    <div style={styles.recentSection}>
      <h2 style={styles.sectionTitle}>Recent Donations</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Donor</th>
            <th style={styles.th}>Donee</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Date</th>
            {/*<th style={styles.th}>Status</th>*/}
          </tr>
        </thead>
        <tbody>
          {donations.slice(0, 5).map(d => (
            <tr key={d.id} style={styles.tr}>
              <td style={styles.td}>{d.donorName}</td>
              <td style={styles.td}>{d.doneeName}</td>
              <td style={styles.td}>${d.amount}</td>
              <td style={styles.td}>{d.date}</td>
              {/*<td style={styles.td}>
                <span style={{...styles.badge, ...(d.status === 'Completed' ? styles.badgeCompleted : styles.badgePending)}}>
                  {d.status}
                </span>
              </td>*/}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Overview;