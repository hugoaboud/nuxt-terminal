import { ExtendedVue, Vue } from "vue/types/vue";

type InferVueData<T> = T extends ExtendedVue<Vue, infer Data, any, any, any> ? Data : never
type InferVueMethods<T> = T extends ExtendedVue<Vue, any, infer Methods, any, any> ? Methods : never
type InferVueComputed<T> = T extends ExtendedVue<Vue, any, any, infer Computed, any> ? Computed : never

export type AppVueComponent<T extends ExtendedVue<Vue, any, any, any, any>> = InferVueData<T> & InferVueMethods<T> & InferVueComputed<T>;