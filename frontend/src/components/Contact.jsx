import { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // This is where you'll eventually put your Discord Webhook URL
    const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

    try {
      await axios.post(DISCORD_WEBHOOK_URL, {
        content: `**New Portfolio Message!**\n**Name:** ${formData.name}\n**Email:** ${formData.email}\n**Message:** ${formData.message}`
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-8 bg-black border-t border-gray-900">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-black text-yellow-500 mb-8 tracking-tighter uppercase">Get In Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Name" required
            className="w-full bg-gray-900 border border-gray-800 p-4 rounded-xl text-white focus:border-yellow-500 outline-none"
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email" placeholder="Email" required
            className="w-full bg-gray-900 border border-gray-800 p-4 rounded-xl text-white focus:border-yellow-500 outline-none"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <textarea
            placeholder="Your Message" rows="5" required
            className="w-full bg-gray-900 border border-gray-800 p-4 rounded-xl text-white focus:border-yellow-500 outline-none"
            value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          <button type="submit" className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl uppercase hover:bg-yellow-400 transition-all">
            {status === 'sending' ? 'Sending...' : 'Send to Discord'}
          </button>
          {status === 'success' && <p className="text-green-500 text-center font-bold">Message sent successfully!</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;