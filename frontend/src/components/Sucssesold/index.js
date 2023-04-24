// import React, { useEffect, useState } from "react";

// import { useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

// import axios from "axios";
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';

// const Sucssesold = () => {

//   const state = useSelector((state) => {
//     return {
//       project: state.project.project,
//       majority: state.project.majority,
//       status: state.project.status,
//       selectedProject: state.selected.selectedProject,
//       selectetUserProfile : state.selected.selectetUserProfile ,
//       selectedoffer_id:state.selected.selectedoffer_id,
//       auth: state.auth,
//     };
//   });

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     pt: 2,
//     px: 4,
//     pb: 3,
//   };
  
//   function ChildModal() {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => {
//       setOpen(true);
//     };
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//     return (
//       <React.Fragment>
//         <Button onClick={handleOpen}>Open Child Modal</Button>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="child-modal-title"
//           aria-describedby="child-modal-description"
//         >
//           <Box sx={{ ...style, width: 200 }}>
//             <h2 id="child-modal-title">Text in a child modal</h2>
//             <p id="child-modal-description">
//               Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//             </p>
//             <Button onClick={handleClose}>Close Child Modal</Button>
//           </Box>
//         </Modal>
//       </React.Fragment>
//     );
//   }
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//     const { pathname } = useLocation();
   
   
//     useEffect(() => {




//  console.log("pathname,,,,,,,,,,,,,rProfile,,,,,,,",state.selectedProject)
//  console.log("pathname,,,,,,,,,,,,,,selectedoffer,,,,,,",state.selectedoffer_id)




//     console.log("pathname,,,,,,,,,,,,,,,,,,,,",pathname)
   
//     if( pathname == '/ProjectInside/Sucsses'){


//       axios.put(`http://localhost:5000/joboffer/status/${state.selectedoffer_id}`,{jobOfferStatus_id:6})
//       .then((resultinfo) => {

//           console.log("joboffer/status_________________", resultinfo);

    
          

//       })
//       .catch((err) => {
//           console.log("error", err);
   
//       });

     
//       axios.put(`http://localhost:5000/projects/status/${state.selectedProject}`,{status_id:2})
//       .then((resultinfo) => {

//           console.log("projects/status________________", resultinfo);

    
          

//       })
//       .catch((err) => {
//           console.log("error", err);
   
//       });

//       setOpen(true);
//     }
     
//     }, [])


    
//   return (
//     <div>  
//    <Button onClick={handleOpen}>Open modal</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >

//         <Box sx={{ ...style, width: 400 }}>
//           <h2 id="parent-modal-title">Thanks for your Paymant!</h2>
//           <p id="parent-modal-description">
//           We appreciate your business!
//   If you have any questions, please email {`  `}
//   <a href="hivebeefreelancer@gmail.com"> hivebeefreelancer@gmail.com</a>.
//           </p>
//           <ChildModal />
//         </Box>
//       </Modal>
//     </div>
//   );
// }



























// export default Sucssesold


