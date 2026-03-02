import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { MdMailOutline, MdPhone, MdLocationOn } from 'react-icons/md';

const contactDetails = [
  {
    icon: MdMailOutline,
    label: 'Email',
    value: 'quan.trananh12@gmail.com',
    href: 'mailto:quan.trananh12@gmail.com',
  },
  {
    icon: MdPhone,
    label: 'Phone',
    value: '0450 950 223',
    href: 'tel:0450950223',
  },
  {
    icon: MdLocationOn,
    label: 'Location',
    value: 'Greater Sydney Area, NSW',
    href: null,
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    value: 'linkedin.com/in/alan-tran-165192237',
    href: 'https://www.linkedin.com/in/alan-tran-165192237',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/quanchan',
    href: 'https://github.com/quanchan',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function ContactSection() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(`Hi Alan,\n\n${message}\n\n— ${name}`);
    const sub = encodeURIComponent(subject || '(No subject)');
    window.location.href = `mailto:quan.trananh12@gmail.com?subject=${sub}&body=${body}`;
  }

  return (
    <>
      {/* Heading */}
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Get In Touch</h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-neutral-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Open to new opportunities, collaborations, or just a good
          conversation.
        </motion.p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Left — contact details */}
        <div className="flex flex-col justify-center gap-4">
          {contactDetails.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={itemVariants}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-xl border
                    border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md
                    transition-all duration-300 hover:border-purple-400/60
                    hover:bg-white/10
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                >
                  <item.icon className="h-5 w-5 shrink-0 text-purple-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">{item.label}</p>
                    <p
                      className="truncate text-sm text-neutral-200
                        transition-colors group-hover:text-white"
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ) : (
                <div
                  className="flex items-center gap-4 rounded-xl border
                    border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md"
                >
                  <item.icon className="h-5 w-5 shrink-0 text-purple-400" />
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-500">{item.label}</p>
                    <p className="truncate text-sm text-neutral-200">
                      {item.value}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right — message form */}
        <motion.form
          onSubmit={handleSend}
          className="flex flex-col gap-4 rounded-2xl border border-white/10
            bg-white/5 p-6 backdrop-blur-md md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium text-white">Send me a message</h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-neutral-500" htmlFor="contact-name">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              className="rounded-lg border border-white/10 bg-white/5 px-4
                py-2.5 text-sm text-white placeholder-neutral-600
                transition-colors outline-none focus:border-purple-500/60
                focus:bg-white/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs text-neutral-500"
              htmlFor="contact-subject"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Opportunity / Collaboration / Hello"
              className="rounded-lg border border-white/10 bg-white/5 px-4
                py-2.5 text-sm text-white placeholder-neutral-600
                transition-colors outline-none focus:border-purple-500/60
                focus:bg-white/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs text-neutral-500"
              htmlFor="contact-message"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              className="resize-none rounded-lg border border-white/10
                bg-white/5 px-4 py-2.5 text-sm text-white
                placeholder-neutral-600 transition-colors outline-none
                focus:border-purple-500/60 focus:bg-white/10"
            />
          </div>

          <button
            type="submit"
            className="mt-1 rounded-lg bg-purple-600 px-6 py-2.5 text-sm
              font-medium text-white transition-all duration-200
              hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]
              active:scale-95"
          >
            Open in Email Client →
          </button>

          <p className="text-center text-xs text-neutral-600">
            Opens your default email app with the message pre-filled.
          </p>
        </motion.form>
      </div>
    </>
  );
}
