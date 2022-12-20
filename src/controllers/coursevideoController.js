const Coursevideo = require("../models/course_video")
const fs = require("fs")
const path = require('path');
const { uploads3, deleteFromS3 } = require('../../s3');

// ADD---COURSE---VIDEO

exports.addcoursevideo = async(req, res) => {
    try {
        let videoFile = '';
        var randomString = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 20; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        let fileName = req.files.videoFile.name.replace(/[\n\r\s\t]+/g, '');
        let type = '';
        if (req.files) {
            let sampleFiles = req.files.videoFile;
            type = sampleFiles.mimetype;
            if (sampleFiles) {
                let uploadPath = "./public/images";
                sampleFiles.mv(uploadPath + '/' + randomString + fileName);
                videoFile = uploadPath + '/' + randomString + fileName;
            }
        }
        // if (req.files) {
        //     if (!fs.existsSync(path.join(__dirname, '../public/images'))) {
        //         fs.mkdir(path.join(__dirname, '../public/images'), (err) => {
        //             if (err) {
        //                 return console.error(err);
        //             }
        //             console.log('Directory created successfully!');
        //         });
        //     }
        // }
        // await fs.unlink(path.join(__dirname, '../.' + videoFile))
        let s3Obj = await uploads3(videoFile, randomString + fileName, type);
        const coursevideo = new Coursevideo();
        coursevideo.course = req.body.courseId;
        coursevideo.title = req.body.title;
        coursevideo.url = process.env.AWS_CLOUDFRONT_URL + s3Obj.Key;
        coursevideo.key = s3Obj.Key;
        await coursevideo.save();
        if (s3Obj) {
            fs.unlink(path.join(__dirname, '../.' + videoFile), function(err) {
                if (err) return console.log(err);
                console.log('file deleted successfully');
            });
        }
        return res.status(200).json({ msg: "course video added" })
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET --- COURSE --- VIDEO

exports.getcoursevideo = async(req, res) => {
    try {
        const video = await Coursevideo.find({ course: req.params.id })
        return res.status(200).json({ data: video, msg: "get course videos for " + req.params.id })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }

    // const path = video.video;
    // // const path = 'upload/video/1646392054025.mp4'
    // const stat = fs.statSync(path)
    // const fileSize = stat.size
    // const range = req.headers.range
    // if (range) {
    //     const chunksize = end - start + 1;
    //     const parts = Number(range.replace(/\D/g, ""));
    //     const start = parseInt(parts[0], 10)
    //     const end = Math.min(start + chunksize, videoSize - 1);

    //     const file = fs.createReadStream(path, { start, end })
    //     const head = {
    //         'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    //         'Accept-Ranges': 'bytes',
    //         'Content-Length': chunksize,
    //         'Content-Type': 'video/mp4',
    //     }
    //     res.writeHead(206, head);
    //     file.pipe(res);
    // } else {
    //     const head = {
    //         'Content-Length': fileSize,
    //         'Content-Type': 'video/mp4',
    //     }
    //     res.writeHead(200, head)
    //     fs.createReadStream(path).pipe(res)
    // }
};
exports.deletecoursevideo = async(req, res) => {
    try {
        const video = await Coursevideo.deleteOne({ key: req.params.key })
        const s3Obj = deleteFromS3(req.params.key);
        return res.status(200).json({ msg: "video deleted for key " + req.params.key })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }

};