import { writable } from 'svelte/store';

export interface ModalStoreInterface {
	movieId?: string;
	isOpen: boolean;
}

function createModalStore() {
	const { subscribe, set } = writable<ModalStoreInterface>({
		movieId: undefined,
		isOpen: false
	});

	return {
		subscribe,
		openModal: (movieId: string) => {
			set({ isOpen: true, movieId });
		},
		closeModal: () => {
			set({ isOpen: false, movieId: undefined });
		}
	};
}

export const infoModal = createModalStore();
