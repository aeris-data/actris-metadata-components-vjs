<template>
<span class="md-template-collection-host">
<div class="metadata-container">
<div class="column">
  <aeris-metadata-description></aeris-metadata-description>
  <aeris-metadata-spatial-extents></aeris-metadata-spatial-extents>
  <aeris-metadata-temporal-extents></aeris-metadata-temporal-extents>
  <aeris-metadata-contacts></aeris-metadata-contacts>
 
</div>
<div class="column">
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
</div>
</span>
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

<style>

.md-template-collection-host {
	display: block;
	font-size: 14px;
	height: 70vh;
	overflow: scroll;
}

.md-template-collection-host * {
	box-sizing: border-box;
}

.md-template-collection-host .column .component-container {
	margin-bottom: 10px;
   
}

.md-template-collection-host .column~.column {
	margin-left: 10px;
}

.md-template-collection-host .column:first {
	margin-right:10px;
}

.md-template-collection-host * {
	box-sizing: border-box;
}

.md-template-collection-host .metadata-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-around;
}

.md-template-collection-host .metadata-container .column {
	width: 50%;
}

 </style>