"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // honeypot, hidden from visitors
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "", website: "" })
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        })
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      {/* Status Message: the wrapper is always rendered so screen readers announce updates */}
      <div aria-live="polite" aria-atomic="true">
        {submitStatus.type && (
          <div
            role={submitStatus.type === "error" ? "alert" : "status"}
            className={`mb-6 p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} aria-busy={isSubmitting} className="space-y-6">
        {/* Honeypot: off-screen and skipped by keyboard/screen readers; only bots fill it in */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm text-muted mb-2">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-muted mb-2">
            Your email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="john.doe@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm text-muted mb-2">
            How can I help?
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            rows={6}
            className="w-full px-4 py-3 rounded-lg resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Tell me a little about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit ml-auto px-6 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div aria-hidden="true" className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              <span>Send message</span>
            </>
          )}
        </button>
      </form>
    </>
  )
}
