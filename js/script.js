document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // MOBILE NAVIGATION
    // ================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        // Close menu when a navigation link is clicked
        const navigationItems =
            document.querySelectorAll(".nav-links a");

        navigationItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    // ================================
    // CONTACT FORM
    // ================================

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            // Remove previous messages
            const oldMessage =
                contactForm.querySelector(".form-message");

            if (oldMessage) {
                oldMessage.remove();
            }


            // Change button while sending
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";


            const formData =
                new FormData(contactForm);


            try {

                const response = await fetch(
                    contactForm.action,
                    {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (response.ok) {

                    // Clear the form
                    contactForm.reset();


                    // Create success message
                    const successMessage =
                        document.createElement("div");

                    successMessage.className =
                        "form-message success";

                    successMessage.textContent =
                        "✓ Message sent successfully! Thank you for contacting me.";


                    contactForm.prepend(
                        successMessage
                    );


                    // Restore button
                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Message";


                } else {

                    throw new Error(
                        "Form submission failed."
                    );

                }


            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                // Create error message
                const errorMessage =
                    document.createElement("div");

                errorMessage.className =
                    "form-message error";

                errorMessage.textContent =
                    "✕ Something went wrong. Please try again or email me directly.";


                contactForm.prepend(
                    errorMessage
                );


                // Restore button
                submitButton.disabled = false;

                submitButton.textContent =
                    "Send Message";

            }

        });

    }

});