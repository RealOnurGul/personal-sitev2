// // File: src/components/ContactWidget.js
// import React, { useState, useEffect } from 'react';
// import emailjs from 'emailjs-com'; // npm install emailjs-com
// import './ContactWidget.css';

// const ContactWidget = ({ show, close }) => {
//   // Fields for your form
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     company: '',
//     jobTitle: '',
//     industry: '',
//     country: '',
//     message: ''
//   });

//   // Error state for each field
//   const [errors, setErrors] = useState({});
//   // If submission is successful, show a success message
//   const [success, setSuccess] = useState(false);

//   // Lock/unlock scroll
//   useEffect(() => {
//     if (show) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//       // Reset form on close if desired
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         company: '',
//         jobTitle: '',
//         industry: '',
//         country: '',
//         message: ''
//       });
//       setErrors({});
//       setSuccess(false);
//     }
//   }, [show]);

//   // Update local form state
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear error for this field as user types
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   // Expand textarea as user types
//   const handleMessageChange = (e) => {
//     handleChange(e);
//     e.target.style.height = 'auto';
//     e.target.style.height = e.target.scrollHeight + 'px';
//   };

//   // Validate required fields
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.firstName.trim()) newErrors.firstName = 'This field is required';
//     if (!formData.lastName.trim()) newErrors.lastName = 'This field is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'This field is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email address';
//     }
//     if (!formData.industry) newErrors.industry = 'This field is required';
//     if (!formData.country) newErrors.country = 'This field is required';
//     if (!formData.message.trim()) newErrors.message = 'This field is required';
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Clear success message if re-submitting
//     setSuccess(false);

//     // Check for errors
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // If no errors, send with EmailJS
//     // Replace with your actual service/template/public keys
//     const SERVICE_ID = 'YOUR_SERVICE_ID';
//     const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
//     const USER_ID = 'YOUR_PUBLIC_KEY';

//     emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, USER_ID)
//       .then(() => {
//         // Show success message
//         setSuccess(true);
//         // Clear form fields if you want
//         setFormData({
//           firstName: '',
//           lastName: '',
//           email: '',
//           phone: '',
//           company: '',
//           jobTitle: '',
//           industry: '',
//           country: '',
//           message: ''
//         });
//       })
//       .catch((err) => {
//         console.error('EmailJS error:', err);
//         // Optionally show an error message
//       });
//   };

//   return (
//     <div className={`contact-widget ${show ? 'show' : ''}`}>
//       <div className="contact-widget-panel">
//         <button className="contact-widget-close" onClick={close}>
//           Close
//         </button>

//         {/* If there's any field error, show a top-level error prompt */}
//         {Object.keys(errors).length > 0 && (
//           <div className="top-level-error">
//             Please correct the errors below
//           </div>
//         )}

//         {success && (
//           <div className="success-message">
//             Your email has been sent!
//           </div>
//         )}

//         <h2>Contact Me</h2>
//         <form onSubmit={handleSubmit} className="contact-widget-form">
//           {/* First Name */}
//           <div className="form-box">
//             <label>
//               First Name <span className="required-star">*</span>
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className={errors.firstName ? 'error' : ''}
//             />
//             {errors.firstName && (
//               <div className="error-message">{errors.firstName}</div>
//             )}
//           </div>

//           {/* Last Name */}
//           <div className="form-box">
//             <label>
//               Last Name <span className="required-star">*</span>
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className={errors.lastName ? 'error' : ''}
//             />
//             {errors.lastName && (
//               <div className="error-message">{errors.lastName}</div>
//             )}
//           </div>

//           {/* Email */}
//           <div className="form-box">
//             <label>
//               Email <span className="required-star">*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={errors.email ? 'error' : ''}
//             />
//             {errors.email && (
//               <div className="error-message">{errors.email}</div>
//             )}
//           </div>

//           {/* Phone */}
//           <div className="form-box">
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Company Name */}
//           <div className="form-box">
//             <label>Company Name</label>
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Job Title */}
//           <div className="form-box">
//             <label>Job Title</label>
//             <input
//               type="text"
//               name="jobTitle"
//               value={formData.jobTitle}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Industry */}
//           <div className="form-box">
//             <label>
//               Select Industry <span className="required-star">*</span>
//             </label>
//             <select
//               name="industry"
//               value={formData.industry}
//               onChange={handleChange}
//               className={errors.industry ? 'error' : ''}
//             >
//               <option value="">-- Select an industry --</option>
//               <option value="Finance">Finance</option>
//               <option value="Technology">Technology</option>
//               <option value="Healthcare">Healthcare</option>
//               <option value="Education">Education</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.industry && (
//               <div className="error-message">{errors.industry}</div>
//             )}
//           </div>

//           {/* Country */}
//           <div className="form-box">
//             <label>
//               Select Country <span className="required-star">*</span>
//             </label>
//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               className={errors.country ? 'error' : ''}
//             >
//               <option value="">-- Select a country --</option>
//               <option value="USA">USA</option>
//               <option value="Canada">Canada</option>
//               <option value="UK">UK</option>
//               <option value="Australia">Australia</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.country && (
//               <div className="error-message">{errors.country}</div>
//             )}
//           </div>

//           {/* Message */}
//           <div className="form-box">
//             <label>
//               Message <span className="required-star">*</span>
//             </label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleMessageChange}
//               className={errors.message ? 'error' : ''}
//             />
//             {errors.message && (
//               <div className="error-message">{errors.message}</div>
//             )}
//           </div>

//           <button type="submit" className="submit-button">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactWidget;
