<template>
  <header class="bg-primary text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="bg-white/20 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold leading-tight">Electronics Management</h1>
            <p class="text-xs text-blue-200">Module 7 - SE1</p>
          </div>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-3">
          <template v-if="isLoggedIn">
            <!-- Profile Button -->
            <button 
              @click="$emit('open-profile')"
              class="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all duration-200"
            >
              <img 
                :src="profile.avatar || defaultAvatar" 
                alt="Profile" 
                class="w-8 h-8 rounded-full object-cover border-2 border-white/30"
              />
              <span class="hidden sm:inline text-sm font-medium">{{ profile.name }}</span>
            </button>

            <!-- Logout -->
            <button 
              @click="$emit('logout')"
              class="bg-danger/80 hover:bg-danger px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Logout</span>
            </button>
          </template>

          <template v-else>
            <button 
              @click="$emit('open-login')"
              class="bg-white text-primary hover:bg-blue-50 px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isLoggedIn: Boolean,
  profile: Object
})

defineEmits(['open-login', 'logout', 'open-profile'])

const defaultAvatar = 'https://ui-avatars.com/api/?name=Acosta+Machale&background=1e40af&color=fff&size=128'
</script>
