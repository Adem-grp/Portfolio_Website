import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const subject = encodeURIComponent(`Portfolio message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:ademgarip2001@gmail.com?subject=${subject}&body=${body}`;
    setStatus('success');
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
            {status === 'sending' ? 'Opening email...' : 'Send message'}
          </button>
          {status === 'success' && <p className="text-green-500 text-center font-bold">Message sent successfully!</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;