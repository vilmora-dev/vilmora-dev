import { useState, useEffect } from 'react'

/* Rotating quote card */
const quotes = [
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  // { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  // { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
]

const QuoteCard = () => {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % quotes.length)
        setVisible(true)
      }, 1000)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const { text, author } = quotes[index]

  return (
    <div
      className="mt-6 rounded-lg border border-border bg-surface p-6"
      style={{ borderLeft: '3px solid var(--color-accent)' }}
    >
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 1000ms ease' }}>
        <p className="mb-3 text-base leading-relaxed text-primary" style={{ fontStyle: 'italic' }}>
          "{text}"
        </p>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          — {author}
        </p>
      </div>
    </div>
  )
}

/* Shared input/textarea classes */
const inputCls =
  'w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50'

const Contact = () => {
  const [status, setStatus] = useState('idle') // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('https://my-backend.morales-tech.net/send-email-git', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
      setTimeout(() => { setStatus('idle'); setErrorMessage('') }, 5000)
    }
  }

  const disabled = status === 'submitting'

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="relative z-10 w-full max-w-2xl">

        {/* Section label */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Contact
        </p>

        <h2 className="mb-3 text-3xl font-bold text-primary">
          Let's talk
        </h2>

        <p className="mb-8 text-base text-secondary">
          Have a project in mind or want to talk about an opportunity? Send a message and I'll
          get back to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border border-border bg-surface p-6"
        >
          {/* Name + Email row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-xs font-medium text-secondary">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={disabled}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-medium text-secondary">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={disabled}
                className={inputCls}
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="mb-1 block text-xs font-medium text-secondary">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              autoComplete="off"
              value={formData.subject}
              onChange={handleChange}
              disabled={disabled}
              className={inputCls}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-1 block text-xs font-medium text-secondary">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              autoComplete="off"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={disabled}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Submit + feedback */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={disabled}
              className="w-fit rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg opacity-100 transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'sent' && (
              <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <span className="block font-medium">Message sent!</span>
                <span className="block">I'll get back to you soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                <span className="block font-medium">Something went wrong.</span>
                <span className="block">{errorMessage || 'Please try again.'}</span>
              </div>
            )}
          </div>
        </form>
        
        <QuoteCard />
      </div>
    </section>
  )
}

export default Contact
