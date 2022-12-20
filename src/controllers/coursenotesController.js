const Coursenote = require("../models/course_notes")

const { uploads3, deleteFromS3 } = require('../../s3');

// ADD---COURSE---VIDEO

exports.addcoursenotes = async(req, res) => {
    try {
        let notesFile = '';
        var randomString = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 20; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        let fileName = req.files.notesFile.name.replace(/[\n\r\s\t]+/g, '');
        if (req.files) {
            let sampleFiles = req.files.notesFile;
            if (sampleFiles) {
                let uploadPath = "./public/images";
                sampleFiles.mv(uploadPath + '/' + randomString + fileName);
                notesFile = uploadPath + '/' + randomString + fileName;
            }
        }
        let s3Obj = await uploads3(notesFile, randomString + fileName);
        const coursenotes = new Coursenote()
        coursenotes.course = req.body.courseId;
        coursenotes.title = req.body.title;
        coursenotes.url = process.env.AWS_CLOUDFRONT_URL + s3Obj.Key;
        coursenotes.key = s3Obj.Key;
        await coursenotes.save()
        fs.unlink(path.join(__dirname, '../.' + notesFile), function(err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
        return res.status(200).json({ msg: "course note added" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
}

// GET --- COURSE --- VIDEO

exports.getcoursenotes = async(req, res) => {
    try {
        const notes = await Coursenote.find({ course: req.params.id })
        return res.status(200).json({ data: notes, msg: "get course notes for " + req.params.id })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }
};
exports.deletecoursenotes = async(req, res) => {
    try {
        const notes = await Coursenote.deleteOne({ key: req.params.key })
        const s3Obj = deleteFromS3(req.params.key);
        return res.status(200).json({ msg: "note deleted for key " + req.params.key })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "something went wrong" })
    }

};
// // ADD---COURSE---VIDEO

// exports.addcoursenotes = async(req, res) => {
//     try {
//         let course_notes = '';
//         if (req.files) {
//             if (!fs.existsSync(path.join(__dirname, '../public/images'))) {
//                 fs.mkdir(path.join(__dirname, '../public/images'), (err) => {
//                     if (err) {
//                         return console.error(err);
//                     }
//                     console.log('Directory created successfully!');
//                 });
//             }
//         }
//         if (req.files) {
//             if (req.files.signature) {
//                 let uploadPath = "./public/images";
//                 let sampleFiles = req.files.addvideo;
//                 sampleFiles.mv(uploadPath + '/' + sampleFiles.name);
//                 course_notes = uploadPath + '/' + sampleFiles.name;
//             }
//         }
//         const coursenotes = new Coursenote()
//         coursenotes.instructor = req.body.instructorId
//         coursenotes.course_notes = course_notes;
//         coursenotes.notes_name = req.body.notes_name
//         coursenotes.save()
//         return res.status(200).json({ msg: "course notes added" })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ msg: "something went wrong" })
//     }
// }

// // GET --- COURSE --- NOTES

// exports.getcoursenotes = async(req, res) => {
//     try {
//         const getcoursenotes = await Coursenote.find({})
//         return res.status(200).json({ msg: "course notes get successfully", getcoursenotes })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ msg: "something went wrong" })
//     }
// }

// // GET --- MY --- COURSE

// exports.getmycourse = async(req, res) => {
//     try {
//         const getmycourse = await Course.find({ instructor: req.instructor._id })
//         return res.status(200).json({ msg: "courseget successfully", getmycourse })
//     } catch (error) {
//         console.log(error)
//         return res.status(400).json({ msg: "something went wrong" })
//     }
// }