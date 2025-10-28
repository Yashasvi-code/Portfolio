// import { useState } from 'react';

// const ContactBeacon = () => {
//   const [isBeaconActive, setIsBeaconActive] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   const handleBeaconClick = () => {
//     setIsBeaconActive(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setIsSubmitted(true);
      
//       // Reset form after submission
//       setFormData({ name: '', email: '', message: '' });
      
//       // Reset confirmation after 5 seconds
//       setTimeout(() => {
//         setIsSubmitted(false);
//       }, 5000);
//     }, 1500);
//   };

//   const resetBeacon = () => {
//     setIsBeaconActive(false);
//     setIsSubmitted(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
//       {/* Background particles effect */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(30)].map((_, i) => (
//           <div 
//             key={i}
//             className="absolute rounded-full bg-blue-500 opacity-20"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               width: `${Math.random() * 10 + 2}px`,
//               height: `${Math.random() * 10 + 2}px`,
//               animation: `pulse ${Math.random() * 4 + 2}s infinite alternate`
//             }}
//           />
//         ))}
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0% { opacity: 0.1; transform: scale(1); }
//           100% { opacity: 0.3; transform: scale(1.2); }
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         @keyframes glow {
//           0% { box-shadow: 0 0 5px #60a5fa, 0 0 10px #60a5fa, 0 0 15px #3b82f6; }
//           50% { box-shadow: 0 0 20px #60a5fa, 0 0 30px #60a5fa, 0 0 40px #3b82f6; }
//           100% { box-shadow: 0 0 5px #60a5fa, 0 0 10px #60a5fa, 0 0 15px #3b82f6; }
//         }
//       `}</style>

//       {!isBeaconActive ? (
//         <div className="flex flex-col items-center justify-center z-10 text-center">
//           {/* Arc Reactor */}
//           <div 
//             className="relative w-64 h-64 cursor-pointer mb-8 group"
//             onClick={handleBeaconClick}
//           >
//             {/* Outer ring */}
//             <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            
//             {/* Middle ring */}
//             <div className="absolute inset-6 rounded-full border-4 border-blue-400 opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            
//             {/* Inner core */}
//             <div className="absolute inset-12 rounded-full bg-blue-500 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.4s' }}>
//               <div className="w-16 h-16 rounded-full bg-blue-300 animate-pulse"></div>
//             </div>
            
//             {/* Center light */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-4 h-4 rounded-full bg-white animate-ping"></div>
//             </div>
            
//             {/* Glow effect */}
//             <div className="absolute inset-0 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{ animation: 'glow 2s infinite' }}></div>
//           </div>
          
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//             Need a Developer?
//           </h1>
//           <p className="text-xl text-blue-300 mb-6">Activate the Beacon</p>
//           <p className="text-gray-400 max-w-md">
//             Click the Arc Reactor to summon assistance for your next project
//           </p>
//         </div>
//       ) : (
//         <div className="w-full max-w-md z-10">
//           {/* Small Arc Reactor in corner */}
//           <div 
//             className="absolute top-6 right-6 w-12 h-12 cursor-pointer"
//             onClick={resetBeacon}
//           >
//             <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-70 animate-pulse"></div>
//             <div className="absolute inset-2 rounded-full border-2 border-blue-400 opacity-80 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
//             <div className="absolute inset-4 rounded-full bg-blue-500 flex items-center justify-center animate-pulse" style={{ animationDelay: '0.4s' }}>
//               <div className="w-2 h-2 rounded-full bg-blue-300"></div>
//             </div>
//           </div>

//           <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-blue-500 border-opacity-30 shadow-2xl shadow-blue-500/20">
//             <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
//               Transmit Your Message
//             </h2>
            
//             {isSubmitted ? (
//               <div className="text-center py-8">
//                 <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-2">Signal Received</h3>
//                 <p className="text-blue-300">I'm on my way. Expect a response soon.</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label htmlFor="name" className="block text-blue-300 mb-2">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full bg-gray-700 bg-opacity-50 border border-blue-500 border-opacity-30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="Tony Stark"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-4">
//                   <label htmlFor="email" className="block text-blue-300 mb-2">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="w-full bg-gray-700 bg-opacity-50 border border-blue-500 border-opacity-30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="tony@starkindustries.com"
//                     required
//                   />
//                 </div>
                
//                 <div className="mb-6">
//                   <label htmlFor="message" className="block text-blue-300 mb-2">Message</label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     rows="4"
//                     className="w-full bg-gray-700 bg-opacity-50 border border-blue-500 border-opacity-30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                     placeholder="Tell me about your project..."
//                     required
//                   ></textarea>
//                 </div>
                
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center disabled:opacity-70"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Transmitting...
//                     </>
//                   ) : 'Send Signal'}
//                 </button>
//               </form>
//             )}
            
//             <div className="mt-8 pt-6 border-t border-blue-500 border-opacity-20">
//               <p className="text-center text-blue-300 mb-4">Or find me on these channels</p>
//               <div className="flex justify-center space-x-6">
//                 <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
//                   <i className="fab fa-github text-2xl"></i>
//                 </a>
//                 <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
//                   <i className="fab fa-linkedin text-2xl"></i>
//                 </a>
//                 <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
//                   <i className="fab fa-twitter text-2xl"></i>
//                 </a>
//                 <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
//                   <i className="fab fa-codepen text-2xl"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactBeacon;

