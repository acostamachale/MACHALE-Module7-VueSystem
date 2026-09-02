import { describe, it, expect } from 'vitest'
import { ref, computed } from 'vue'

// Simulate the filtering logic from App.vue
function useRecordFilter(records, searchTerm) {
  return computed(() => {
    const keyword = searchTerm.value.toLowerCase().trim()
    if (!keyword) return records.value
    return records.value.filter(record =>
      record.assetCode.toLowerCase().includes(keyword) ||
      record.equipmentName.toLowerCase().includes(keyword) ||
      record.brand.toLowerCase().includes(keyword) ||
      record.category.toLowerCase().includes(keyword) ||
      record.model.toLowerCase().includes(keyword) ||
      record.location.toLowerCase().includes(keyword) ||
      record.serialNumber.toLowerCase().includes(keyword)
    )
  })
}

describe('Record Search / Filter', () => {
  const mockRecords = ref([
    { id: '1', assetCode: 'EQP-001', equipmentName: 'Dell Latitude', brand: 'Dell', category: 'Laptop', model: '5520', location: 'Room 101', serialNumber: 'SN123' },
    { id: '2', assetCode: 'EQP-002', equipmentName: 'HP ProDesk', brand: 'HP', category: 'Desktop', model: '400', location: 'IT Office', serialNumber: 'SN456' },
    { id: '3', assetCode: 'EQP-003', equipmentName: 'Cisco Router', brand: 'Cisco', category: 'Router', model: '2901', location: 'Server Room', serialNumber: 'SN789' }
  ])

  it('returns all records when search term is empty', () => {
    const searchTerm = ref('')
    const filtered = useRecordFilter(mockRecords, searchTerm)
    expect(filtered.value.length).toBe(3)
  })

  it('filters records by asset code', () => {
    const searchTerm = ref('EQP-001')
    const filtered = useRecordFilter(mockRecords, searchTerm)
    expect(filtered.value.length).toBe(1)
    expect(filtered.value[0].assetCode).toBe('EQP-001')
  })

  it('filters records by brand (case insensitive)', () => {
    const searchTerm = ref('hp')
    const filtered = useRecordFilter(mockRecords, searchTerm)
    expect(filtered.value.length).toBe(1)
    expect(filtered.value[0].brand).toBe('HP')
  })

  it('filters records by multiple fields', () => {
    const searchTerm = ref('room')
    const filtered = useRecordFilter(mockRecords, searchTerm)
    expect(filtered.value.length).toBe(2)
  })

  it('returns empty array when no matches found', () => {
    const searchTerm = ref('xyznonexistent')
    const filtered = useRecordFilter(mockRecords, searchTerm)
    expect(filtered.value.length).toBe(0)
  })
})
