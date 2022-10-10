import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    async editTask(id, title, description) {
      await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: id }); //match to find the id in the database so the changes above can be applied to a specific user
    },
    async deleteTask(id) {
      const { error } = await supabase.from("tasks").delete().match({ id: id });
    },
    async completeTask(id, completeStatus) {
      // This function is used in the function changeComplete(Home.vue) to complete the task in the database.
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete: completeStatus,
        })
        .match({ id: id });

      return { data, error };
    },
  },
});
