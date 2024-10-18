<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { UserEntity } from './domain/modules/user/user-entity';

import { useUserStore } from './domain/modules/user/user-store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { getErrors, getUsers, getUserSelected } = storeToRefs(userStore);

import { v4 as uuidv4 } from 'uuid';


const userForm = ref<UserEntity>({
  name: '',
  email: '',
  age: 0,
  id: uuidv4()
});

async function createUser() {
  await userStore.create(userForm.value);
}

async function deleteUser(id: number) {
  await userStore.deleteUser(id)
}

async function getUser(id: number) {
  await userStore.getUserById(id)
}

onMounted(async () => {
  await userStore.fetchGetUsers()
})
</script>

<template>
  <main class="m-10">

    <div class="flex justify-between">


      <form @submit="createUser" class="bg-white p-6 mb-4 w-96 border border-gray-300 rounded-xl">
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


      <section class="border border-gray-300 rounded-xl p-6 h-min w-80" v-if="getUserSelected.id">

        <h1 class="text-lg font-semibold">
          {{ getUserSelected.name }}
        </h1>

        <div class="grid gap-1">
          <span class="text-sm text-gray-500">
            {{ getUserSelected.email }}
          </span>
          <span class="text-sm text-gray-500">Idade: {{ getUserSelected.age }}</span>
        </div>
      </section>

    </div>


    <section class="grid grid-cols-6 gap-3 mt-11">
      <div class="p-5 rounded-md border border-gray-200 flex items-center justify-between "
        v-for="(item, index) in getUsers" :key="index">

        <div class="grid gap-1">
          <h1 class="text-lg font-semibold">
            {{ item.name }}
          </h1>
          <span class="text-sm text-gray-500">
            {{ item.email }}
          </span>
          <span class="text-sm text-gray-500">Idade: {{ item.age }}</span>
        </div>

        <div class="flex items-end gap-0.5 flex-col">
          <button class="text-sm text-red-600" @click="deleteUser(item.id)">Remover</button>
          <button class="text-sm text-blue-600" @click="getUser(item.id)">Visualizar</button>

        </div>

      </div>
    </section>

  </main>

</template>
