<template>
  <v-container>
    <v-card class="pa-4 d-flex">
      <v-card-title class="text-h5">Управление учетными записями</v-card-title>
      <v-card-actions>
        <v-btn class="white" @click="addAccount">Добавить учетную запись</v-btn>
      </v-card-actions>
    </v-card>

    <v-row>
      <v-col v-for="account in accountsStore.accounts" :key="account.id" cols="12">
        <AccountItem :account="account" @update="updateAccount" @delete="deleteAccount" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AccountItem from './AccountItem.vue';
import { useAccountsStore } from '../store/useAccountsStore';

const accountsStore = useAccountsStore();

function addAccount() {
  accountsStore.addAccount();
}

function updateAccount(updatedAccount: any) {
  accountsStore.updateAccount(updatedAccount);
}

function deleteAccount(id: number) {
  accountsStore.deleteAccount(id);
}
</script>
