<i18n>
{
  "en": {
  	"download": "Download",
  	"explicationText": "To download the data files, add them to the cart by clicking on each year.",
  	"year": "year",
  	"loading": "Loading..."
  },
  "fr": {
  	"download": "Téléchargement",
  	"explicationText": "Pour télécharger les fichiers de données, ajoutez-les au panier en cliquant sur les différentes années.",
  	"year": "ann.",
  	"loading": "Chargement..."
  }
}
</i18n>

<template>
<actris-metadata-layout data-actris-download v-if="visible" :title="$t('download')" icon="fa fa-download">
  <span class="explication">{{$t('explicationText')}}</span>
  <div v-if="loading" class="loadingbar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t("loading")}}</span>
  </div>
  <div class="year-container" v-show="years">
    <div class="aeris-year" v-for='(item, index) in years' :key="item.year" @click="toggleYear(item)" :class="isSelected(item, years)">
      <div class="year-label">{{$t('year')}}</div>
      <div class="year-value">{{item.year}}</div>
    </div>
  </div>
</actris-metadata-layout>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },

  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },

  destroyed: function() {
    document.removeEventListener('aerisMetadataRefreshed', this.aerisMetadataListener);
    this.aerisMetadataListener = null;

    document.removeEventListener('cartContentResponse', this.cartContentResponseListener);
    this.cartContentResponseListener = null;
  },

  created: function() {
    console.log("Actris download - Creating");
    this.$i18n.locale = this.lang;
    // to get the datas
    this.aerisMetadataListener = this.handleRefresh.bind(this);
    document.addEventListener('aerisMetadataRefreshed', this.aerisMetadataListener);

    this.cartContentResponseListener = this.cartContentResponse.bind(this);
    document.addEventListener('cartContentResponse', this.cartContentResponseListener);

  },

  computed: {

  },

  data() {
    return {
      visible: true,
      aerisMetadataListener: null,
      cartResponseListener: null,
      cartContentResponseListener: null,
      years: [],
      service: "https://sedoo.aeris-data.fr/actris-datacenter-rest/rest/data",
      uuid: null,
      collectionName: null,
      loading: false,

    }
  },

  methods: {

    toggleYear: function(item) {
      for (var i = 0; i < this.years.length; i++) {
        if (this.years[i].year == item.year) {
          var url_download_service = this.service;

          var obj = {
            collectionName: JSON.stringify(this.collectionName),
            url: url_download_service,
            collectionId: this.uuid,
            id: this.uuid,
            data: '',
            fileNumber: item.fileNumber,
            totalSize: item.totalSize,
            type: 'yearfilter',
            elements: [item.year]
          };
          if (this.years[i].state == false) {
            var event = new CustomEvent('addItemToCartEvent', {
              detail: obj,
              lang: this.lang
            });
            document.dispatchEvent(event);
          } else {
            var event = new CustomEvent('deleteItemFromCartEvent', {
              detail: obj,
              lang: this.lang
            });
            document.dispatchEvent(event);
          }
          break;
        }
      }
    },

    isSelected: function(item) {
      for (var i = 0; i < this.years.length; i++) {
        if (this.years[i].year == item.year) {
          if (this.years[i].state) {
            return "selected";
          }
          break;
        }
      }
      return ""
    },

    selectYear: function(year) {
      if (this.years) {
        for (var i = 0; i < this.years.length; i++) {
          if (this.years[i].year == year) {
            var aux = this.years[i];
            aux.state = true
            this.$set(this.years, i, aux)
            break;
          }
        }

      }
    },

    deselectAll: function() {
      if (this.years) {
        for (var i = 0; i < this.years.length; i++) {
          var aux = this.years[i];
          aux.state = false
          this.$set(this.years, i, aux)
        }
      }
    },

    cartContentResponse: function(e) {
      this.deselectAll();
      var cartContent = e.detail.cartContent
      if (cartContent) {
        console.log(cartContent)
        for (var i = 0; i < cartContent.length; i++) {
          var cartItem = cartContent[i]
          if (cartItem.collectionId == this.uuid) {
            var years = cartItem.items.elements;
            for (var j = 0; j < years.length; j++) {
              this.selectYear(years[j])
            }
          }
        }
      }
    },


    handleRefresh: function(e) {
      console.log("actris download - Refreshing");
      this.visible = false;
      this.uuid = e.detail.id;
      this.collectionName = e.detail.resourceTitle;

      if (this.service && this.uuid) {
        var cached = this.getFromCache(this.getYearCacheKey())
        if (cached) {
          this.years = cached;
          var event = new CustomEvent('cartContentRequest', {});
          document.dispatchEvent(event);
        } else {
          var url = null;
          if (this.service.endsWith('/')) {
            this.service = this.service.substring(0, this.service.length - 1);
          }
          url = this.service + "/request?collection=" + this.uuid;
          this.loading = true;
          this.$http.get(url).then((response) => {
            this.handleSuccess(response)
          }, (response) => {
            this.handleError(response)
          });
        }
      }
    },

    handleSuccess: function(response) {
      var entries = response.body.entries
      console.log("Aeris - actris download - Entries : " + entries)
      this.loading = false;
      this.years = [];
      if (entries) {
        for (var i = 0; i < entries.length; i++) {
          var aux = window.moment(entries[i].date)
          var item = {}
          item.year = aux.year()
          item.state = false
          item.totalSize = entries[i].totalSize
          item.fileNumber = entries[i].fileNumber
          this.years.push(item)
        }
        this.visible = true;

        this.addToCache(this.getYearCacheKey(), this.years)
        var event = new CustomEvent('cartContentRequest', {});
        document.dispatchEvent(event);
      }
    },

    getYearCacheKey: function() {
      return this.uuid + "-years"
    },

    getFromCache: function(key) {
      if (!window.cacheaeris) {
        return null
      } else {
        return window.cacheaeris[key]
      }
    },

    addToCache: function(key, value) {
      if (!window.cacheaeris) {
        window.cacheaeris = {}
      }
      window.cacheaeris[key] = value;
    },

    handleError: function(response) {
      this.loading = false;
      this.years = [];
      console.log("Aeris - actris download - Error while accessing server:");
      var error = response.status;
      var message = response.statusText;
      if (!error) message = 'Can\'t connect to the server';
      console.log('Error ' + error + ': ' + message);
    }

  } // methods

} // default
</script>

<style>
[data-actris-download] .aeris-year:hover {
  background: gainsboro;
}

[data-actris-download] .aeris-year {
  display: inline-block;
  padding: 2px;
  margin: 2px;
}

[data-actris-download] .aeris-year.selected {
  background: rgba(153, 198, 109, 0.5);
}

[data-actris-download] .loadingbar {
  background: gainsboro;
  padding: 3px;
}

[data-actris-download] .year-container {
  margin-top: 5px;
  margin-bottom: 5px;
}

[data-actris-download] .year-value {
  display: block;
  width: 40px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  position: relative;
}

[data-actris-download] .year-label {
  display: block;
  text-align: center;
  font-size: 9px;
  text-transform: uppercase;
  margin-bottom: 2px;
  letter-spacing: .7px;
  cursor: pointer;
}
 </style>
