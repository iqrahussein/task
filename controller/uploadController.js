// import { file, success } from "zod";
// import cloudinary from "../utils/cloudinary.js";


// export const uploadFile =(req,res,next)=>{
//   if(!req.file){
//     return res.status(401).json({message:"No file uploaded"})
//   }
//   const stream=cloudinary.uploader.upload_stream(
//     {folder:"iqra_uploads",resource_type:"auto"},
//     (error,result)=>{
//         if(error) return next(error)

//          return res.status (201).json({
//             success:true,
//             fileUrl:result.secure_url
//          })
//     }

//   )

//   stream.end(req.file.buffer)
// }
// export const uploadFile = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   res.status(201).json({
//     success: true,
//     fileUrl: req.file.path
//   });
// };


import cloudinary from "../utils/cloudinary.js";

export const uploadFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "iqra_uploads",
      resource_type: "auto",
    },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return next(error);
      }

      if (!result || !result.secure_url) {
        return res.status(500).json({
          success: false,
          message: "Cloudinary did not return a file URL",
        });
      }

      return res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        fileUrl: result.secure_url,
      });
    }
  );

  stream.end(req.file.buffer);
};
