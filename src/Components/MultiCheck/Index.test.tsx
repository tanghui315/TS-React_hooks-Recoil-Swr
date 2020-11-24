// TODO more tests
import { shallow, configure } from 'enzyme';
import React from 'react'
import MultiCheck from './Index'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })
const props = {
  label: "test-my-label",
  options: [{ label: "abc", value: "233" }, { label: "ab2c", value: "123" }, { label: "ccsd", value: "321" }, { label: "ssdd", value: "116" }],
  values: ["233", "123"],
  columns: 2,
  onChange: jest.fn()
}

const setup = () => {

  const wrapper = shallow(<MultiCheck {...props} />)
  return {
    props,
    wrapper
  }
}

describe('MultiCheck', () => {
  describe('initialize', () => {
    const { wrapper } = setup()
    it('renders the label if label provided', () => {
      // TODO
      expect(wrapper.find(".status").text()).toMatch("test-my-label")
    });

    it(" test is the columns show correctly", () => {
      expect(wrapper.find(".content").get(0).props.style.width).toEqual(160)
    })

  });

  describe('operation ', () => {
    const { wrapper } = setup()
    // console.log(wrapper.debug());
    it(" test onChange if click select all", () => {
      let selectAllBtn = wrapper.find(".item").at(0).find("input")
      expect(selectAllBtn).toHaveLength(1)
      selectAllBtn.simulate("change", { target: { checked: true } })
      expect(props.onChange.mock.calls.length).toEqual(1);
    })
    it("test onChange if click the item checkbox", () => {
      let otherCheckBtn = wrapper.find(".item").at(2).find("input")
      expect(otherCheckBtn).toHaveLength(1)
      otherCheckBtn.simulate('change', { target: { checked: false } })
      expect(props.onChange.mock.calls.length).toEqual(2);
    })
  })
});
