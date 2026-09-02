const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll(".mobile-dropdown-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const dropdown = this.closest(".mobile-dropdown");
    const content = dropdown.querySelector(".mobile-dropdown-content");
    const icon = dropdown.querySelector(".mobile-dropdown-icon");

    content.classList.toggle("hidden");
    icon.classList.toggle("rotate-180");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#" || href === "") {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (window.innerWidth < 768) {
        mobileMenu.classList.add("hidden");
        document
          .querySelectorAll(".mobile-dropdown-content")
          .forEach((dropdown) => {
            dropdown.classList.add("hidden");
          });
        document.querySelectorAll(".mobile-dropdown-icon").forEach((icon) => {
          icon.classList.remove("rotate-180");
        });
      }
    } else {
      console.warn("Target not found:", href);
    }
  });
});

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {
  let current = "";
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-green-500", "font-semibold");
    link.classList.add("text-gray-700");
    const href = link.getAttribute("href");
    if (href && href.includes(current)) {
      link.classList.remove("text-gray-700");
      link.classList.add("text-green-500", "font-semibold");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

document.addEventListener("click", function (event) {
  if (!event.target.closest(".group")) {
  }
});

// ===== Project & Certificate Modals =====

let activeModalId = null;
let suppressOverlayClose = false;

function getModalElements(modalId) {
  return {
    modal: document.getElementById(`${modalId}-modal`),
    modalContent: document.getElementById(`${modalId}-modal-content`),
  };
}

function resetModalContent(modalContent) {
  if (!modalContent) return;
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");
}

function showModalContent(modalContent) {
  if (!modalContent) return;
  modalContent.classList.remove("scale-95", "opacity-0");
  modalContent.classList.add("scale-100", "opacity-100");
}

function closeAllVisibleModals(exceptModalId = null) {
  document.querySelectorAll(".portfolio-modal").forEach((modal) => {
    const modalId = modal.id.replace(/-modal$/, "");
    if (exceptModalId && modalId === exceptModalId) return;
    if (modal.classList.contains("hidden")) return;

    const modalContent = modal.querySelector("[id$='-modal-content']");
    modal.classList.add("hidden");
    modal.classList.remove("flex", "modal-open", "modal-closing");
    resetModalContent(modalContent);
  });

  if (!document.querySelector(".portfolio-modal:not(.hidden)")) {
    document.body.style.overflow = "";
  }
}

/**
 * Opens a modal by ID.
 * @param {string} modalId - The modal identifier (e.g., 'cert-1', 'project-1').
 */
function openModal(modalId) {
  if (!modalId) return;

  if (activeModalId && activeModalId !== modalId) {
    closeModal(activeModalId, true);
  }

  closeAllVisibleModals(modalId);

  const { modal, modalContent } = getModalElements(modalId);
  if (!modal) return;

  suppressOverlayClose = true;
  // Ensure initial hidden state is reset and initial scaled down styles apply
  resetModalContent(modalContent);
  modal.classList.remove("hidden", "modal-closing");
  modal.classList.add("flex");

  // Force reflow so transition starts smoothly
  void modal.offsetWidth;

  requestAnimationFrame(() => {
    modal.classList.add("modal-open");
    showModalContent(modalContent);
  });

  document.body.style.overflow = "hidden";
  activeModalId = modalId;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      suppressOverlayClose = false;
    });
  });
}

/**
 * Closes a modal by ID.
 * @param {string} modalId - The modal identifier (e.g., 'cert-1', 'project-1').
 * @param {boolean} immediate - Skip the close animation.
 */
function closeModal(modalId, immediate = false) {
  const { modal, modalContent } = getModalElements(modalId);
  if (!modal) return;

  const finishClose = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    modal.classList.remove("modal-open", "modal-closing");
    resetModalContent(modalContent);

    if (activeModalId === modalId) {
      activeModalId = null;
    }

    if (!document.querySelector(".portfolio-modal:not(.hidden)")) {
      document.body.style.overflow = "";
    }
  };

  if (immediate) {
    finishClose();
    return;
  }

  modal.classList.remove("modal-open");
  modal.classList.add("modal-closing");
  resetModalContent(modalContent);
  setTimeout(finishClose, 250);
}

function closeActiveModal() {
  if (activeModalId) {
    closeModal(activeModalId);
  }
}

/**
 * Initialize modal event listeners
 * This function can be called multiple times (after modals are loaded)
 */
function initializeModalListeners() {
  // Remove existing listeners to prevent duplicates
  // by using event delegation at the document level

  // Click event for modal cards (delegation)
  document.addEventListener("click", function (e) {
    // Check if click target or any parent has modal data attributes
    const card = e.target.closest(
      "[data-cert-modal], [data-project-modal], [data-skill-modal]",
    );

    if (!card) return;

    // Prevent opening modal from buttons, links, or videos within the card
    const clickedButton = e.target.closest("button");
    if (
      e.target.closest("a") ||
      e.target.closest("video") ||
      (clickedButton && clickedButton !== card)
    ) {
      return;
    }

    const modalId =
      card.getAttribute("data-cert-modal") ||
      card.getAttribute("data-project-modal") ||
      card.getAttribute("data-skill-modal");

    if (modalId) {
      e.preventDefault();
      e.stopPropagation();
      openModal(modalId);
    }
  });

  // Close button event listeners (delegation)
  document.addEventListener("click", function (e) {
    const closeBtn = e.target.closest("[data-close-modal]");
    if (!closeBtn) return;

    e.preventDefault();
    e.stopPropagation();
    const modalId = closeBtn.getAttribute("data-close-modal");
    if (modalId) {
      closeModal(modalId);
    }
  });

  // Modal overlay click (delegation)
  document.addEventListener("click", function (e) {
    if (suppressOverlayClose) return;

    // Check if click is directly on a portfolio modal (not its children)
    const modal = e.target.closest(".portfolio-modal");
    if (!modal) return;

    // Only close if clicking on the modal itself, not the content
    if (e.target === modal) {
      const modalId = modal.id.replace(/-modal$/, "");
      closeModal(modalId);
    }
  });

  // Prevent modal overlay from closing when clicking inside modal content
  document.addEventListener("click", function (e) {
    const modalContent = e.target.closest('[id$="-modal-content"]');
    if (modalContent) {
      e.stopPropagation();
    }
  });

  // Escape key handler
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  });

  console.log("Modal listeners initialized");
}

