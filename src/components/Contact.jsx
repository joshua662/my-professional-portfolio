import React, { useState } from "react";

export default function Contact() {
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
      form.subject
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
    <section id="contact" className="section-muted">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="section-heading animate-fade-in-up">
          <h2>Contact Me</h2>
          <span />
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+63 900 000 0000"
                  className="form-input"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Inquiry / Collaboration"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="7"
                  placeholder="Write your message here..."
                  required
                  className="form-input resize-none"
                />
              </div>

              {formMessage && (
                <div
                  className={`my-3 p-3.5 rounded-xl border text-xs font-semibold animate-fade-in-up ${
                    formMessage.type === "success"
                      ? "border-green-300 bg-green-50 text-gray-800"
                      : "border-red-300 bg-red-50 text-red-800"
                  }`}
                >
                  {formMessage.text}
                </div>
              )}

              <button type="submit" className="button-primary mt-4 gap-2 self-end group">
                <i className="fas fa-paper-plane transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
