"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// const JWT_PASSWORD="JOK35"
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.userModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "User Signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exist"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.userModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser.id,
        }, config_1.JWT_PASSWORD);
        res.json({
            token,
            message: "user signed in"
        });
    }
    else {
        res.status(403).json({
            message: "Invalid Credenetials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    yield db_1.contentModel.create({
        link,
        title,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body.contentId;
    yield db_1.contentModel.deleteMany({
        content,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "deleted"
    });
}));
app.post("/api/v1/brain/share", middleware_1.usermiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existinglink = yield db_1.linkModel.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        const hash = (0, utils_1.random)(10);
        if (existinglink) {
            res.json({
                hash: existinglink.hash
            });
            return;
        }
        yield db_1.linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield db_1.linkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
mongoose_1.default.connect("mongodb+srv://manmohanshukla815:Man%401234@cluster0.fjnpqjp.mongodb.net/Second-Brain");
app.listen(port, () => console.log('Server running on port 3000'));
