/**
 * modals-loader.js
 * Loads and injects modals from modals.html into the page
 * and initializes modal event listeners
 */

async function loadModals() {
  try {
    const response = await fetch("modals.html");
    if (!response.ok) throw new Error("Failed to load modals.html");

    const modalsHTML = await response.text();

    // Create a container for modals
    const modalsContainer = document.createElement("div");
    modalsContainer.id = "modals-container";
    modalsContainer.innerHTML = modalsHTML;

    // Insert before the closing body tag
    document.body.appendChild(modalsContainer);

    console.log("Modals loaded successfully");

    // Initialize modal event listeners after modals are loaded
    if (typeof initializeModalListeners === "function") {
      initializeModalListeners();
    }
  } catch (error) {
    console.error("Error loading modals:", error);
  }
}

// Load modals when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadModals);
} else {
  loadModals();
}
