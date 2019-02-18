import { Urd } from '../src/urd';
import { personModel } from './person.urd-model';

const text = `
  name: George

  <!age>
  const { battler } = context;
  function add(a: number) {
    return 5 + a;
  }
  return 24;
  </age>

  <diary: 24/08/2018>
  Hello world!
  How are you?
  </diary>

  <inventory>
  type: Sacoche
  slots: 4
  </inventory>

  <inventory>
  type: Bag
  slots: 2
  </inventory>
  `;

const obj = Urd.parse(text, personModel);
console.log('obj :', obj);
