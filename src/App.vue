<template>
  <div class="min-h-screen flex flex-col bg-bg">
    <!-- Header -->
    <AppHeader 
      :is-logged-in="isLoggedIn" 
      :profile="profile"
      @open-login="showLogin = true"
      @logout="handleLogout"
      @open-profile="showProfile = true"
    />

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
      <!-- Not Logged In State -->
      <div v-if="!isLoggedIn" class="flex flex-col items-center justify-center py-20">
        <div class="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg border border-slate-100">
          <div class="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-slate-800 mb-2">Electronics Management System</h2>
          <p class="text-slate-500 mb-6">Manage your electronic equipment inventory efficiently. Track assets, monitor conditions, and maintain accurate records.</p>
          <button 
            @click="showLogin = true"
            class="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login to System
          </button>
          <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p class="text-sm text-blue-700 font-medium">Demo Account</p>
            <p class="text-sm text-blue-600 mt-1">Email: acosta@gmail.com</p>
            <p class="text-sm text-blue-600">Password: admin123</p>
          </div>
        </div>
      </div>

      <!-- Logged In State -->
      <div v-else class="space-y-6">
        <!-- Welcome Banner -->
        <div class="bg-primary rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center gap-4">
            <img 
              :src="profile.avatar || defaultAvatar" 
              alt="Profile" 
              class="w-14 h-14 rounded-full object-cover border-3 border-white/30"
            />
            <div>
              <h2 class="text-xl font-bold">Welcome back, {{ profile.name }}!</h2>
              <p class="text-blue-200 text-sm">{{ profile.email }} | {{ profile.role }}</p>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div v-if="alert.message" :class="alertClass" class="rounded-lg px-4 py-3 flex items-center gap-3 animate-[slideIn_0.3s_ease-out]">
          <svg v-if="alert.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="alert.type === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">{{ alert.message }}</span>
          <button @click="alert.message = ''" class="ml-auto text-current opacity-60 hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Record Form -->
        <RecordForm 
          :is-editing="editingId !== null"
          :edit-data="editingRecord"
          @submit="handleSubmit"
          @cancel="handleCancelEdit"
        />

        <!-- Record List -->
        <RecordList 
          :records="records"
          :filtered-records="filteredRecords"
          v-model:search-term="searchTerm"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Login Modal -->
    <LoginModal 
      :show="showLogin" 
      @close="showLogin = false"
      @login="handleLogin"
    />

    <!-- Profile Modal -->
    <ProfileModal 
      :show="showProfile"
      :profile="profile"
      @close="showProfile = false"
      @save="handleProfileSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import LoginModal from './components/LoginModal.vue'
import ProfileModal from './components/ProfileModal.vue'

// Constants
const STORAGE_KEYS = {
  records: 'module7-electronics-records',
  profile: 'module7-electronics-profile',
  auth: 'module7-electronics-auth'
}

const defaultAvatar = 'https://ui-avatars.com/api/?name=Acosta+Machale&background=1e40af&color=fff&size=128'

// State
const records = ref([])
const searchTerm = ref('')
const editingId = ref(null)
const isLoggedIn = ref(false)
const showLogin = ref(false)
const showProfile = ref(false)

const profile = reactive({
  name: 'Acosta Machale',
  email: 'acosta@gmail.com',
  role: 'Administrator',
  avatar: ''
})

const alert = reactive({ type: '', message: '' })

// Computed
const editingRecord = computed(() => {
  if (!editingId.value) return null
  return records.value.find(r => r.id === editingId.value) || null
})

const filteredRecords = computed(() => {
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

const alertClass = computed(() => {
  if (alert.type === 'success') return 'bg-emerald-100 text-emerald-800 border border-emerald-200'
  if (alert.type === 'error') return 'bg-red-100 text-red-800 border border-red-200'
  return 'bg-blue-100 text-blue-800 border border-blue-200'
})

// Initialize
onMounted(() => {
  // Load records
  try {
    const savedRecords = localStorage.getItem(STORAGE_KEYS.records)
    if (savedRecords) {
      records.value = JSON.parse(savedRecords)
    }
  } catch (e) {
    records.value = []
  }

  // Load profile
  try {
    const savedProfile = localStorage.getItem(STORAGE_KEYS.profile)
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile)
      Object.assign(profile, parsed)
    } else {
      // Initialize default profile
      saveProfile()
    }
  } catch (e) {
    saveProfile()
  }

  // Load auth state
  try {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.auth)
    if (savedAuth) {
      isLoggedIn.value = JSON.parse(savedAuth)
    }
  } catch (e) {
    isLoggedIn.value = false
  }
})

// Helpers
function saveRecords() {
  localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(records.value))
}

function saveProfile() {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify({ ...profile }))
}

function saveAuth() {
  localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(isLoggedIn.value))
}

function showAlert(type, message) {
  alert.type = type
  alert.message = message
  setTimeout(() => { alert.message = '' }, 4000)
}

// Auth
function handleLogin(credentials) {
  // Demo account validation
  if (credentials.email === 'acosta@gmail.com' && credentials.password === 'admin123') {
    isLoggedIn.value = true
    saveAuth()
    showLogin.value = false
    showAlert('success', 'Welcome back, Acosta Machale!')
  } else {
    showAlert('error', 'Invalid email or password. Use the demo account.')
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    isLoggedIn.value = false
    saveAuth()
    showAlert('success', 'You have been logged out successfully.')
  }
}

// Profile
function handleProfileSave(updatedProfile) {
  Object.assign(profile, updatedProfile)
  saveProfile()
  showProfile.value = false
  showAlert('success', 'Profile updated successfully!')
}

// CRUD
function handleSubmit(formData) {
  if (editingId.value) {
    // Update
    const index = records.value.findIndex(r => r.id === editingId.value)
    if (index !== -1) {
      records.value[index] = { ...formData, id: editingId.value }
      saveRecords()
      showAlert('success', `Equipment "${formData.equipmentName}" updated successfully!`)
    }
    editingId.value = null
  } else {
    // Create
    const newRecord = {
      ...formData,
      id: Date.now().toString()
    }
    records.value.push(newRecord)
    saveRecords()
    showAlert('success', `Equipment "${formData.equipmentName}" added successfully!`)
  }
}

function handleEdit(record) {
  editingId.value = record.id
  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleCancelEdit() {
  editingId.value = null
}

function handleDelete(id) {
  const record = records.value.find(r => r.id === id)
  records.value = records.value.filter(r => r.id !== id)
  saveRecords()
  showAlert('success', `Equipment "${record?.equipmentName || ''}" deleted successfully!`)
}
</script>

<style>
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