// Initialize modals when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeModalListeners();
});

// Make functions globally available for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener("DOMContentLoaded", function () {
  const emailLink = document.getElementById("email-contact-link");
  if (emailLink) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      const confirmModal = document.getElementById("mailto-confirm-modal");
      if (confirmModal) {
        confirmModal.classList.remove("hidden");
        confirmModal.classList.add("flex");
        document.body.style.overflow = "hidden";
      }
    });
  }
  const confirmBtn = document.querySelector("[data-confirm-mailto]");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      const gmailUrl =
        "https://mail.google.com/mail/?view=cm&to=joshiasimpas36@gmail.com";
      const win = window.open(gmailUrl, "_blank", "noopener");
      const confirmModal = document.getElementById("mailto-confirm-modal");
      if (confirmModal) {
        confirmModal.classList.add("hidden");
        confirmModal.classList.remove("flex");
      }
      if (!win) {
        const warningModal = document.getElementById("mailto-warning-modal");
        if (warningModal) {
          warningModal.classList.remove("hidden");
          warningModal.classList.add("flex");
          document.body.style.overflow = "hidden";
        }
      } else {
        document.body.style.overflow = "";
      }
    });
  }
  const closeConfirmBtn = document.querySelector("[data-close-mailto-confirm]");
  if (closeConfirmBtn) {
    closeConfirmBtn.addEventListener("click", function () {
      const confirmModal = document.getElementById("mailto-confirm-modal");
      if (confirmModal) {
        confirmModal.classList.add("hidden");
        confirmModal.classList.remove("flex");
        document.body.style.overflow = "";
      }
    });
  }
  const closeBtn = document.querySelector("[data-close-mailto-modal]");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      const modal = document.getElementById("mailto-warning-modal");
      if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "";
      }
    });
  }
  const modalOverlay = document.getElementById("mailto-warning-modal");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.add("hidden");
        modalOverlay.classList.remove("flex");
        document.body.style.overflow = "";
      }
    });
  }
  const confirmOverlay = document.getElementById("mailto-confirm-modal");
  if (confirmOverlay) {
    confirmOverlay.addEventListener("click", function (e) {
      if (e.target === confirmOverlay) {
        confirmOverlay.classList.add("hidden");
        confirmOverlay.classList.remove("flex");
        document.body.style.overflow = "";
      }
    });
  }
});

// ===== Contact Form Handler =====
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const btnLoading = document.getElementById("btn-loading");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validate required fields
      if (!name || !email || !subject || !message) {
        showMessage("Please fill in all required fields.", "error");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      btnText.classList.add("hidden");
      btnLoading.classList.remove("hidden");

      try {
        // Create mailto link as fallback (works without backend)
        const phoneText = phone ? `Phone: ${phone}\n` : "";
        const mailtoBody = encodeURIComponent(
          `Name: ${name}\n` +
            `Email: ${email}\n` +
            phoneText +
            `\nMessage:\n${message}`,
        );
        const mailtoLink = `mailto:joshiasimpas36@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

        // Try to open email client
        window.location.href = mailtoLink;

        // Show success message after a short delay
        setTimeout(() => {
          showMessage(
            "Thank you! Your email client should open. If not, please send your message to joshiasimpas36@gmail.com",
            "success",
          );
          contactForm.reset();
          resetButton();
        }, 500);
      } catch (error) {
        console.error("Error sending message:", error);
        showMessage(
          "There was an error. Please email me directly at joshiasimpas36@gmail.com",
          "error",
        );
        resetButton();
      }
    });
  }

  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.classList.remove("hidden");

    if (type === "success") {
      formMessage.className =
        "mb-4 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300";
    } else {
      formMessage.className =
        "mb-4 p-4 rounded-lg bg-red-100 text-red-800 border border-red-300";
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
      formMessage.classList.add("hidden");
    }, 5000);
  }

  function resetButton() {
    submitBtn.disabled = false;
    btnText.classList.remove("hidden");
    btnLoading.classList.add("hidden");
  }

  // Typewriter Effect under Name
  const typingRoleEl = document.getElementById("typing-role");
  if (typingRoleEl) {
    const roles = [
      "Frontend Web Developer",
      "App Developer",
      "UI / UX Designer",
      "Backend Developer",
      "Student",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 1600;
    const pauseBeforeNext = 400;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingRoleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingRoleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = pauseBeforeDelete;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = pauseBeforeNext;
      }

      setTimeout(typeLoop, timeout);
    }

    typeLoop();
  }
});
