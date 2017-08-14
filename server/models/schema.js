var schema = {
    people: {
        openid: String,
        session: String,
        name: String,
        sex: String,
        age: Number,
        star: String,
        paper: String,
        paperPic: Array,
        cardNum: String,
        country: String,
        province: String,
        city: String,
        want: String,
        intro: String
    },
    visitor: {
        openid: String,
        session: String,
        session_key: String,
        isVip: Boolean
    },
    banner: {
        title: String,
        english: String,
        pic: String
    },
    leader: {
        tell: String,
        pic: String
    },
    intro: {
        intro: String
    },
    quality: {
        content: String,
        pic: String
    },
    card: {
        title: String,
        pic: String
    },
    info: {
        title: String,
        phone: String,
        phone2: String,
        mobile: String,
        person: String,
        wechart: String,
        wechartPic: String,
        qq: String,
        qqPic: String
    }
};

module.exports = schema;