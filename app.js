// 익스프레스 패키지에서 공개하는 것을 가져오기
const express = require('express');

// model 디렉토리에 있던 index.js에서 db 객체 가져옴
const db = require('./models');
const { Member } = db;

// 함수 외부로 공개(실행된 함수는 하나의 객체를 리턴)
const app = express();

app.use(express.json());


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

app.get('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: 'There is no such member!!' });
  }
});

app.post('/api/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find((m) => m.id === Number(id));
  if (member) {
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    res.send(member)
  } else {
    res.status(404).send({ message: "There is no Member" });
  }
});

app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const membersCount = members.length;
  members = members.filter((member) => member.id !== Number(id));
  if (members.length < membersCount) {
    res.send({ message: 'Deleted' });
  } else {
    res.status(404).send({ message: 'Threr is no member' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening...');
});
