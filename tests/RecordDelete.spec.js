import { describe, it, expect } from 'vitest'

// Simulate delete confirmation logic
function confirmDelete(recordName, userConfirmed) {
  if (!userConfirmed) {
    return { deleted: false, message: 'Deletion cancelled by user' }
  }
  return { deleted: true, message: `Equipment "${recordName}" deleted successfully!` }
}

describe('Record Deletion', () => {
  it('deletes record when user confirms', () => {
    const result = confirmDelete('Dell Latitude 5520', true)
    expect(result.deleted).toBe(true)
    expect(result.message).toContain('deleted successfully')
  })

  it('cancels deletion when user declines', () => {
    const result = confirmDelete('Dell Latitude 5520', false)
    expect(result.deleted).toBe(false)
    expect(result.message).toContain('cancelled')
  })

  it('includes record name in success message', () => {
    const result = confirmDelete('HP ProDesk 400', true)
    expect(result.message).toContain('HP ProDesk 400')
  })
})
