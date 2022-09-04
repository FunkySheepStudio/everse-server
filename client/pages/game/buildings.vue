<template>
  <section>
    <div id="map-wrap" style="height: 400px; width: 800px">
      <client-only>
        <l-map
          ref="myMap"
          :zoom="13"
          :max-zoom="50"
          :center="[44.63834,4.37998]"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            :options="{
              maxZoom:50,
              maxNativeZoom:19
            }"
          />
          <l-marker
            v-for="building in buildings().data"
            :key="building._id"
            :lat-lng="[building.latitude.toString(), building.longitude.toString()]"
          >
            <l-icon
              :icon-size="[30, 30]"
            >
              <v-icon
                size="30px"
                class="userClass"
                color="blue"
              >
                {{ svgBuilding }}
              </v-icon>
            </l-icon>
          </l-marker>
        </l-map>
      </client-only>
    </div>
    <v-data-table
      :items="buildings().data"
      :headers="buildingHeaders"
    >
      <template #[`item.download`]="{ item }">
        <a
          :href="'/buildings_models/' + downloadBuilding(item.osm_id)"
          target="_blank"
        >
          Download
        </a>
      </template>
      <template #[`item.remove`]="{ item }">
        <v-btn
          @click="removeBuilding(item._id)"
        >
          <v-icon
            color="red"
          >
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <funkysheep-service
      service="/api/game/buildings_models"
      hide-fields
    />
  </section>
</template>
<script>
// import Vue2LeafletRotatedMarker from 'vue2-leaflet-rotatedmarker'
import { mdiHome } from '@mdi/js'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker/* ,
    'v-rotated-marker': Vue2LeafletRotatedMarker */
  },
  layout: 'admin',
  data () {
    return {
      svgBuilding: mdiHome,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 20,
      center: [44.63841, 4.3801],
      markerLatLng: [44.63841, 4.3801]
    }
  },
  computed: {
    ...mapGetters('/api/game/buildings', { buildings: 'find', getBuilding: 'get' }),
    ...mapGetters('/api/game/buildings_models', { buildingsModels: 'find' }),
    buildingHeaders () {
      return [
        {
          text: 'Id',
          value: '_id'
        },
        {
          text: 'Osm Id',
          value: 'osm_id'
        },
        {
          text: 'Latitude',
          value: 'latitude'
        },
        {
          text: 'Longitude',
          value: 'longitude'
        },
        {
          text: 'Height',
          value: 'height'
        },
        {
          text: 'X',
          value: 'x'
        },
        {
          text: 'Y',
          value: 'y'
        },
        {
          text: 'Download',
          value: 'download'
        },
        {
          text: 'Remove',
          value: 'remove'
        }
      ]
    }
  },
  mounted () {
    this.findBuildings()
    this.findBuildingsModels()
  },
  methods: {
    ...mapActions('/api/game/buildings', { findBuildings: 'find', patchBuilding: 'patch', removeBuilding: 'remove' }),
    ...mapActions('/api/game/buildings_models', { findBuildingsModels: 'find' }),
    downloadBuilding (_id) {
      const buildingModel = this.buildingsModels().data.find(model => model.building_id === _id)
      if (buildingModel) {
        return buildingModel._id
      } else {
        return ''
      }
    }
  }
}
</script>
<style>
  .userClass
  {
    font-size: 30px;
    background:transparent;
    border:2px solid #2196F3;
    color:blue;
    font-weight:bold;
    text-align:center;
    border-radius:50%;
    line-height:30px;
  }

  .pathClass
  {
    font-size: 30px;
    background:transparent;
    border:2px solid purple;
    color:purple;
    font-weight:bold;
    text-align:center;
    border-radius:50%;
    line-height:30px;
  }

  .triangle-code
  {
    display : inline-block;
    height : 0;
    width : 0;
    border-right : 1em solid transparent;
    border-bottom : 2em solid red;
    border-left : 1em solid transparent;
  }
</style>
