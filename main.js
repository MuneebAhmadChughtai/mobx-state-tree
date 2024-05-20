import { flow, applySnapshot, getSnapshot, onSnapshot, types } from "mobx-state-tree";
import axios  from "axios";

const UserModel = types.model(
    'User', {
      userId: types.string,
      userName: types.string,
      math: types.number,
      urdu: types.number
  }).actions((self) => ({

      setMath(value) {
            return self.math = parseInt(value)
      },

      setUrdu(value) {
          return self.urdu = parseInt(value)
      },

      getMathMarks: flow(function* getMathMarks() {
          // var response = yield axios.get("https://www.randomnumberapi.com/api/v1.0/random?min=60&max=100&count=1");
          var response = Math.floor(Math.random() * (100-60)) + 60;
          applySnapshot(self, {
              ...self, math: response,
          })
      }),

      afterCreate() {
        onSnapshot(self,
            (snapshot) => console.log("======>", snapshot));
        console.log("i am Called");
    }
})

).views((self) => ({

    get totalMarks() {
        return self.math + self.urdu;
    },

    get percentage() {
        return ((self.math + self.urdu) / 200) * 100 + '%';
    }
}))

const users = UserModel.create({
    userId: 'Muneeb',
    userName: '1',
    math: 90,
    urdu: 80
})

console.log('user=>>>>', getSnapshot(users));
export default users;
