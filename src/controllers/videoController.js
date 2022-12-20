const Video = require("../models/videoModel")
const fs = require("fs");
const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const { uploads3, downloadFromS3 } = require('../../s3');
const axios = require('axios').default;
const https = require('https');

// ---ADD---VIDEO---

exports.addvideo = async(req, res) => {
    try {
        let videoFile = '';
        if (req.files) {
            let sampleFiles = req.files.videoFile;
            if (sampleFiles) {
                let uploadPath = "./public/images";
                sampleFiles.mv(uploadPath + '/' + sampleFiles.name);
                videoFile = uploadPath + '/' + sampleFiles.name;
            }
        }
        let s3Obj = await uploads3(videoFile, req.files.videoFile.name.replace(/[\n\r\s\t]+/g, ''));
        const video = new Video()
        video.video = process.env.AWS_CLOUDFRONT_URL + s3Obj.Key;
        video.save()
        return res.status(200).json({ msg: "video added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET --- VIDEO
exports.getvideo = async(req, res) => {
    try {
        const range = req.headers.range;
        console.log(range);
        if (!range) {
            res.status(400).send("Requires Range header");
        }
        let readStream = await downloadFromS3('ZmEEYXxBVKaY9DulP0Tb2.NetworkingandThreads.mp4');
        // console.log(readStream);
        const video = await Video.findOne({ _id: req.params.id })
        const videoPath = video.video;
        // const response = await axios.get('https://d3q2r49qeli57x.cloudfront.net/ZmEEYXxBVKaY9DulP0Tb2.NetworkingandThreads.mp4', { responseType: 'stream' });
        // console.log(response.data);
        const videoSize = fs.statSync(readStream).size;
        console.log(videoSize);
        return res.status(200).json({ msg: "video added" })
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ msg: "something went wrong" })
    }

}

// exports.getvideo = async(req, res) => {
//     try {

//         const video = await Video.findOne({ _id: req.params.id })
//         const path = video.video;
//         let data = await downloadFromS3('QSMboWMoBRo8Gw9W2dCt1.ThreadIntro.mp4');
//         console.log(data);
//         const stat = fs.statSync(data.data)
//         const fileSize = stat.size
//         const range = req.headers.range
//         if (range) {
//             const chunksize = end - start + 1;
//             const parts = Number(range.replace(/\D/g, ""));
//             const start = parseInt(parts[0], 10)
//             const end = Math.min(start + chunksize, videoSize - 1);

//             const file = fs.createReadStream(path, { start, end })
//             const head = {
//                 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                 'Accept-Ranges': 'bytes',
//                 'Content-Length': chunksize,
//                 'Content-Type': 'video/mp4',
//             }
//             res.writeHead(206, head);
//             file.pipe(res);
//         } else {
//             const head = {
//                 'Content-Length': fileSize,
//                 'Content-Type': 'video/mp4',
//             }
//             res.writeHead(200, head)
//             fs.createReadStream(path).pipe(res)
//         }

//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ msg: "something went wrong" })
//     }

// };