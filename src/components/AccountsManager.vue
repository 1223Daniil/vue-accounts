<template>
    <div class="accounts-manager">
      <h1>Управление учетными записями</h1>
      <button @click="addAccount">+</button>
      <div v-for="account in accountsStore.accounts" :key="account.id">
        <AccountItem
          :account="account"
          @update="updateAccount"
          @delete="deleteAccount"
        />
      </div>
    </div>
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
  
  <style scoped>
  .accounts-manager {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
  }
  </style>
  