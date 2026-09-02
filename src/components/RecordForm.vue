<template>
  <div class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
    <div class="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
      <div class="bg-primary/10 p-1.5 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path v-if="isEditing" stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <h2 class="text-lg font-bold text-slate-800">{{ isEditing ? 'Edit Equipment' : 'Add New Equipment' }}</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Asset Code -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Asset Code <span class="text-danger">*</span>
          </label>
          <input 
            v-model="form.assetCode" 
            type="text" 
            placeholder="EQP-001"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.assetCode }"
          />
          <p v-if="errors.assetCode" class="text-danger text-xs mt-1">{{ errors.assetCode }}</p>
        </div>

        <!-- Equipment Name -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Equipment Name <span class="text-danger">*</span>
          </label>
          <input 
            v-model="form.equipmentName" 
            type="text" 
            placeholder="Dell Latitude 5520"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.equipmentName }"
          />
          <p v-if="errors.equipmentName" class="text-danger text-xs mt-1">{{ errors.equipmentName }}</p>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Category <span class="text-danger">*</span>
          </label>
          <select 
            v-model="form.category"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
            :class="{ 'border-danger': errors.category }"
          >
            <option value="">Select Category</option>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="Monitor">Monitor</option>
            <option value="Printer">Printer</option>
            <option value="Router">Router</option>
            <option value="Switch">Switch</option>
            <option value="Projector">Projector</option>
            <option value="UPS">UPS</option>
            <option value="Server">Server</option>
            <option value="Other">Other</option>
          </select>
          <p v-if="errors.category" class="text-danger text-xs mt-1">{{ errors.category }}</p>
        </div>

        <!-- Brand -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Brand <span class="text-danger">*</span>
          </label>
          <input 
            v-model="form.brand" 
            type="text" 
            placeholder="Dell, HP, Cisco..."
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.brand }"
          />
          <p v-if="errors.brand" class="text-danger text-xs mt-1">{{ errors.brand }}</p>
        </div>

        <!-- Model -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Model <span class="text-danger">*</span>
          </label>
          <input 
            v-model="form.model" 
            type="text" 
            placeholder="Latitude 5520"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.model }"
          />
          <p v-if="errors.model" class="text-danger text-xs mt-1">{{ errors.model }}</p>
        </div>

        <!-- Serial Number -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Serial Number <span class="text-danger">*</span>
          </label>
          <input 
            v-model="form.serialNumber" 
            type="text" 
            placeholder="SN123456789"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.serialNumber }"
          />
          <p v-if="errors.serialNumber" class="text-danger text-xs mt-1">{{ errors.serialNumber }}</p>
        </div>

        <!-- Condition -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Condition <span class="text-danger">*</span>
          </label>
          <select 
            v-model="form.condition"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
            :class="{ 'border-danger': errors.condition }"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
          <p v-if="errors.condition" class="text-danger text-xs mt-1">{{ errors.condition }}</p>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Status <span class="text-danger">*</span>
          </label>
          <select 
            v-model="form.status"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
            :class="{ 'border-danger': errors.status }"
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Under Repair">Under Repair</option>
            <option value="Retired">Retired</option>
          </select>
          <p v-if="errors.status" class="text-danger text-xs mt-1">{{ errors.status }}</p>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Location <span class="text-danger">*</span>
          </label>
          <input 
            v-model="form.location" 
            type="text" 
            placeholder="Room 101, IT Office..."
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.location }"
          />
          <p v-if="errors.location" class="text-danger text-xs mt-1">{{ errors.location }}</p>
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Quantity <span class="text-danger">*</span>
          </label>
          <input 
            v-model.number="form.quantity" 
            type="text" 
            min="1"
            placeholder="1"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.quantity }"
          />
          <p v-if="errors.quantity" class="text-danger text-xs mt-1">{{ errors.quantity }}</p>
        </div>

        <!-- Date Acquired -->
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">
            Date Acquired <span class="text-danger">*</span>
          </label>
          <input 
            v-model="form.dateAcquired" 
            type="date"
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            :class="{ 'border-danger': errors.dateAcquired }"
          />
          <p v-if="errors.dateAcquired" class="text-danger text-xs mt-1">{{ errors.dateAcquired }}</p>
        </div>

        <!-- Notes -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
          <textarea 
            v-model="form.notes" 
            rows="2"
            placeholder="Additional information..."
            class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 mt-6 pt-4 border-t border-slate-100">
        <button 
          v-if="isEditing"
          type="button"
          @click="handleCancel"
          class="px-5 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-all duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>
        <button 
          type="submit" 
          class="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <svg v-if="isEditing" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {{ isEditing ? 'Update Equipment' : 'Add Equipment' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  isEditing: Boolean,
  editData: Object
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  assetCode: '',
  equipmentName: '',
  category: '',
  brand: '',
  model: '',
  serialNumber: '',
  condition: '',
  status: '',
  location: '',
  quantity: 1,
  dateAcquired: '',
  notes: ''
})

const errors = reactive({
  assetCode: '',
  equipmentName: '',
  category: '',
  brand: '',
  model: '',
  serialNumber: '',
  condition: '',
  status: '',
  location: '',
  quantity: '',
  dateAcquired: ''
})

watch(() => props.editData, (data) => {
  if (data) {
    Object.assign(form, data)
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  form.assetCode = ''
  form.equipmentName = ''
  form.category = ''
  form.brand = ''
  form.model = ''
  form.serialNumber = ''
  form.condition = ''
  form.status = ''
  form.location = ''
  form.quantity = 1
  form.dateAcquired = ''
  form.notes = ''
  clearErrors()
}

function clearErrors() {
  Object.keys(errors).forEach(key => errors[key] = '')
}

function handleSubmit() {
  clearErrors()
  let hasError = false

  const required = ['assetCode', 'equipmentName', 'category', 'brand', 'model', 'serialNumber', 'condition', 'status', 'location', 'dateAcquired']
  required.forEach(field => {
    if (!form[field] || (typeof form[field] === 'string' && !form[field].trim())) {
      errors[field] = 'This field is required'
      hasError = true
    }
  })

  // DEFECT FIX: Added proper integer and NaN validation
  // Before fix: only checked `!form.quantity || form.quantity < 1`
  // This allowed decimals (2.5), NaN, and non-numeric strings to pass
  if (form.quantity === '' || form.quantity === null || form.quantity === undefined || isNaN(form.quantity)) {
    errors.quantity = 'Quantity must be a valid number'
    hasError = true
  } else if (!Number.isInteger(Number(form.quantity))) {
    errors.quantity = 'Quantity must be a whole number (no decimals)'
    hasError = true
  } else if (Number(form.quantity) < 1) {
    errors.quantity = 'Quantity must be at least 1'
    hasError = true
  }

  if (hasError) return

  emit('submit', { ...form })
  if (!props.isEditing) resetForm()
}

function handleCancel() {
  resetForm()
  emit('cancel')
}
</script>
