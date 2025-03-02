<template>
  <v-card class="mb-4" variant="outlined" max-width="600">
    <v-card-text>
      <v-text-field
        v-model="localAccount.rawLabel"
        label="Метка"
        maxlength="50"
        hint="Необязательное поле, максимум 50 символов"
        persistent-hint
        variant="outlined"
        density="compact"
        class="mt-4"
        :error="errors.label"
        @blur="validate"
      />

      <v-select
        v-model="localAccount.type"
        label="Тип записи"
        :items="['LDAP', 'Локальная']"
        variant="outlined"
        density="compact"
        class="mt-4"
        :error="errors.type"
        @change="onTypeChange"
      />

      <v-text-field
        v-model="localAccount.login"
        label="Логин"
        maxlength="100"
        hint="Обязательное поле, максимум 100 символов"
        persistent-hint
        variant="outlined"
        density="compact"
        class="mt-4"
        required
        :error="errors.login"
        @blur="validate"
      />

      <v-text-field
        v-if="localAccount.type === 'Локальная'"
        v-model="localAccount.password"
        label="Пароль"
        maxlength="100"
        hint="Обязательное поле, максимум 100 символов"
        persistent-hint
        variant="outlined"
        density="compact"
        type="password"
        required
        :error="errors.password"
        @blur="validate"
      />
    </v-card-text>

    <v-card-actions class="px-4 mt-4">
      <v-spacer />
      <v-btn
        color="error"
        variant="tonal"
        density="compact"
        prepend-icon="mdi-delete"
        @click="deleteAccount"
      >
        Удалить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Account } from '../store/useAccountsStore';

const props = defineProps<{ account: Account }>();
const emit = defineEmits<{ (e: 'update', account: Account): void; (e: 'delete', id: number): void }>();

const localAccount = ref({ ...props.account });

const errors = ref({
  label: false,
  type: false,
  login: false,
  password: false
});

function validate() {
  errors.value.label = localAccount.value.rawLabel?.length > 50;
  errors.value.type = !localAccount.value.type;
  errors.value.login = !localAccount.value.login || localAccount.value.login.length > 100;
  errors.value.password = localAccount.value.type === 'Локальная' && (!localAccount.value.password || localAccount.value.password.length > 100);

  if (!Object.values(errors.value).some(Boolean)) {
    updateAccount();
  }
}

function updateAccount() {
  localAccount.value.label = localAccount.value.rawLabel
    ?.split(';')
    .map(text => ({ text: text.trim() })) ?? [];
    
  if (localAccount.value.type === 'LDAP') {
    localAccount.value.password = null;
  }

  emit('update', { ...localAccount.value });
}

function onTypeChange() {
  if (localAccount.value.type === 'LDAP') {
    localAccount.value.password = null;
  }
  validate();
}

function deleteAccount() {
  emit('delete', localAccount.value.id);
}

watchEffect(() => {
  localAccount.value = { ...props.account };
});
</script>