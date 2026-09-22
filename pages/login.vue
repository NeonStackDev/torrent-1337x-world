<script setup>
import Checkbox from '~/components/Checkbox.vue';
import GuestLayout from '~/layouts/GuestLayout.vue';
import InputError from '~/components/InputError.vue';
import InputLabel from '~/components/InputLabel.vue';
import TextInput from '~/components/TextInput.vue';

const { $torrentApi } = useNuxtApp()
import { useAuth } from '~/utils/useAuth'
import { useForm } from '@inertiajs/vue3'
import { useRouter } from 'vue-router'
const router = useRouter()
const { setAuth } = useAuth()
const status = ref('')
const form = useForm({
    email: '',
    password: '',
    remember: false,
});
const str_error = ref('')
async function submit() {
    try {
        const response = await $torrentApi.login(form);
        // Save token
        const token = response.token;
        localStorage.setItem('token', token);        
        setAuth(response.user, response.token)  // ✅ updates state + localStorage
        // Optional: store user info
        localStorage.setItem('user', JSON.stringify(response.user));
        router.push('/');

    } catch (error) {
        str_error.value = "Invalid credentials"
    }

};

watchEffect(() => {
  useHead({
    title: 'Login - Torrent Downloads',
    meta: [
      { name: 'description', content: 'Login to your account on Torrent Downloads' },
      { property: 'og:description', content: 'Login to your account on Torrent Downloads' },
    ],
  })
})
</script>

<template>
    <GuestLayout>
        <div class="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
            <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 animate-fade-in">

                <h1 class="text-2xl font-bold text-center text-gray-800">Welcome Torrent</h1>
                <p class="text-center text-gray-500 text-sm">Sign in to your account</p>

                <div v-if="status" class="text-green-600 text-center font-medium">
                    {{ status }}
                </div>

                <form @submit.prevent="submit" class="space-y-4">
                    <!-- Email -->
                    <div>
                        <InputLabel for="email" value="Email" class="font-medium text-gray-700" />
                        <TextInput id="email" type="email"
                            class="block w-full focus:outline-none  border border-gray-600  px-4 py-2 rounded focus:border-orange-500"
                            v-model="form.email" required autofocus autocomplete="username" />
                        
                    </div>

                    <!-- Password -->
                    <div>
                        <InputLabel for="password" value="Password" class="font-medium text-gray-700" />
                        <TextInput id="password" type="password"
                            class="block w-full focus:outline-none  border border-gray-600  px-4 py-2 rounded focus:border-orange-500"
                            v-model="form.password" required autocomplete="current-password" />
                        <InputError class="mt-1 text-sm" :message="form.errors.password" />
                    </div>
                    <!-- Password -->
                    <p class="block w-full  text-center  text-red-800">
                        {{ str_error }}
                    </p>
                    <!-- Remember Me -->
                    <div class="flex items-center">
                        <Checkbox name="remember" v-model:checked="form.remember" />
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </div>
                    <div class="flex justify-between  gap-6 px-5">
                        <!-- Submit Button -->
                        <button type="submit" :disabled="form.processing"
                            class="w-full mt-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            Log in
                        </button>
                    </div>

                </form>


            </div>
        </div>
    </GuestLayout>
</template>

<style>
/* Smooth fade-in animation */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
}
</style>
