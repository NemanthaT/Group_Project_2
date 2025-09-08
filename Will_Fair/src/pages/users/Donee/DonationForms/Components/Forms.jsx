import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MonetaryForm({ user }) {
  const [activeTab, setActiveTab] = useState("monetary");

  // Define the support options data for easy maintenance
  const supportOptions = [
    { id: "monetary", label: "Monetary Support" },
    { id: "non-monetary", label: "Non Monetary Support" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [documentFiles, setDocumentFiles] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Non-monetary form fields
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  // Bank details fields
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");

  const [monetaryCategories, setMonetaryCategories] = useState([]);
  const [nonMonetaryCategories, setNonMonetaryCategories] = useState([]);

  const [targetAmount, setTargetAmount] = useState("");

  //get the categeories from the backend
  React.useEffect(() => {
    const fetchMonetaryCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/donations/monetaryCategories"
        );
        setMonetaryCategories(response.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setMonetaryCategories([]);
      }
    };
    fetchMonetaryCategories();
  }, []);

  React.useEffect(() => {
    const fetchNonMonetaryCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/donations/nonMonetaryCategories"
        );
        setNonMonetaryCategories(response.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setNonMonetaryCategories([]);
      }
    };
    fetchNonMonetaryCategories();
  }, []);

  const categories =
    activeTab === "monetary" ? monetaryCategories : nonMonetaryCategories;

  //subitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Require at least one proof document to be uploaded
    if (documentFiles.length === 0) {
      toast.error('Please upload a proof document (PDF).');
      return;
    }

    let formData = new FormData();
    formData.append("doneeId", user.id);
    formData.append("category", selectedCategory);
    formData.append(
      "description",
      e.target.querySelector(
        'textarea[placeholder="Explain your situation, who will benefit, and how the donation will be used..."]'
      ).value
    );
    formData.append(
      "requestName",
      e.target.querySelector('input[placeholder="Enter reason for request"]')
        .value
    );

    if (activeTab === "monetary") {
      formData.append("targetAmount", targetAmount);
      formData.append(
        "urgentDate",
        e.target.querySelector('input[type="date"]').value
      );
      formData.append("bankName", bankName);
      formData.append("accountNumber", accountNumber);
    } else {
      formData.append("itemName", itemName);
      formData.append("itemQuantity", itemQuantity);
      formData.append(
        "dropoffDate",
        e.target.querySelector('input[type="date"]').value
      );
    }

    // Append image file (single) if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    documentFiles.forEach((file) => formData.append("documents", file));
    console.log("Form Data:", formData);

    try {
      const url =
        activeTab === "monetary"
          ? "http://localhost:5000/donations/createMonDonation"
          : "http://localhost:5000/donations/createNonMonDonation";
      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Request submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit request. Please try again.");
    }
  };

  // Document upload handler (PDF only)
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    // Filter for PDFs only
    const pdfFiles = files.filter((file) => file.type === "application/pdf");
    setDocumentFiles([...documentFiles, ...pdfFiles]);
  };

  // Image upload handler (single image)
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Basic image type validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file for the request image.');
      return;
    }
    setImageFile(file);
    // Create preview URL
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setImageFile(null);
  };

  const removeDocument = (index) => {
    const updatedFiles = [...documentFiles];
    updatedFiles.splice(index, 1);
    setDocumentFiles(updatedFiles);
  };

  const sriLankanBanks = [
    "Bank of Ceylon",
    "People's Bank",
    "Commercial Bank of Ceylon",
    "Hatton National Bank",
    "Sampath Bank",
    "National Development Bank",
    "DFCC Bank",
    "Seylan Bank",
  ];

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="flex flex-col w-full">
        <div className="hero-section">
          <div className="hero-bg">
            <img
              className="hero-image"
              alt="Close up people"
              src="http://localhost:5173/src/assets/images/featuredBg.png"
            />
          </div>

          <div className="hero-content">
            <h1 className="hero-title">Submit Donation Request</h1>
            <p className="hero-subtitle">
              Connect with generous donors who wants to help your cause
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-card">
            {/* Instruction Text */}
            <div className="instruction-text">
              <p>
                Submit your donation request with detailed information about
                what you need. Once approved, your request will be visible to
                potential donors.
              </p>
            </div>

            <div className="support-tabs">
              <div className="tabs-list">
                {supportOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`tab-trigger ${
                      activeTab === option.id ? "active" : "inactive"
                    }`}
                    onClick={() => setActiveTab(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <section className="form-section">
              <h2 className="title">Category</h2>

              <div className="select-wrapper">
                <div
                  className="select-trigger"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span>{selectedCategory || "Select a category"}</span>
                  <svg
                    className="chevron-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>

                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      border: "0.5px solid rgba(0, 0, 0, 0.2)",
                      borderRadius: "15px",
                      boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
                      zIndex: 10,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "16px 40px",
                          cursor: "pointer",
                          fontSize: "24px",
                          borderBottom:
                            index < categories.length - 1
                              ? "1px solid rgba(0, 0, 0, 0.1)"
                              : "none",
                        }}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpen(false);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f5f5f5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "white";
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <div className="form-section">
              <div className="mb-4">
                <h2 className="title">Reason for Request</h2>
              </div>

              <div className="form-card">
                <input
                  className="form-input"
                  placeholder="Enter reason for request"
                />
              </div>
            </div>

            <div className="form-section">
              <div className="mb-4">
                <h2 className="title">Detailed Description</h2>
              </div>

              <div className="form-card">
                <textarea
                  className="form-textarea"
                  placeholder="Explain your situation, who will benefit, and how the donation will be used..."
                  rows={6}
                />
              </div>
            </div>

            {activeTab === "monetary" ? (
              <>
                <section className="form-section">
                  <h2 className="title">Target Amount</h2>
                  <div className="form-card">
                    <div className="amount-wrapper">
                      <span className="currency-symbol">Rs.</span>
                      <input
                        className="form-input amount-input"
                        aria-label="Target amount in Rupees"
                        placeholder="0"
                        style={{ paddingLeft: "60px" }}
                        value={targetAmount}
                        onChange={(e) => {
                          // Remove all non-digit characters
                          const value = e.target.value.replace(/\D/g, "");
                          setTargetAmount(value);
                        }}
                        type="text" // Using type="text" to have full control over input
                        inputMode="numeric" // Shows numeric keyboard on mobile devices
                        pattern="[0-9]*" // Helps with numeric keyboard on some devices
                      />
                    </div>
                  </div>
                </section>

                <section className="form-section">
                  <h2 className="title">Bank Account Details</h2>

                  <div className="form-card">
                    <select
                      className="form-input"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      required
                    >
                      <option value="">Select your bank</option>
                      {sriLankanBanks.map((bank, index) => (
                        <option key={index} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    className="form-card bank-detail"
                    style={{ marginTop: "16px" }}
                  >
                    <input
                      className="form-input"
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      required
                      type="number"
                    />
                  </div>
                </section>

                <section className="form-section">
                  <h2 className="title">Urgent need date (optional)</h2>

                  <div className="form-card">
                    <div className="date-wrapper">
                      <input
                        className="date-input"
                        placeholder="DD/MM/YYYY"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="form-section">
                  <h2 className="title">Item Name</h2>
                  <div className="form-card">
                    <input
                      className="form-input"
                      placeholder="Enter item name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  </div>
                </section>

                <section className="form-section">
                  <h2 className="title">Item Quantity</h2>
                  <div className="form-card">
                    <input
                      className="form-input"
                      placeholder="Enter quantity needed"
                      type="number"
                      min="1"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(e.target.value)}
                    />
                  </div>
                </section>

                <section className="form-section">
                  <h2 className="title">Dropoff Date</h2>
                  <div className="form-card">
                    <div className="date-wrapper">
                      <input
                        className="date-input"
                        placeholder="DD/MM/YYYY"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </div>
                </section>
              </>
            )}

            <section className="form-section">
              <h2 className="title">Request Image (optional)</h2>

              <div className="image-upload-card">
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="imageUpload" className="choose-file-button">
                  {imageFile ? 'Change image' : 'Choose file'}
                </label>
                <div style={{ marginTop: 12 }}>
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="preview" style={{ maxWidth: 300, borderRadius: 8 }} />
                      <div>
                        <button type="button" className="remove-document-button" onClick={removeImage}>
                          Remove Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: 'rgba(0,0,0,0.6)' }}>No image selected</span>
                  )}
                </div>
              </div>
            </section>

            <div className="form-section">
              <section className="file-upload-section">
                <div className="file-upload-header">
                  <h1 className="title">Proof Documents</h1>
                  <input
                    type="file"
                    id="documentUpload"
                    accept=".pdf"
                    onChange={handleDocumentUpload}
                    multiple
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="documentUpload"
                    className="choose-files-button"
                  >
                    Choose files
                  </label>
                </div>
                <div className="file-display">
                  {documentFiles.length > 0 ? (
                    <div className="document-list">
                      {documentFiles.map((file, index) => (
                        <div key={index} className="document-item">
                          <span>{file.name}</span>
                          <button
                            onClick={() => removeDocument(index)}
                            className="remove-document-button"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span>No documents selected</span>
                  )}
                </div>
              </section>

              <p
                className="mt-4"
                style={{
                  fontSize: "26px",
                  fontWeight: "200",
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                Upload&nbsp;&nbsp;PDF document/s as proof for your request
                (medical reports, school documents, etc.). PDF only, max 5MB.
              </p>
            </div>

            {/* Create Request Button */}
            <div className="create-request-wrapper">
              <button className="create-request-button" type="submit">
                Create Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
