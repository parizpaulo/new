<script setup lang="ts">
import { UserEntity } from './domain/modules/user/user-entity';
import { ref } from 'vue';
import { useUserStore } from './domain/modules/user/user-store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { getErrors } = storeToRefs(userStore);

const userForm = ref<UserEntity>({
  name: '',
  email: '',
  age: 0,
});

async function createUser() {
  await userStore.create(userForm.value);
}
</script>

<template>
  <div class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
    <form @submit="createUser" class="bg-white px-8 pt-6 pb-8 mb-4 w-96 border border-gray-300 rounded-xl">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2"> Nome </label>

        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" placeholder="Nome" v-model="userForm.name" />
        <span class="text-sm text-red-600"> {{ getErrors.name }}</span>

      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          E-mail
        </label>

        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text" placeholder="E-mail" v-model="userForm.email" />
        <span class="text-sm text-red-600"> {{ getErrors.email }}</span>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Idade
        </label>

        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number" placeholder="Idade" v-model="userForm.age" />
        <span class="text-sm text-red-600"> {{ getErrors.age }}</span>
      </div>

      <button @click="createUser"
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button">
        Criar
      </button>
    </form>
  </div>
</template>
