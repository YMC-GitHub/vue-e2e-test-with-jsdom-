import { shallowMount } from '@vue/test-utils'
import Counter from '../src/Counter.vue'

describe('Counter.vue', () => {
  const wrapper = shallowMount(Counter)
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true)
  })

  it('increments count when button is clicked', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.find('span').text()).toMatch('1')
  })
  it('it set the data count to 10', () => {
    wrapper.setData({ count: 10 })
    expect(wrapper.find('span').text()).toMatch('10')
  })
})