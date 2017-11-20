require("exports-loader?!./l.min.js")

import Vue from 'vue'

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

import VueResource from 'vue-resource';
Vue.use(VueResource);

import ActrisDownload from './actris-download/actris-download.vue';
import ActrisMetadata from './md-template-actris/md-template-actris.vue';

ljs.addAliases({
	dep: ['https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/document-register-element/1.4.1/document-register-element.js', 
		'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment-with-locales.min.js']
})

ljs.load('dep', function() {
	
	if (!window.registredAerisElements) {
		window.registredAerisElements = [];
	}
	
	var timer;
	
	function stopTimer() {
	    clearInterval(timer);
	}
	
	function registerElement(name, component) {
        if (!window.registredAerisElements) {
            window.registredAerisElements = [];
        }
        if (window.registredAerisElements.indexOf(name) < 0) {
            Vue.customElement(name, component);
            window.registredAerisElements.push(name)
        }
    }
	
	function register() {
		console.info("trying to register gmos metadata components")
		if (window.registredAerisElements.indexOf("aeris-metadata-components-vjs") > -1) {
			
			console.info("Start registration of Actris metadata components")
			console.info("Registred elements at this time: "+window.registredAerisElements)
			
			registerElement('actris-download', ActrisDownload);
			registerElement('md-template-actris', ActrisMetadata);
						
			stopTimer()
			console.info("Actris metadata components registration complete")
			
		}
		else {
			console.info("aeris-metadata-components-vjs not available yet...")
		}
	}
	
	timer = setInterval(function(){register()}, 1000);
})

