import React, { useState, useRef, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { getChatbotResponse } from '../services/geminiService';
import { Send, User, Bot, Sparkles, Terminal, Info, Trash2, HelpCircle, Cpu } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const AISupportPage = () => {
  const context = useContext(AppContext);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to Nexin Tech Support. I can help you compare specs, find compatible hardware, or troubleshoot procurement issues. What can I assist you with today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: 'user', 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const storeContext = `You are the Nexin Tech Assistant. We specialize in high-end tech: Smartphones, Laptops, Consoles, Mini PCs, and more. 
    Help users with hardware specifications, compatibility (e.g., USB-C vs Thunderbolt), and store policies. 
    Store Inventory Categories: Smartphones, Headphones, Powerbanks, Laptops, Printers, Tablets, Mini PCs, Consoles.`;

    const botResponseText = await getChatbotResponse(input, storeContext);
    
    const botMessage: Message = { 
      role: 'bot', 
      text: botResponseText, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const quickActions = [
    "Laptop for video editing?",
    "Best noise cancelling headset?",
    "Next-gen gaming consoles?",
    "Mini PC for home office?"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10 min-h-[calc(100vh-100px)]">
      <div className="w-full lg:w-80 space-y-8">
        <div>
          <h1 className="text-4xl font-black mb-4 tracking-tight">Nexin Support</h1>
          <p className="text-slate-500 leading-relaxed">
            Instant hardware advice and troubleshooting from our intelligent Nexin systems.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-blue-600" /> Tech FAQs
          </h3>
          <div className="space-y-2">
            {quickActions.map(action => (
              <button 
                key={action}
                onClick={() => setInput(action)}
                className="w-full text-left p-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all border border-transparent"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-3xl p-6 text-white text-center">
          <Cpu className="w-10 h-10 mx-auto mb-4" />
          <p className="text-sm font-bold">Nexin Expert AI</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col bg-white border border-slate-100 rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold">Nexin Assistant</h3>
          </div>
          <button onClick={() => setMessages([messages[0]])} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-slate-50/30">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-slate-100 text-slate-800'} p-4 rounded-2xl shadow-sm`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <span className="text-[10px] mt-2 block opacity-50">{msg.time}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-1 shadow-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-6 border-t border-slate-50 bg-white flex gap-4">
          <input 
            type="text" 
            placeholder="Type your tech query..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-6 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 font-medium"
          />
          <button type="submit" className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AISupportPage;