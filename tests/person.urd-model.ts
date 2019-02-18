import { Model } from '../src/model';

export const personModel: Model = {
  name: {
    type: 'string',
    disableEval: true
  },
  age: {
    type: 'number'
  },
  job: {
    type: 'string',
    suggestions: ['Developer', 'UI/UX Designer']
  },
  hobbies: {
    type: 'list'
  },
  diary: {
    type: 'text'
  },
  likedFruits: {
    type: 'list',
    suggestions: ['Orange', 'Banana', 'Mango', 'Strawbery']
  },
  greeting: {
    type: 'text'
  },
  onWakeUp: {
    type: 'code'
  },
  inventory: {
    type: 'structure',
    fields: {
      type: {
        type: 'string'
      },
      slots: {
        type: 'number'
      }
    }
  }
};
export default personModel;
