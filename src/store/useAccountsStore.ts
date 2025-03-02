import { defineStore } from 'pinia';

export interface Account {
  id: number;
  rawLabel: string;
  label: { text: string }[];
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    nextId: 1,
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: this.nextId++,
        rawLabel: '',
        label: [],
        type: 'Локальная', 
        login: '',
        password: '',
      });
    },
    updateAccount(updated: Account) {
      const index = this.accounts.findIndex(acc => acc.id === updated.id);
      if (index !== -1) {
        this.accounts.splice(index, 1, updated);
      }
    },
    deleteAccount(id: number) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
    }
  }
});
