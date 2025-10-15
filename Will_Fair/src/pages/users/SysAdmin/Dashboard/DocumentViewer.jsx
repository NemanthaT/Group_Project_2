

const DocumentViewer = ({ show, onClose, docs }) => {
  if (!show) return null;
  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={{...styles.modalContent, maxWidth: '600px'}} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{docs.title}</h2>
          <button style={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.documentList}>
            {docs.docs.map((d, i) => (
              <div key={i} style={styles.documentItem}>
                <FileText size={20} />
                <span style={styles.docName}>{d}</span>
                <button style={styles.btnIcon}><Eye size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;