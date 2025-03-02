<template>
  <v-container class="mt-4">
    <v-card class="mb-6" flat>
      <v-card-item class="pa-4 bg-primary">
        <div class="d-flex align-center justify-space-between">
          <v-card-title class="text-h5 text-white">Управление учетными записями</v-card-title>
          <v-btn
            color="white"
            variant="elevated"
            prepend-icon="mdi-plus"
            @click="addAccount"
          >
            Добавить учетную запись
          </v-btn>
        </div>
      </v-card-item>
    </v-card>

    <v-row class="mx-0" density="compact">
      <v-col
        v-for="account in accountsStore.accounts"
        :key="account.id"
        rows="2" cols="3" md="8" lg="6"
        class="py-2"
      >
        <AccountItem
          :account="account"
          @update="updateAccount"
          @delete="deleteAccount"
        />
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
