<template>
<div data-template="metadata-panel">
  <aeris-metadata-description></aeris-metadata-description>
  <aeris-metadata-spatial-extents></aeris-metadata-spatial-extents>
  <aeris-metadata-temporal-extents></aeris-metadata-temporal-extents>
  <aeris-metadata-contacts></aeris-metadata-contacts>
  <actris-download></actris-download>
  <aeris-metadata-data-links></aeris-metadata-data-links>
  <aeris-metadata-datapolicy></aeris-metadata-datapolicy>
  <aeris-metadata-platforms></aeris-metadata-platforms>
  <aeris-metadata-formats></aeris-metadata-formats>
  <aeris-metadata-parameters></aeris-metadata-parameters>
  <aeris-metadata-publications></aeris-metadata-publications>
  <aeris-metadata-quicklook-gallery></aeris-metadata-quicklook-gallery>
  <aeris-metadata-information></aeris-metadata-information>
</div>
</template>

<script>
export default {
	props: {
	  	lang:  {
	      type: String,
	      default: 'en'
	    }
	},

  destroyed: function() {
  },

  created: function () {
  },

  mounted: function() {


  },

  computed: {
  },

   data () {
    return {
    }
  },

  updated: function() {
  },

  methods: {
  }
}
</script>
