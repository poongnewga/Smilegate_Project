const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'smile',
  'heeham',
  'heeham',
  {
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
);

const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
// id 생성
const uid = () => {
  var id="";

  // length of ID : 0 ~ 8
  var length = Math.floor(Math.random() * 8) + 1;

  for (var i=0; i<length; i++) {
    id += options.charAt(Math.floor(Math.random() * 62));
  }

  return id;
};

const URL = sequelize.define('URL', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  before: {
    type: Sequelize.STRING,
    allowNull: false
  },
  after: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


// before 검증 및 생성
const createRecord = async (before, after) => {
  try {
    var url = await URL.findOne({where:{before: before}});
    if (url == null) {
      var res = await checkAfter(before, after);
      // console.log(res);
      return res;
    } else {
      console.log(url);
      return url;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

// before가 이미 검증된 경우, id만 중복 여부 검증
const checkAfter = async (before, after) => {
  try {
    var temp = await URL.findOne({where:{after: after}});
    if (temp == null) {
      var result = await URL.create({before: before, after: after});
      // console.log(result);
      return result;
    } else {
      checkAfter(before, uid());
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}


var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 정적 페이지 제공
app.use(express.static('public'));

// GET /favicon.ico 가 라우팅 처리되는 것을 방지
app.get('/favicon.ico', function(req, res) {
  res.status(204);
});

// Redirect
app.get('/:after', async (req, res, next) => {
  // var short_url = await req.params.url;
  console.log("단축 : ", req.params.after);
  // var result;

  URL.findOne({
    where: { after: req.params.after}
  })
  .then((url)=>{
    if (url == null) {
      console.log("NOTHING FOUND");
      res.send("<h1>잘못된 URL입니다. :(</h1>");
    } else {
      console.log("SHORT_URL EXISTS! Redirect to : ");
      console.log(url.dataValues.before);
      // result = url.dataValues.before;
      res.redirect(301, url.dataValues.before);
    }
  })
  .catch((err)=>{
    console.log(err);
    console.log("ERROR");
    res.send(500);
  });
});

// POST /:url => URL 체크 후 존재하면 그대로 리턴, 없으면 생성하여 리턴
app.post('/url', async (req, res) => {
  console.log(req.body.before);
  var before_url = req.body.before;

  if (!before_url.match(/^[a-zA-Z]+:\/\//)){
    before_url = 'http://' + before_url;
  }

  var after_url = uid();

  var status = await createRecord(before_url, after_url);

  if (status) {
    res.send(status);
  } else {
    res.send({status: 500, msg: "DB Error"});
  }
});

app.listen(80, () => {
  console.log('Example app listening on port 80!');
});
