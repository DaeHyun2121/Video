const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/comment', require('./routes/comment'))


app.use('/uploads', express.static('uploads'));


if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});

const getHtml = async () => {
  try {
    return await axios.get("http://www.melon.com/chart/");
    // 해당 사이트 html 태그 가져오기
  } catch (error) {
    console.error(error);
  }
};

app.get("/melonchart", (req, res) => {
  getHtml()
    .then((html) => {
      const $ = cheerio.load(html.data);
      let parentTag = $("tbody > tr"); //크롤링 태그

      let resultArr = [];
      parentTag.each( (index, element) => {
        let itemObj = {
          rank : index + 1,
          image: $(element).find(".wrap img").attr('src'),
          title: $(element).find(".ellipsis.rank01 a").text(),
          artist: $(element).find(".ellipsis.rank02 > a").text(),
        };
        console.log(itemObj);
        resultArr.push(itemObj);
      });
      return resultArr;
    })
    .then((data) => res.send(data));
});
