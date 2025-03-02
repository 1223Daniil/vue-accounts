<template>
  <v-card class="account-item pa-4">
    <v-text-field
      v-model="localAccount.rawLabel"
      label="Метка (необязательно, макс 50 символов)"
      maxlength="50"
      :error="errors.label"
      @blur="onBlur"
    />

    <v-select
      v-model="localAccount.type"
      label="Тип записи"
      :items="['LDAP', 'Локальная']"
      @change="onTypeChange"
    />

    <v-text-field
      v-model="localAccount.login"
      label="Логин (обязательно, макс 100 символов)"
      maxlength="100"
      :error="errors.login"
      @blur="onBlur"
    />

    <v-text-field
      v-if="localAccount.type === 'Локальная'"
      v-model="localAccount.password"
      label="Пароль (обязательно, макс 100 символов)"
      maxlength="100"
      :error="errors.password"
      type="password"
      @blur="onBlur"
    />

    <v-btn color="red" @click="deleteAccount">Удалить</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Account } from '../store/useAccountsStore';

const props = defineProps<{ account: Account }>();
const emit = defineEmits<{ (e: 'update', account: Account): void; (e: 'delete', id: number): void }>();

const localAccount = ref({ ...props.account });

const errors = ref({ label: false, login: false, password: false });

function validate() {
  errors.value = { label: false, login: false, password: false };

  if (localAccount.value.rawLabel.length > 50) errors.value.label = true;
  if (!localAccount.value.login || localAccount.value.login.length > 100) errors.value.login = true;
  if (localAccount.value.type === 'Локальная' && (!localAccount.value.password || localAccount.value.password.length > 100)) {
    errors.value.password = true;
  }

  return !errors.value.label && !errors.value.login && !errors.value.password;
}

function updateAccount() {
  if (validate()) {
    localAccount.value.label = localAccount.value.rawLabel.split(';').map(text => ({ text: text.trim() }));
    if (localAccount.value.type === 'LDAP') localAccount.value.password = null;
    emit('update', { ...localAccount.value });
  }
}

function onBlur() {
  updateAccount();
}

function onTypeChange() {
  if (localAccount.value.type === 'LDAP') localAccount.value.password = null;
  updateAccount();
}

function deleteAccount() {
  emit('delete', localAccount.value.id);
}

watch(() => props.account, newVal => { localAccount.value = { ...newVal }; });
</script>

<style scoped>
.account-item {
  margin-bottom: 1rem;
}
</style>
