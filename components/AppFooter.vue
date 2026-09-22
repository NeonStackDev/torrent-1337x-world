<!-- components/AppFooter.vue -->
<template>
  <footer class="bg-slate-800 text-white py-8 mt-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Logo and Description -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <h3 class="text-2xl font-bold text-orange-500">1331<span class="text-white">X</span></h3>
          </div>
          <p class="text-gray-400 mb-4">
            Your ultimate destination for high-quality torrents and streaming content. 
            We provide a platform that prioritizes quality, speed, and reliability.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-orange-500 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-lg mb-4 text-orange-500">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="/" class="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="/trending" class="text-gray-400 hover:text-white transition-colors">Trending</a></li>
            <li><a href="/movies" class="text-gray-400 hover:text-white transition-colors">Movies</a></li>
            <li><a href="/tv" class="text-gray-400 hover:text-white transition-colors">TV Shows</a></li>
            <li><a href="/top100" class="text-gray-400 hover:text-white transition-colors">Top 100</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="font-bold text-lg mb-4 text-orange-500">Support</h4>
          <ul class="space-y-2">
            <li><a href="/help" class="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="/contact" class="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="/rules" class="text-gray-400 hover:text-white transition-colors">Community Rules</a></li>
            <li><a href="/privacy" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" class="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-slate-700 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-center md:text-left">
            <p class="text-gray-400">&copy; {{ currentYear }} 1331x.cc - All rights reserved</p>
            <p class="text-gray-500 text-sm mt-1">Your ultimate destination for high-quality torrents</p>
          </div>
          
          <div class="mt-4 md:mt-0 flex items-center space-x-4">
            <span class="text-gray-400 text-sm">Server Status:</span>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
              <span class="text-green-400 text-sm font-semibold">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>