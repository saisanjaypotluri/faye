// // App.js
// import React, { useState } from 'react';
// import { createTheme, ThemeProvider, Container, Typography, Box } from '@mui/material';
// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';

// const theme = createTheme({
//   palette: {
//     primary: { main: '#ff4081' },
//     secondary: { main: '#c2185b' },
//   },
//   typography: {
//     fontFamily: 'Great Vibes, cursive',
//     h1: {
//       fontSize: '4rem',
//       textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
//     },
//   },
// });

// export default function App() {
//   const [photos, setPhotos] = useState([]);
//   const [openGallery, setOpenGallery] = useState(false);

//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPhotos(prev => [...prev, e.target.result]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Typography variant="h1" align="center" gutterBottom>
//           Our Eternal Love
//         </Typography>

//         <Box sx={{ position: 'relative', minHeight: '80vh' }}>
//           {/* Photo Slideshow Preview */}
//           <motion.div 
//             style={{
//               position: 'fixed',
//               bottom: 20,
//               right: 20,
//               width: 300,
//               zIndex: 1000,
//               cursor: 'pointer'
//             }}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => setOpenGallery(true)}
//           >
//             <Swiper
//               modules={[Autoplay]}
//               autoplay={{ delay: 3000 }}
//               loop
//               spaceBetween={10}
//               slidesPerView={1}
//             >
//               {photos.map((img, i) => (
//                 <SwiperSlide key={i}>
//                   <img 
//                     src={img} 
//                     alt="" 
//                     style={{ 
//                       width: '100%', 
//                       height: 200, 
//                       objectFit: 'cover',
//                       borderRadius: 16 
//                     }}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </motion.div>

//           {/* Main Content */}
//           <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 400px' }, gap: 4 }}>
//             <Box>
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <iframe
//                   style={{ 
//                     borderRadius: 16,
//                     boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//                     marginBottom: 32 
//                   }}
//                   src="https://open.spotify.com/embed/playlist/6wm8OFbsAYxxeBlOjDTJQy"
//                   width="100%"
//                   height="152"
//                   frameBorder="0"
//                   allowtransparency="true"
//                 />
//               </motion.div>

//               <input
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 id="photo-upload"
//                 type="file"
//                 multiple
//                 onChange={handlePhotoUpload}
//               />
//               <label htmlFor="photo-upload">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   style={{
//                     padding: '12px 24px',
//                     background: theme.palette.primary.main,
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: 8,
//                     cursor: 'pointer',
//                     fontSize: '1.1rem'
//                   }}
//                 >
//                   Upload Memories
//                 </motion.button>
//               </label>
//             </Box>

//             {/* Calendar */}
//             <Box sx={{ position: 'sticky', top: 20 }}>
//               <FullCalendar
//                 plugins={[dayGridPlugin]}
//                 initialView="dayGridMonth"
//                 events={JSON.parse(localStorage.getItem('events')) || []}
//                 editable={true}
//                 headerToolbar={{
//                   left: 'prev,next today',
//                   center: 'title',
//                   right: 'dayGridMonth,dayGridWeek'
//                 }}
//                 eventContent={(eventInfo) => (
//                   <div style={{ 
//                     background: theme.palette.secondary.main,
//                     padding: 4,
//                     borderRadius: 4,
//                     color: 'white'
//                   }}>
//                     {eventInfo.event.title}
//                   </div>
//                 )}
//               />
//             </Box>
//           </Box>

//           {/* Full Screen Gallery Modal */}
//           {openGallery && (
//             <div style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: 'rgba(0,0,0,0.9)',
//               zIndex: 2000
//             }}>
//               <Swiper
//                 modules={[Navigation, Pagination]}
//                 navigation
//                 pagination={{ clickable: true }}
//                 spaceBetween={50}
//                 slidesPerView={1}
//               >
//                 {photos.map((img, i) => (
//                   <SwiperSlide key={i}>
//                     <img 
//                       src={img} 
//                       alt="" 
//                       style={{ 
//                         width: '100%', 
//                         height: '100vh', 
//                         objectFit: 'contain' 
//                       }}
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//               <button 
//                 onClick={() => setOpenGallery(false)}
//                 style={{
//                   position: 'absolute',
//                   top: 20,
//                   right: 20,
//                   background: 'white',
//                   border: 'none',
//                   borderRadius: '50%',
//                   width: 40,
//                   height: 40,
//                   cursor: 'pointer'
//                 }}
//               >
//                 ✕
//               </button>
//             </div>
//           )}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// }