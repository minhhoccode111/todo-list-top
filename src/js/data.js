//this is data.js

import * as database from "./database.js";
import * as Prototype from "./prototype.js";
import * as Create from "./create.js";
import * as Fns from "date-fns";

let data = {
  all: [
    Create.Todo(
      "Todo List project on The Odin Project",
      "Finish Todo List project on The Odin Project today!!",
      "2023-06-27",
      true,
      "high",
      true,
      "all"
    ),
    Create.Todo(
      "Todo List project on The Odin Project",
      "Finish Todo List project on The Odin Project today!!",
      "2023-06-27",
      true,
      "high",
      false,
      "all"
    ),
    Create.Todo(
      "Todo List project on The Odin Project",
      "Finish Todo List project on The Odin Project today!!",
      "2023-06-27",
      true,
      "high",
      false,
      "all"
    ),
  ],
  today: [
    Create.Todo(
      "Learn 8 hours",
      "Learn to code at least 8 hours",
      "2023-06-27",
      true,
      "med",
      false,
      "today"
    ),
    Create.Todo(
      "Display section in Todo List code base",
      "Finish all display sections in Todo List project code base.",
      "2023-06-27",
      true,
      "high",
      false,
      "today"
    ),
    Create.Todo(
      "Learn 8 hours",
      "Learn to code at least 8 hours",
      "2023-06-27",
      true,
      "high",
      false,
      "today"
    ),
  ],
  week: [
    Create.Todo(
      "Test week project",
      "test week project ",
      "2023-06-27",
      true,
      "low",
      false,
      "week"
    ),
  ],
  month: [
    Create.Todo(
      "Test display month project",
      "Learn to code at least 8 hours",
      "2023-06-27",
      true,
      "high",
      false,
      "month"
    ),
  ],
  year: [
    Create.Todo(
      "Finish The Odin Project curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
    Create.Todo(
      "Finish CS50x introduction to computer science curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
    Create.Todo(
      "Finish CS50p introduction to programming with python curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
    Create.Todo(
      "Finish CS50w introduction to web programming with python and javascript curriculum",
      "Finish that",
      "2023-12-31",
      true,
      "high",
      false,
      "year"
    ),
  ],
  project: [
    Create.Project("gym", "Store my Gym todos", "", false),
    Create.Project("work", "Store my Work todos", "", false),
    Create.Project("learn", "Store my Learn todos", "", false),
  ],
  gym: [
    Create.Todo(
      "Push up",
      "Do 10000 pushes up",
      "",
      false,
      "high",
      false,
      "gym"
    ),
  ],
  work: [
    Create.Todo(
      "Trang book store",
      "Create a website for customer named Trang",
      "",
      false,
      "high",
      false,
      "work"
    ),
  ],
  learn: [
    Create.Todo(
      "Learn Data Structures and Algorithms",
      "On hackerRank, Exercism, Leetcode",
      "",
      false,
      "high",
      false,
      "gym"
    ),
  ],
  note: [
    Create.Note(
      "27/6 note about format in date-fns library",
      "format() take a Date object and a format we want then return a time stamp or a string date format",
      "",
      false
    ),
    Create.Note(
      "27/6 another note about parseISO",
      "parseISO() take a Date string and return a Date object",
      "",
      false
    ),
    Create.Note(
      "27/6 another note about isBefore",
      "isBefore() take a Date object and a format we want then return a time stamp or a string date format",
      "",
      false
    ),
  ],
  diary: [
    Create.Diary(
      "Hát cho giờ ra chơi, mà trời mưa rơi, như ngày em không thấy nắng, em thấy không có bạn, em đứt ngang dây đàn, em sẽ không ghi bàn hôm nay. Cứ ngồi đây thôi cùng lời anh nói cứ để cơn giông đó tới, cho tới hôm em về, giữ lấy cánh thư để trong tay. Bởi vì sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy. Nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em. Cho dù ta ưa, một ngày không mưa, nhưng làm sao cây sống mãi. Nếu nắng chang chang hoài, không có hôm mưa lại, những cái hôm em phải chào thua. Buông hai tay, buông hai tay, em đã cố đã cố hôm nay, giờ kệ nó đi em không làm gì...Chỉ nhìn mặt trời đi qua, sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy, nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em...Có sao có sao đâu...Told you told you so...",
      "Hát cho giờ ra chơi, mà trời mưa rơi, như ngày em không thấy nắng, em thấy không có bạn, em đứt ngang dây đàn, em sẽ không ghi bàn hôm nay. Cứ ngồi đây thôi cùng lời anh nói cứ để cơn giông đó tới, cho tới hôm em về, giữ lấy cánh thư để trong tay. Bởi vì sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy. Nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em. Cho dù ta ưa, một ngày không mưa, nhưng làm sao cây sống mãi. Nếu nắng chang chang hoài, không có hôm mưa lại, những cái hôm em phải chào thua. Buông hai tay, buông hai tay, em đã cố đã cố hôm nay, giờ kệ nó đi em không làm gì...Chỉ nhìn mặt trời đi qua, sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy, nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em...Có sao có sao đâu...Told you told you so..."
    ),
    Create.Diary(
      "Hát cho giờ ra chơi, mà trời mưa rơi, như ngày em không thấy nắng, em thấy không có bạn, em đứt ngang dây đàn, em sẽ không ghi bàn hôm nay. Cứ ngồi đây thôi cùng lời anh nói cứ để cơn giông đó tới, cho tới hôm em về, giữ lấy cánh thư để trong tay. Bởi vì sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy. Nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em. Cho dù ta ưa, một ngày không mưa, nhưng làm sao cây sống mãi. Nếu nắng chang chang hoài, không có hôm mưa lại, những cái hôm em phải chào thua. Buông hai tay, buông hai tay, em đã cố đã cố hôm nay, giờ kệ nó đi em không làm gì...Chỉ nhìn mặt trời đi qua, sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy, nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em...Có sao có sao đâu...Told you told you so...",
      "Hát cho giờ ra chơi, mà trời mưa rơi, như ngày em không thấy nắng, em thấy không có bạn, em đứt ngang dây đàn, em sẽ không ghi bàn hôm nay. Cứ ngồi đây thôi cùng lời anh nói cứ để cơn giông đó tới, cho tới hôm em về, giữ lấy cánh thư để trong tay. Bởi vì sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy. Nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em. Cho dù ta ưa, một ngày không mưa, nhưng làm sao cây sống mãi. Nếu nắng chang chang hoài, không có hôm mưa lại, những cái hôm em phải chào thua. Buông hai tay, buông hai tay, em đã cố đã cố hôm nay, giờ kệ nó đi em không làm gì...Chỉ nhìn mặt trời đi qua, sẽ có ngày em thấy, những chuyện buồn hôm ấy, chỉ là chuyện cười hôm nay, dù nói không buồn cười mấy, nhưng cười để khi em vui trở lại, anh sẽ nói khẽ bên tai, thấy chưa thấy chưa em...Có sao có sao đâu...Told you told you so..."
    ),
  ],
};

//Use to load data from database when app is loaded
export const load = () => {
  if (database.check("data")) {
    data = Prototype.restore(database.get("data"));
  }
};

// use to set data to database
export const set = () => database.set(data, "data");

export const get = () => data;

export const add = (obj, project) => {
  data[project].push(obj);
  set();
};

export const del = (project, index) => {
  data[project].splice(index, 1);
  set();
};

const getAllTodoProject = () => {
  let arr = [];
  for (const p in data) {
    if (p === "project" || p === "note" || p === "diary") continue;
    arr.push(p);
  }
  return arr;
};

const addAProjectToData = (name) => {
  if (data.hasOwnProperty(name)) {
    return alert("That project is already existed!");
  }
  data[name] = [];
  set();
};

const delAProjectFromData = (name) => {
  delete data[name];
  set();
};

const getProjectItems = (name) => {
  return data[name];
};

const getProjectLength = (name) => {
  if (["note", "diary", "project"].includes(name)) return data[name].length;

  if (name === "all") {
    return getAllTodoProject().reduce(
      (total, current) =>
        total +
        data[current].reduce((t, c) => {
          if (c.isDone) {
            return t;
          } else {
            return t + 1;
          }
        }, 0),
      0
    );
  }
  return data[name].reduce((total, current) => {
    if (current.isDone) {
      return total;
    }
    return total + 1;
  }, 0);
};

const getCustomProjects = () => data.project;

//another module inside
export const projects = {
  add: addAProjectToData,
  del: delAProjectFromData,
  all: getAllTodoProject,
  get: getProjectItems,
  getL: getProjectLength,
  custom: getCustomProjects,
};
