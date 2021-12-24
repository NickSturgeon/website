<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  Dialog as StatementDialogue,
  DialogOverlay,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/outline";
import md from "../assets/statement.md";

defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

const statement = ref();

function closeStatement() {
  emit("update:modelValue", false);
}
</script>

<template>
  <transition-root appear as="template" :show="modelValue">
    <statement-dialogue
      as="div"
      @close="closeStatement"
      class="fixed inset-0 z-10 overflow-y-auto"
    >
      <div class="flex items-center justify-center min-h-screen">
        <transition-child
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <dialog-overlay class="fixed inset-0 bg-black opacity-30 rounded" />
        </transition-child>

        <transition-child
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div class="relative w-full max-w-2xl p-6 bg-white rounded">
            <div class="flex justify-between">
              <dialog-title as="h2" class="text-xl font-bold leading-6 text-gray-900">
                {{ statement?.frontmatter?.title ?? "Statement" }}
              </dialog-title>
              <button @click="closeStatement">
                <x-icon class="w-6 h-6 text-red-500" />
              </button>
            </div>

            <div class="mt-2">
              <md class="markdown text-black" ref="statement" />
              <p class="text-right mt-4">
                — {{ statement?.frontmatter?.signature ?? "ZeldaRET" }}
              </p>
            </div>
          </div>
        </transition-child>
      </div>
    </statement-dialogue>
  </transition-root>
</template>
