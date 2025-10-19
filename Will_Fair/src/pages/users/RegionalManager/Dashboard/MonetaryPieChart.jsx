import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const MonetaryPieChart = ({ donations }) => {
  // Calculate amounts - use the stats object properties
  const totalReceived = donations.totalMonetary || 0;
  const sentAmount = donations.sentMonetaryAmount || 0;
  const pendingAmount = totalReceived - sentAmount;

  // Pie chart data
  const pieData = [
    { name: 'Sent Out', value: sentAmount, color: '#10b981' },
    { name: 'Pending/Active', value: pendingAmount, color: '#f59e0b' }
  ];

  const styles = {
    chartContainer: { 
      background: 'white', 
      borderRadius: '16px', 
      padding: '32px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      marginTop: '24px',
      minHeight: '500px',
      width: '100%'
    },
    chartTitle: { 
      fontSize: '24px', 
      fontWeight: '700', 
      color: '#1f2937', 
      marginBottom: '24px', 
      textAlign: 'center' 
    },
    chartContent: { 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '32px',
      height: '100%'
    },
    chartWrapper: {
      width: '100%',
      height: '400px',
      minHeight: '400px',
      minWidth: '400px'
    },
    chartLegendDetails: { 
      display: 'flex', 
      gap: '32px', 
      justifyContent: 'center', 
      flexWrap: 'wrap' 
    },
    legendItem: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px' 
    },
    legendColor: { 
      width: '16px', 
      height: '16px', 
      borderRadius: '4px' 
    },
    legendLabel: { 
      fontSize: '14px', 
      color: '#6b7280', 
      marginBottom: '4px' 
    },
    legendValue: { 
      fontSize: '18px', 
      fontWeight: '700', 
      color: '#1f2937' 
    }
  };

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>Monetary Donations Overview</h3>
      <div style={styles.chartContent}>
        <div style={styles.chartWrapper}>
          {/* ADD minWidth and minHeight to ResponsiveContainer */}
          <ResponsiveContainer width="100%" height="100%" minWidth={400} minHeight={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `LKR ${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.chartLegendDetails}>
          <div style={styles.legendItem}>
            <div style={{...styles.legendColor, backgroundColor: '#10b981'}}></div>
            <div>
              <p style={styles.legendLabel}>Sent Out</p>
              <p style={styles.legendValue}>LKR {sentAmount.toLocaleString()}</p>
            </div>
          </div>
          <div style={styles.legendItem}>
            <div style={{...styles.legendColor, backgroundColor: '#f59e0b'}}></div>
            <div>
              <p style={styles.legendLabel}>Pending/Active</p>
              <p style={styles.legendValue}>LKR {pendingAmount.toLocaleString()}</p>
            </div>
          </div>
          <div style={styles.legendItem}>
            <div style={{...styles.legendColor, backgroundColor: '#8b5cf6'}}></div>
            <div>
              <p style={styles.legendLabel}>Total Received</p>
              <p style={styles.legendValue}>LKR {totalReceived.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonetaryPieChart;