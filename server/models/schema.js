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
        email: String,
        wechart: String,
        wechartPic: String,
        qq: String,
        qqPic: String
    },
    news: {
        title: String,
        intro: String,
        type: String,
        content: String,
        date: String
    },
    type1: {
        title: String
    },
    type2: {
        title: String,
        type1Id: String,
        type1Title: String
    },
    product: {
        type1Id: String,
        type1Title: String,
        type2Id: String,
        type2Title: String,
        title: String,
        detailNum: String,
        detailSize: String,
        detailPic:String,
        top: String
    },
    contact: {
        title: String,
        name: String,
        phone: String,
        email: String
    },
    user: {
        userName: String,
        passWord: String
    },
    down: {
        title: String,
        pic: String,
        file: String
    }
};

module.exports = schema;