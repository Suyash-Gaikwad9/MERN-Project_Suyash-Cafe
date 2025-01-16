import {create} from "zustand";

export const useMenuStore = create((set) => ({
    menu: [],
    setMenu: (menu) => set({ menu }),
    createMenu: async(newMenu) => {
        if(!newMenu.name || !newMenu.image || !newMenu.price || !newMenu.description) {
            return {success:false, message: "Please fill all fields.!"}
        }
        const res = await fetch("/api/menu", {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newMenu),
        });
        const data = await res.json();
        set((state) => ({menu:[ ...state.menu, data.data]}));
        return {success:true, message: "Menu Created Successfully.!"}
    },
    fetchMenu: async () => {
        const res = await fetch("/api/menu");
        const data = await res.json();
        set({ menu: data.data });
        },
}));