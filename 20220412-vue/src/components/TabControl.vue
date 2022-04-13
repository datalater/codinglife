<script lang="tsx">
import { defineComponent, onMounted } from '@vue/composition-api'
import { PropType, VueConstructor } from 'vue'

interface Item  {
  name: string,
  Component: VueConstructor
}

interface RefsType  {
  [key: string]: Vue | Element | Vue[] | Element[];
};

export default defineComponent({
  name: 'TabControl',
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    }
  },
  emits: ['change'],
  setup(props, { refs }: { refs: RefsType }) {
    
  },
})
</script>
