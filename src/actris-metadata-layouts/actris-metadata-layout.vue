<template>
<div data-actris-metadata-layout data-template="metadata-block">
  <header>
    <h3><i :class="icon"></i>{{title}}</h3>
    <div class="aeris-icon-group"></div>
  </header>
  <main>
    <slot></slot>
  </main>
</div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },

  mounted: function() {
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
  },

  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },

  created: function() {
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener('aerisTheme', this.aerisThemeListener);
  },

  updated: function() {
    this.ensureTheme();
  },

  data() {
    return {
      theme: null,
      aerisThemeListener: null,
      view: null
    }
  },

  methods: {

    handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },

    ensureTheme: function() {
      if (this.$el && this.$el.querySelector("header h3 i")) {
        this.$el.querySelector("header h3 i").style.color = this.theme.primary;
      }
    }

  }
}
</script>

<style>
[data-actris-metadata-layout] {
  display: flex;
  flex-direction: column;
  border: none;
  background: #FAFAFA;
  padding: 24px;
}

[data-actris-metadata-layout] header h3 {
  font-size: 1.5rem;
  font-weight: 300;
}

[data-actris-metadata-layout] header i {
  margin-right: 12px;
}

[data-actris-metadata-layout] main {
  padding: 24px;
}

[data-actris-metadata-layout] h5 {
  font-size: 1rem;
  font-weight: 400;
  margin-right: 20px;
}

[data-actris-metadata-layout] button:hover {
  filter: brightness(80%);
}

[data-actris-metadata-layout] p {
  padding: 15px 0;
}
</style>
