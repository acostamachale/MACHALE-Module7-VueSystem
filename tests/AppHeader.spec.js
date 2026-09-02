import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../src/components/AppHeader.vue'

describe('AppHeader.vue', () => {
  it('renders the system title correctly', () => {
    const wrapper = mount(AppHeader, {
      props: {
        isLoggedIn: false,
        profile: { name: 'Acosta Machale', email: 'acosta@gmail.com', role: 'Administrator', avatar: '' }
      }
    })
    expect(wrapper.text()).toContain('Electronics Management')
    expect(wrapper.text()).toContain('Module 7 - SE1')
  })

  it('shows login button when user is not logged in', () => {
    const wrapper = mount(AppHeader, {
      props: {
        isLoggedIn: false,
        profile: { name: 'Acosta Machale', email: 'acosta@gmail.com', role: 'Administrator', avatar: '' }
      }
    })
    expect(wrapper.text()).toContain('Login')
    expect(wrapper.text()).not.toContain('Logout')
  })

  it('shows logout button and profile when user is logged in', () => {
    const wrapper = mount(AppHeader, {
      props: {
        isLoggedIn: true,
        profile: { name: 'Acosta Machale', email: 'acosta@gmail.com', role: 'Administrator', avatar: '' }
      }
    })
    expect(wrapper.text()).toContain('Logout')
    expect(wrapper.text()).toContain('Acosta Machale')
    expect(wrapper.text()).not.toContain('Login')
  })
})
