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
describe('Record Status Filter', () => {
  const mockRecords = ref([
    { id: '1', assetCode: 'EQP-001', equipmentName: 'Dell Latitude', brand: 'Dell', category: 'Laptop', model: '5520', location: 'Room 101', serialNumber: 'SN123', status: 'Available' },
    { id: '2', assetCode: 'EQP-002', equipmentName: 'HP ProDesk', brand: 'HP', category: 'Desktop', model: '400', location: 'IT Office', serialNumber: 'SN456', status: 'In Use' },
    { id: '3', assetCode: 'EQP-003', equipmentName: 'Cisco Router', brand: 'Cisco', category: 'Router', model: '2901', location: 'Server Room', serialNumber: 'SN789', status: 'Under Repair' },
    { id: '4', assetCode: 'EQP-004', equipmentName: 'Old Printer', brand: 'Canon', category: 'Printer', model: 'X200', location: 'Storage', serialNumber: 'SN000', status: 'Retired' }
  ])

  function useStatusFilter(records, filterStatus) {
    return computed(() => {
      if (filterStatus.value === 'All') return records.value
      return records.value.filter(record => record.status === filterStatus.value)
    })
  }

  it('shows all records when status filter is All', () => {
    const filterStatus = ref('All')
    const filtered = useStatusFilter(mockRecords, filterStatus)
    expect(filtered.value.length).toBe(4)
  })

  it('filters records by Available status', () => {
    const filterStatus = ref('Available')
    const filtered = useStatusFilter(mockRecords, filterStatus)
    expect(filtered.value.length).toBe(1)
    expect(filtered.value[0].equipmentName).toBe('Dell Latitude')
  })

  it('filters records by In Use status', () => {
    const filterStatus = ref('In Use')
    const filtered = useStatusFilter(mockRecords, filterStatus)
    expect(filtered.value.length).toBe(1)
    expect(filtered.value[0].status).toBe('In Use')
  })

  it('filters records by Under Repair status', () => {
    const filterStatus = ref('Under Repair')
    const filtered = useStatusFilter(mockRecords, filterStatus)
    expect(filtered.value.length).toBe(1)
    expect(filtered.value[0].assetCode).toBe('EQP-003')
  })

  it('filters records by Retired status', () => {
    const filterStatus = ref('Retired')
    const filtered = useStatusFilter(mockRecords, filterStatus)
    expect(filtered.value.length).toBe(1)
    expect(filtered.value[0].status).toBe('Retired')
  })

  it('returns empty array when no records match status filter', () => {
    const emptyRecords = ref([
      { id: '1', assetCode: 'EQP-001', equipmentName: 'Dell', status: 'Available' }
    ])
    const filterStatus = ref('Retired')
    const filtered = useStatusFilter(emptyRecords, filterStatus)
    expect(filtered.value.length).toBe(0)
  })
})