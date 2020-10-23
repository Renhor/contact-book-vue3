<template>
  <div class="contact-field_show">
    <p class="contact-field_show-name">
      {{ name }}:
    </p>

    <p class="contact-field_show-value">
      {{ value }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'ContactFieldShow',
    props: {
      name: String,
      value: String
    }
  }
</script>

<style lang="scss">
  .contact-field_show {
    width: 100%;
    display: flex;
  }

  .contact-field_show-value,
  .contact-field_show-name {
    width: 120px;
    flex-grow: 1;
    padding: 10px;
  }
</style>
