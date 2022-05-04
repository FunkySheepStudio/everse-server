<template>
  <section>
    <div id="map-wrap" style="height: 400px; width: 800px">
      <client-only>
        <l-map
          ref="myMap"
          :zoom="13"
          :max-zoom="50"
          :center="[44.63834,4.37998]"
          @click="mapClick"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            :options="{
              maxZoom:50,
              maxNativeZoom:19
            }"
          />
          <l-marker
            v-for="marker in markers().data"
            :key="marker._id"
            :lat-lng="[marker.latitude.toString(), marker.longitude.toString()]"
            :draggable="true"
            @dragend="markerMove(marker, $event)"
          >
            <l-icon
              :icon-size="[30, 30]"
            >
              <v-icon
                size="30px"
                class="pathClass"
                color="purple"
              >
                {{ svgMarker }}
              </v-icon>
            </l-icon>
          </l-marker>
          <l-marker
            v-for="player in players().data"
            :key="player._id"
            :lat-lng="[player.latitude.toString(), player.longitude.toString()]"
          >
            <l-icon
              :icon-size="[30, 30]"
            >
              <v-icon
                size="30px"
                class="userClass"
                color="blue"
              >
                {{ svgUser }}
              </v-icon>
            </l-icon>
          </l-marker>
        </l-map>
      </client-only>
    </div>
    <funkysheep-service
      service="/api/game/player_position"
      hide-fields
    />
    <funkysheep-service
      service="/api/game/markers"
      hide-fields
    />
  </section>
</template>
<script>
// import Vue2LeafletRotatedMarker from 'vue2-leaflet-rotatedmarker'
import { mdiBlurRadial, mdiAccount } from '@mdi/js'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker/* ,
    'v-rotated-marker': Vue2LeafletRotatedMarker */
  },
  data () {
    return {
      svgUser: mdiAccount,
      svgMarker: mdiBlurRadial,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 20,
      center: [44.63841, 4.3801],
      markerLatLng: [44.63841, 4.3801]
    }
  },
  computed: {
    ...mapGetters('/api/game/markers', { markers: 'find', get: 'get' }),
    ...mapGetters('/api/game/player_position', { players: 'find', get: 'get' })
  },
  mounted () {
    this.findMarkers()
    this.findPlayers()
  },
  methods: {
    ...mapActions('/api/game/markers', { findMarkers: 'find', patchMarker: 'patch', removeMarker: 'remove' }),
    ...mapActions('/api/game/player_position', { findPlayers: 'find' }),
    mapClick (event) {},
    markerMove (marker, event) {
      this.patchMarker([
        marker._id,
        {
          latitude: event.target._latlng.lat,
          longitude: event.target._latlng.lng
        }
      ])
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
