<template>
  <div class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
    <!-- Header with Filter and Search -->
    <div class="bg-slate-50 px-6 py-4 border-b border-slate-200 space-y-4">
      <!-- Top Row: Title + Search -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="bg-primary/10 p-1.5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-800">Equipment Records</h2>
            <p class="text-xs text-slate-500">{{ totalCount }} total record{{ totalCount !== 1 ? 's' : '' }}</p>
          </div>
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-72">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            :value="searchTerm"
            @input="$emit('update:searchTerm', $event.target.value)"
            type="text" 
            placeholder="Search by name, code, brand..."
            class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      <!-- Bottom Row: Status Filter -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm font-medium text-slate-600">Filter by Status:</span>
        <button
          v-for="status in ['All', 'Available', 'In Use', 'Under Repair', 'Retired']"
          :key="status"
          @click="$emit('setFilterStatus', status)"
          :class="filterStatus === status
            ? 'bg-blue-600 text-white shadow-sm'
            : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'"
          class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
        >
          {{ status }}
        </button>
        <span class="ml-auto text-sm text-slate-500 font-medium">
          Showing {{ filteredCount }} of {{ totalCount }} records
        </span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-slate-100 text-slate-600 text-xs uppercase font-semibold">
          <tr>
            <th class="px-6 py-3">Asset Code</th>
            <th class="px-6 py-3">Equipment</th>
            <th class="px-6 py-3 hidden md:table-cell">Category</th>
            <th class="px-6 py-3 hidden lg:table-cell">Brand</th>
            <th class="px-6 py-3 hidden xl:table-cell">Serial No.</th>
            <th class="px-6 py-3">Condition</th>
            <th class="px-6 py-3">Status</th>
            <th class="px-6 py-3 hidden lg:table-cell">Location</th>
            <th class="px-6 py-3 text-center">Qty</th>
            <th class="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="record in filteredRecords" :key="record.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 font-mono text-sm text-slate-700">{{ record.assetCode }}</td>
            <td class="px-6 py-4">
              <div class="font-medium text-slate-800">{{ record.equipmentName }}</div>
              <div class="text-xs text-slate-500">{{ record.model }}</div>
            </td>
            <td class="px-6 py-4 hidden md:table-cell">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ record.category }}
              </span>
            </td>
            <td class="px-6 py-4 hidden lg:table-cell text-sm text-slate-600">{{ record.brand }}</td>
            <td class="px-6 py-4 hidden xl:table-cell font-mono text-xs text-slate-500">{{ record.serialNumber }}</td>
            <td class="px-6 py-4">
              <span :class="conditionClass(record.condition)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ record.condition }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span :class="statusClass(record.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                <span :class="statusDot(record.status)" class="w-1.5 h-1.5 rounded-full mr-1.5"></span>
                {{ record.status }}
              </span>
            </td>
            <td class="px-6 py-4 hidden lg:table-cell text-sm text-slate-600">{{ record.location }}</td>
            <td class="px-6 py-4 text-center font-semibold text-slate-700">{{ record.quantity }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center justify-center gap-2">
                <button 
                  @click="$emit('edit', record)"
                  class="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="handleDelete(record)"
                  class="p-1.5 text-danger hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredRecords.length === 0">
            <td colspan="10" class="px-6 py-12 text-center">
              <div class="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-slate-500 font-medium">No records found</p>
                <p class="text-slate-400 text-sm mt-1">Try adjusting your search or add a new record</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary Footer -->
    <div class="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
      <span>
        Showing {{ filteredCount }} of {{ totalCount }} records
        <span v-if="filterStatus !== 'All'" class="text-blue-600 font-medium ml-1">(Status: {{ filterStatus }})</span>
        <span v-if="searchTerm" class="text-primary font-medium ml-1">(Search: "{{ searchTerm }}")</span>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  records: Array,
  filteredRecords: Array,
  searchTerm: String,
  filterStatus: String,
  filteredCount: Number,
  totalCount: Number
})

const emit = defineEmits(['update:searchTerm', 'edit', 'delete', 'setFilterStatus'])

function handleDelete(record) {
  const confirmed = window.confirm(`Are you sure you want to delete "${record.equipmentName}" (${record.assetCode})?`)
  if (confirmed) {
    emit('delete', record.id)
  }
}

function conditionClass(condition) {
  const map = {
    'New': 'bg-emerald-100 text-emerald-800',
    'Good': 'bg-blue-100 text-blue-800',
    'Fair': 'bg-amber-100 text-amber-800',
    'Poor': 'bg-red-100 text-red-800'
  }
  return map[condition] || 'bg-slate-100 text-slate-800'
}

function statusClass(status) {
  const map = {
    'Available': 'bg-emerald-100 text-emerald-800',
    'In Use': 'bg-blue-100 text-blue-800',
    'Under Repair': 'bg-amber-100 text-amber-800',
    'Retired': 'bg-slate-100 text-slate-600'
  }
  return map[status] || 'bg-slate-100 text-slate-800'
}

function statusDot(status) {
  const map = {
    'Available': 'bg-emerald-500',
    'In Use': 'bg-blue-500',
    'Under Repair': 'bg-amber-500',
    'Retired': 'bg-slate-400'
  }
  return map[status] || 'bg-slate-400'
}
</script>