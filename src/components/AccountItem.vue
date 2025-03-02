<template>
    <div class="account-item">
      <input
        v-model="localAccount.rawLabel"
        @blur="onBlur"
        placeholder="Метка (необязательно, макс 50 символов)"
        :class="{ error: errors.label }"
        maxlength="50"
      />
  
      <select v-model="localAccount.type" @change="onTypeChange">
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
  
      <input
        v-model="localAccount.login"
        @blur="onBlur"
        placeholder="Логин (обязательно, макс 100 символов)"
        :class="{ error: errors.login }"
        maxlength="100"
      />
  
      <template v-if="localAccount.type === 'Локальная'">
        <input
          v-model="localAccount.password"
          @blur="onBlur"
          placeholder="Пароль (обязательно, макс 100 символов)"
          :class="{ error: errors.password }"
          maxlength="100"
        />
      </template>
  
      <button @click="deleteAccount">Удалить</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { Account } from '../store/useAccountsStore';
  
  const props = defineProps<{
    account: Account;
  }>();
  
  const emit = defineEmits<{
    (e: 'update', account: Account): void;
    (e: 'delete', id: number): void;
  }>();
  
  const localAccount = ref({ ...props.account });
  
  const errors = ref({
    label: false,
    login: false,
    password: false,
  });
  
  function validate() {
    errors.value = { label: false, login: false, password: false };
  
    if (localAccount.value.rawLabel.length > 50) {
      errors.value.label = true;
    }
  
    if (!localAccount.value.login || localAccount.value.login.length > 100) {
      errors.value.login = true;
    }
  
    if (localAccount.value.type === 'Локальная') {
      if (!localAccount.value.password || localAccount.value.password.length > 100) {
        errors.value.password = true;
      }
    }
  
    return !errors.value.label && !errors.value.login && !errors.value.password;
  }
  
  function updateAccount() {
    if (validate()) {
      const labelArr = localAccount.value.rawLabel
        .split(';')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(text => ({ text }));
      localAccount.value.label = labelArr;
  
      if (localAccount.value.type === 'LDAP') {
        localAccount.value.password = null;
      }
  
      emit('update', { ...localAccount.value });
    }
  }
  
  function onBlur() {
    updateAccount();
  }
  
  function onTypeChange() {
    if (localAccount.value.type === 'LDAP') {
      localAccount.value.password = null;
    }
    updateAccount();
  }
  
  function deleteAccount() {
    emit('delete', localAccount.value.id);
  }
  
  watch(
    () => props.account,
    (newVal) => {
      localAccount.value = { ...newVal };
    }
  );
  </script>
  
  <style scoped>
  .error {
    border: 1px solid red;
  }
  .account-item {
    margin-bottom: 1rem;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  </style>
  