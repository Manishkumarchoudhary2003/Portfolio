


import React, { useRef, useState } from "react";
import styles from "./Contact.module.css";
import contactlogo from "../../assets/contact.png";
import emailjs, { send } from "@emailjs/browser"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_0p7j6uq', 'template_1y0fxp8', form.current, 'IMVKX8RBjNb8nOTwo')
      .then((result) => {
          console.log(result.text);
          showSuccess();
          e.target.reset();
      }, (error) => {
          console.log(error.text);
      });
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newFormErrors = { ...formErrors };

    if (!formData.name.trim()) {
      newFormErrors.name = "Name is required";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newFormErrors.name = "Invalid Name";
      valid = false;
    } else {
      newFormErrors.name = "";
    }

    if (!formData.email.trim()) {
      newFormErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@gmail\.com$/.test(formData.email)) {
      newFormErrors.email = "Invalid email format";
      valid = false;
    } else {
      newFormErrors.email = "";
    }

    if (!formData.phone.trim()) {
      newFormErrors.phone = "Phone is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newFormErrors.phone = "Invalid phone number";
      valid = false;
    } else {
      newFormErrors.phone = "";
    }

    if (!formData.message.trim()) {
      newFormErrors.message = "Message is required";
      valid = false;
    } else {
      newFormErrors.message = "";
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Manish");

    if (validateForm()) {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        const response = await fetch(
          "https://laptop-galaxy-project-default-rtdb.firebaseio.com/Contact.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message,
              submissionDate: formattedDate,
            }),
          }
        );

        if (response.ok) {
          sendEmail(e);
          showSuccess();
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          console.error(
            "Failed to send data to Firebase. Server returned:",
            response
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className={styles.headingcover} id="contact">
      <h1 className={styles.heading}>🌐Get In Touch </h1>

      <div className={styles.contact}>
        <div className={styles.column}>
          <img src={contactlogo} alt="Contact" className={styles.image} />
        </div>
        <div className={styles.column}>
          {showSuccessMessage && (
            <div className={styles.successMessage}>Successfully Submitted!</div>
          )}
          <form ref={form} onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name 👤"
            />
            {formErrors.name && (
              <span className={styles.error}>{formErrors.name}</span>
            )}

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email 📧"
            />
            {formErrors.email && (
              <span className={styles.error}>{formErrors.email}</span>
            )}

            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone 📞"
            />
            {formErrors.phone && (
              <span className={styles.error}>{formErrors.phone}</span>
            )}

            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Message 📝"
            />
            {formErrors.message && (
              <span className={styles.error}>{formErrors.message}</span>
            )}

            <button type="submit" value={send}>Submit ✈️</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;










// import React, { useRef, useState } from "react";
// import styles from "./Contact.module.css";
// import contactlogo from "../../assets/contact.png";
// import emailjs from "@emailjs/browser";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [formErrors, setFormErrors] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         'service_0p7j6uq',
//         'template_1y0fxp8',
//         form.current,
//         'IMVKX8RBjNb8nOTwo'
//       )
//       .then(
//         (result) => {
//           console.log(result.text);
//           e.target.reset();
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };

//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const showSuccess = () => {
//     setShowSuccessMessage(true);
//     setTimeout(() => {
//       setShowSuccessMessage(false);
//     }, 3000);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newFormErrors = { ...formErrors };

//     if (!formData.name.trim()) {
//       newFormErrors.name = "Name is required";
//       valid = false;
//     } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
//       newFormErrors.name = "Invalid Name";
//       valid = false;
//     } else {
//       newFormErrors.name = "";
//     }

//     if (!formData.email.trim()) {
//       newFormErrors.email = "Email is required";
//       valid = false;
//     } else if (!/^\S+@gmail\.com$/.test(formData.email)) {
//       newFormErrors.email = "Invalid email format";
//       valid = false;
//     } else {
//       newFormErrors.email = "";
//     }

//     if (!formData.phone.trim()) {
//       newFormErrors.phone = "Phone is required";
//       valid = false;
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newFormErrors.phone = "Invalid phone number";
//       valid = false;
//     } else {
//       newFormErrors.phone = "";
//     }

//     if (!formData.message.trim()) {
//       newFormErrors.message = "Message is required";
//       valid = false;
//     } else {
//       newFormErrors.message = "";
//     }

//     setFormErrors(newFormErrors);
//     return valid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       sendEmail(e);
//       showSuccess();
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         message: "",
//       });
//     }
//   };

//   return (
//     <div className={styles.headingcover} id="contact">
//       <h1 className={styles.heading}>🌐Get In Touch </h1>

//       <div className={styles.contact}>
//         <div className={styles.column}>
//           <img src={contactlogo} alt="Contact" className={styles.image} />
//         </div>
//         <div className={styles.column}>
//           {showSuccessMessage && (
//             <div className={styles.successMessage}>
//               Successfully Submitted!
//             </div>
//           )}
//           <form ref={form} onSubmit={handleSubmit} className={styles.form}>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               onChange={handleChange}
//               value={formData.name}
//               required
//               placeholder="Name 👤"
//             />
//             {formErrors.name && (
//               <span className={styles.error}>{formErrors.name}</span>
//             )}

//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               placeholder="Email 📧"
//             />
//             {formErrors.email && (
//               <span className={styles.error}>{formErrors.email}</span>
//             )}

//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               placeholder="Phone 📞"
//             />
//             {formErrors.phone && (
//               <span className={styles.error}>{formErrors.phone}</span>
//             )}

//             <textarea
//               id="message"
//               name="message"
//               rows="4"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               placeholder="Message 📝"
//             />
//             {formErrors.message && (
//               <span className={styles.error}>{formErrors.message}</span>
//             )}

//             <button type="submit">Submit ✈️</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;



