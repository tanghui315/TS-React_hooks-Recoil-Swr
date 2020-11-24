// TODO more tests
import { shallow, configure, mount } from 'enzyme';
import React from 'react'
import { RecoilRoot } from 'recoil'
import Home from './Index'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() })


const setup = () => {

    const wrapper = mount(<RecoilRoot><Home /></RecoilRoot>)
    return {
        wrapper
    }
}

describe('Home', () => {
    const { wrapper } = setup()
    it(" test all checkout status if click select all", () => {
        let selectAllBtn = wrapper.find(".item").at(0).find("input")
        expect(selectAllBtn).toHaveLength(1)
        selectAllBtn.simulate("change", { target: { checked: true } })
        wrapper.find(".item").forEach(ele => {
            expect(ele.find('input').get(0).props.checked).toEqual(true)
        })
    })
})