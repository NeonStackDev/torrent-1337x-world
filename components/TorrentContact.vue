<template>
  <div class="bg-gray-100 border border-gray-300 shadow-md">
    <!-- Header -->
    <div class=" bg-gray-300 p-4 ">
      <h1 class="text-red-700 font-bold">Contact 1331x</h1>
    </div>

    <form class=" p-6 space-y-4 text-black">
      <!-- Regarding -->
      <div>
        <label class="block font-semibold mb-1">Regarding</label>
        <select v-model="regarding" class="w-full border border-gray-300 rounded px-3 py-2">
          <option value="General info">General info</option>
          <option value="Report abuse">Report abuse</option>
          <option value="Technical issue">Technical issue</option>
        </select>
      </div>

      <!-- Your Name -->
      <div>
        <label class="block font-semibold mb-1">Your Name:</label>
        <input v-model="name" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      <!-- Your Email -->
      <div>
        <label class="block font-semibold mb-1">Your E-Mail:</label>
        <input v-model="email" type="email" class="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      <!-- Message -->
      <div>
        <label class="block font-semibold mb-1">Message:</label>
        <textarea v-model="message" rows="4" placeholder="Enter your Message here."
          class="w-full border border-gray-300 rounded px-3 py-2"></textarea>
      </div>

      <!-- Captcha -->
      <div class="max-w-sm mx-auto p-4 border rounded-lg shadow space-y-4 bg-white">
        <h2 class="text-lg font-semibold text-gray-700">Captcha Verification</h2>

        <!-- Captcha Display -->
        <div class="flex items-center gap-4">
          <div class="px-4 py-2 text-xl font-bold tracking-widest select-none"
            :style="{ backgroundColor: '#f3f4f6', letterSpacing: '4px', transform: `rotate(${rotation}deg)` }">
            {{ captcha }}
          </div>
          <button aria-label="refresh" class="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            Refresh
          </button>
        </div>

        <!-- User Input -->
        <input type="text" v-model="userInput" placeholder="Enter captcha here"
          class="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400" />

        <!-- Verify Button -->
        <button aria-label="verify" class="w-full py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600">
          Verify
        </button>

      </div>

      <!-- Submit -->
      <div>
        <button type="submit" aria-label="send" class="bg-green-600 text-white font-bold px-4 py-2 rounded hover:bg-green-700">
          SEND MESSAGE
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'


onMounted(() => {
  generateCaptcha();
})

const generateCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  captcha.value = Array.from({ length: 6 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  rotation.value = Math.floor(Math.random() * 10) - 5; // small rotation
  userInput.value = "";
  message.value = "";
}





const regarding = ref('General info')
const rotation = ref(0)
const userInput = ref(0)
const name = ref('')
const email = ref('')
const message = ref('')
const captcha = ref('')
</script>
