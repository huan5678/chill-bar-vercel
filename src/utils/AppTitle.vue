<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'AppTitle',
  props: {
    title: String,
    level: String,
    class: String,
  },
  render() {
    const tag = `h${this.level}`;
    return h(
      tag,
      {
        class: `font-normal ${this.class}
        pb-4 border-b md:w-1/2 mx-auto text-center`,
      },
      this.$slots.default(),
    );
  },
});
</script>
