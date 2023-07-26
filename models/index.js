// sequelize 클래스 외부에 공개
const Sequelize = require('sequelize');

// config 디렉토리의 config.json에서 설정한 내용 가져온것
const config = require('../config/config.json');

const {
  username, password, database, host, dialect,
} = config.development;

// sequelize객체 생성
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

// member.js에 있던 함수 가져오기
// Member 모델은 Members 테이블과 연동
const Member = require('./member')(sequelize, Sequelize.DataTypes);

// db 객체안에 Member 모델을 넣어서 공유
const db = {};
db.Member = Member;

module.exports = db;
