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
    deleteMenu: async (id) => {
        const res = await fetch(`/api/menu/${id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) {
            return {success:false, message: data.message};
        }

        //update the Sceren Immediately with left over menus.
        set((state) => ({menu: state.menu.filter(menu => menu._id !== id)}));
        return {success:true, message: data.message};
    },
    updateMenu: async (id, updatedMenu) => {
        const res = await fetch(`/api/menu/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMenu),
        });
        const data = await res.json();
        if(!data.success) {
            return {success:false, message: data.message};
        };

        //update the Screen Immediately with updated menu.
        set((state) => ({menu: state.menu.map(menu => menu._id === id ? data.data : menu)}));
        return {success:true, message: data.message};
    },
}));