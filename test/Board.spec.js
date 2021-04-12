const { Board } = require("../Board")
const assert = require('assert');

const positionExample = {
  type: 'V',
  position: 'A1'
}
describe('Board testing', () => {
  it('check instance name', () => {
    const instance = new Board('Tester')
    assert.equal(instance.name, 'Tester');
  });
  it('check set position', () => {
    const instance = new Board('Tester')
    instance.setPosition(positionExample)
    assert.deepEqual(instance.position, {x: 1, y: 1});
  });
  it('check hits and sunk', () => {
    const instance = new Board('Tester')
    instance.setPosition(positionExample)
    const hit1 = instance.shot({position: 'A1'})
    assert.equal(hit1, 'Hit');
    const hit2 = instance.shot({position: 'd4'})
    assert.equal(hit2, 'Missed');
    const hit3 = instance.shot({position: 'a2'})
    assert.equal(hit3, 'Hit');
    const status1 = instance.getStatus()
    assert.equal(status1, 1);
    const hit4 = instance.shot({position: 'a3'})
    assert.equal(hit4, 'Hit');
    const status2 = instance.getStatus()
    assert.equal(status2, 0);
  });
});