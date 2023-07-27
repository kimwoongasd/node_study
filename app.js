// 익스프레스 패키지에서 공개하는 것을 가져오기
const express = require('express');

// model 디렉토리에 있던 index.js에서 db 객체 가져옴
const db = require('./models');
const { Member } = db;

// 함수 외부로 공개(실행된 함수는 하나의 객체를 리턴)
const app = express();

app.use(express.json());

// 전체 직원 정보 조회, 만약 쿼리가 존재하면 특정 팀만 조회
app.get('/api/members',  async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll({ where: { team } });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
});

// 특정 직원 정보 조회
app.get('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ where: { id } });
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no such member!!' });
  }
});

// 정보 추가
app.post('/api/members', async (req, res) => {
  const newMember = req.body;
  const member = Member.build(newMember);
  await member.save();
  res.send(newMember);
});

// 정보 수정
app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = await Member.update(newInfo, { where: { id } });
  if (member[0]) {
    res.send({ message: `${member[0]} row 수정`})
  } else {
    res.status(404).send({ message: "There is no Member" });
  }
});

/*
// 정보 수정 다른 방법
app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = await Member.findOne({ where: { id } });
  if (member) {
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    await member.save()
    res.send({ message: `수정`})
  } else {
    res.status(404).send({ message: "There is no Member" });
  }
});
*/

// 정보 삭제
app.delete('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const deleteCount = await Member.destroy({ where: { id } })
  if (deleteCount) {
    res.send({ message: `${deleteCount} 'Deleted'` });
  } else {
    res.status(404).send({ message: 'Threr is no member' });
  }
});


// 포트 번호가 3000에서 실행
app.listen(3000, () => {
  console.log('Server is listening...');
});
