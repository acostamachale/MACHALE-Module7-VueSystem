import { describe, it, expect } from 'vitest'

// Simulate login validation logic
function validateLogin(email, password) {
  if (!email || !password) return { success: false, message: 'Email and password are required' }
  if (!email.includes('@gmail.com')) return { success: false, message: 'Invalid email format. Use @gmail.com' }
  if (email === 'acosta@gmail.com' && password === 'admin123') {
    return { success: true, message: 'Welcome back, Acosta Machale!' }
  }
  return { success: false, message: 'Invalid email or password' }
}

describe('Login Authentication', () => {
  it('accepts valid demo credentials', () => {
    const result = validateLogin('acosta@gmail.com', 'admin123')
    expect(result.success).toBe(true)
    expect(result.message).toContain('Welcome back')
  })

  it('rejects incorrect password', () => {
    const result = validateLogin('acosta@gmail.com', 'wrongpassword')
    expect(result.success).toBe(false)
    expect(result.message).toContain('Invalid')
  })

  it('rejects incorrect email', () => {
    const result = validateLogin('wrong@gmail.com', 'admin123')
    expect(result.success).toBe(false)
  })

  it('rejects empty credentials', () => {
    const result = validateLogin('', '')
    expect(result.success).toBe(false)
    expect(result.message).toContain('required')
  })

  it('rejects non-gmail email format', () => {
    const result = validateLogin('admin@example.com', 'admin123')
    expect(result.success).toBe(false)
    expect(result.message).toContain('@gmail.com')
  })
})
