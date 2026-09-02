<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
      <!-- Header -->
      <div class="bg-primary px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h2 class="text-lg font-bold">My Profile</h2>
        </div>
        <button @click="$emit('close')" class="text-white/70 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Avatar Section -->
        <div class="text-center mb-6">
          <div class="relative inline-block">
            <img 
              :src="form.avatar || defaultAvatar" 
              alt="Profile" 
              class="w-24 h-24 rounded-full object-cover border-4 border-primary/20 mx-auto"
            />
            <label class="absolute bottom-0 right-0 bg-primary hover:bg-primary-dark text-white p-2 rounded-full cursor-pointer shadow-lg transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input type="file" accept="image/*" class="hidden" @change="handleImageChange" />
            </label>
          </div>
          <p class="text-xs text-slate-500 mt-2">Click the camera icon to change photo</p>
        </div>

        <form @submit.prevent="handleSave" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Enter your full name"
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              :class="{ 'border-danger': errors.name }"
            />
            <p v-if="errors.name" class="text-danger text-xs mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="acosta@gmail.com"
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              :class="{ 'border-danger': errors.email }"
            />
            <p v-if="errors.email" class="text-danger text-xs mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <input 
              v-model="form.role" 
              type="text" 
              disabled
              class="w-full px-4 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 cursor-not-allowed"
            />
          </div>

          <div class="flex gap-3 pt-2">
            <button 
              type="button"
              @click="$emit('close')"
              class="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({ 
  show: Boolean,
  profile: Object
})
const emit = defineEmits(['close', 'save'])

const defaultAvatar = 'https://ui-avatars.com/api/?name=Acosta+Machale&background=1e40af&color=fff&size=128'

const form = reactive({
  name: '',
  email: '',
  role: 'Administrator',
  avatar: ''
})

const errors = reactive({ name: '', email: '' })

watch(() => props.show, (val) => {
  if (val && props.profile) {
    form.name = props.profile.name || ''
    form.email = props.profile.email || ''
    form.role = props.profile.role || 'Administrator'
    form.avatar = props.profile.avatar || ''
    errors.name = ''
    errors.email = ''
  }
})

function handleImageChange(event) {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('Image must be less than 2MB')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    form.avatar = e.target.result
  }
  reader.readAsDataURL(file)
}

function handleSave() {
  errors.name = ''
  errors.email = ''

  let hasError = false

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    hasError = true
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    hasError = true
  } else if (!form.email.includes('@gmail.com') && !form.email.includes('@')) {
    errors.email = 'Please enter a valid email'
    hasError = true
  }

  if (hasError) return

  emit('save', { 
    name: form.name.trim(), 
    email: form.email.trim(), 
    role: form.role,
    avatar: form.avatar 
  })
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
