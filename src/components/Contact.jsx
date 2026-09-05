import React, { useState } from "react";
import GooeyTextReveal from "./GooeyTextReveal";
import GooeyElementReveal from "./GooeyElementReveal";

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setFormMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      "",
      `Message:`,
      form.message,
    ].filter(Boolean);

    const mailtoUrl = `mailto:joshiasimpas36@gmail.com?subject=${encodeURIComponent(
      form.subject,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailtoUrl;

    setFormMessage({
      type: "success",
      text: "Opening your default email application... If it doesn't open, please email joshiasimpas36@gmail.com directly.",
    });

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="section-muted py-12 md:py-16 min-h-screen flex flex-col justify-center"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <GooeyElementReveal
          mode="scroll"
          delay={0.1}
          yFrom={30}
          blurAmount={12}
        >
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Column: Headline, Pitch, and Social Links */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* System Online Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 text-[11px] font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 w-fit mb-8 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SYSTEM ONLINE</span>
              </div>

              {/* Massive Headline */}
              <GooeyTextReveal mode="scroll" start="top 85%">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.08] mb-6">
                  Let's
                  <br />
                  Collaborate.
                </h2>
              </GooeyTextReveal>

              {/* Paragraph Text */}
              <GooeyTextReveal mode="scroll" delay={0.1}>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl font-normal mb-10">
                  Ready to engineer the next big thing? Whether it's a complex
                  embedded system or a modern web application, let's build it
                  together.
                </p>
              </GooeyTextReveal>

              {/* Social Links */}
              <div className="flex items-center gap-6 font-mono text-sm font-bold text-gray-700 dark:text-gray-300">
                <a
                  href="https://github.com/joshua662"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <i className="fab fa-github text-lg" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <i className="fab fa-linkedin text-lg" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Column: Contact Details Card (matching screenshot) / Form Toggle */}
            <div className="lg:col-span-5">
              <div className="rounded-[2.5rem] bg-white dark:bg-black border border-gray-200/90 dark:border-gray-800 p-8 sm:p-10 shadow-xl dark:shadow-black/40 transition-all duration-300">
                {!showForm ? (
                  /* Standard Contact Details Card View */
                  <>
                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800 pb-4 mb-8">
                      CONTACT DETAILS
                    </h3>

                    <div className="space-y-6">
                      {/* Email */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                          <i className="far fa-envelope text-lg" />
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            EMAIL ADDRESS
                          </span>
                          <a
                            href="mailto:joshiasimpas36@gmail.com"
                            className="text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:underline transition-all break-all"
                          >
                            joshiasimpas36@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                          <i className="fas fa-phone-alt text-base" />
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            PHONE NUMBER
                          </span>
                          <a
                            href="tel:+639666504091"
                            className="text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:underline transition-all"
                          >
                            +639666504091
                          </a>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                          <i className="fas fa-location-dot text-base" />
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            BASED IN
                          </span>
                          <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                            Quezon City
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Send Message CTA Button */}
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-black dark:bg-white px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white dark:text-gray-900 shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>SEND MESSAGE</span>
                      <i className="fas fa-arrow-right text-xs" />
                    </button>
                  </>
                ) : (
                  /* Form View */
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                        SEND A MESSAGE
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="text-xs font-mono font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        ← BACK
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                          Your Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                          Subject *
                        </label>
                        <input
                          name="subject"
                          type="text"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Inquiry / Project"
                          required
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows="3"
                          placeholder="Write message..."
                          required
                          className="form-input resize-none"
                        />
                      </div>

                      {formMessage && (
                        <div
                          className={`p-3 rounded-xl border text-xs font-semibold animate-fade-in ${
                            formMessage.type === "success"
                              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                              : "border-red-300 bg-red-50 text-red-900"
                          }`}
                        >
                          {formMessage.text}
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-black dark:bg-white px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-white dark:text-gray-900 shadow-md hover:opacity-90 transition-all cursor-pointer"
                      >
                        <i className="fas fa-paper-plane text-xs" />
                        <span>SUBMIT MESSAGE</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </GooeyElementReveal>
      </div>
    </section>
  );
}
