import {writable} from 'svelte/store';
import type {Posts} from "$lib/ApiResults";

// Create a writable store with an initial value
const postStore = writable<Posts>([]);

export default postStore;
