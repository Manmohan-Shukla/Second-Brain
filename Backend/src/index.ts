import express from "express";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { contentModel, linkModel, userModel } from "./db"
import { JWT_PASSWORD, MONGO_URL } from "./config";
import { usermiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors"
const app = express();

// const JWT_PASSWORD="JOK35"
const port = 3000;
app.use(express.json());
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await userModel.create({
            username: username,
            password: password
        })
        res.json({
            message: "User Signed up"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exist"
        })
    }

})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await userModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser.id,
        }, JWT_PASSWORD)
        res.json({
            token,
            message: "user signed in"
        })
    } else {
        res.status(403).json({
            message: "Invalid Credenetials"
        })
    }
})

app.post("/api/v1/content", usermiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    await contentModel.create({
        link,
        title,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content", usermiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", async (req, res) => {
    const content = req.body.contentId;
    await contentModel.deleteMany({
        content,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "deleted"
    })
})

app.post("/api/v1/brain/share", usermiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existinglink = await linkModel.findOne({
            //@ts-ignore
            userId: req.userId,
        })
        const hash = random(10);

        if (existinglink) {
            res.json({
                hash: existinglink.hash
            })
            return;
        }

        await linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash
        })

    } 
    else {
        await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        })
    }


})

app.get("/api/v1/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;
    const link = await linkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }

    const content = await contentModel.find({
        userId: link.userId
    })

    const user = await userModel.findOne({
        _id: link.userId
    })
    if (!user) {
        res.status(411).json({
            message: "user not found, error ideally not happen"
        })
        return;
    }
    res.json({
        username: user.username,
        content: content
    })
})

mongoose.connect(MONGO_URL)
app.listen(port, () => console.log('Server running on port 3000'));
