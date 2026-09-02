import { describe, it, expect } from 'vitest'

// Simulate profile save validation
function validateProfileUpdate(profile) {
  const errors = {}
  let hasError = false

  if (!profile.name || !profile.name.trim()) {
    errors.name = 'Name is required'
    hasError = true
  }
  if (!profile.email || !profile.email.trim()) {
    errors.email = 'Email is required'
    hasError = true
  } else if (!profile.email.includes('@gmail.com') && !profile.email.includes('@')) {
    errors.email = 'Please enter a valid email'
    hasError = true
  }

  return { valid: !hasError, errors }
}

describe('Profile Update Validation', () => {
  it('accepts valid profile data', () => {
    const result = validateProfileUpdate({
      name: 'Machale Acosta',
      email: 'machale@gmail.com',
      role: 'Administrator',
      avatar: 'data:image/png;base64,...'
    })
    expect(result.valid).toBe(true)
    expect(Object.keys(result.errors).length).toBe(0)
  })

  it('rejects empty name', () => {
    const result = validateProfileUpdate({
      name: '',
      email: 'machale@gmail.com',
      role: 'Administrator',
      avatar: ''
    })
    expect(result.valid).toBe(false)
    expect(result.errors.name).toBe('Name is required')
  })

  it('rejects empty email', () => {
    const result = validateProfileUpdate({
      name: 'Machale Acosta',
      email: '',
      role: 'Administrator',
      avatar: ''
    })
    expect(result.valid).toBe(false)
    expect(result.errors.email).toBe('Email is required')
  })

  it('accepts profile with base64 avatar image', () => {
    const result = validateProfileUpdate({
      name: 'Acosta Machale',
      email: 'acosta@gmail.com',
      role: 'Administrator',
      avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...'
    })
    expect(result.valid).toBe(true)
  })
})
