<template>
  <section>
    <div id="map-wrap" style="height: 400px; width: 800px">
      <client-only>
        <l-map
          ref="myMap"
          :zoom="zoom"
          :max-zoom="50"
          :min-zoom="3"
          :center="center"
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
            v-for="player in players({query: {_id: playerId}}).data"
            :key="player._id"
            :lat-lng="[player.latitude.toString(), player.longitude.toString()]"
            :draggable="true"
            @dragend="playerMove(player, $event)"
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
      zoom: 3,
      center: [44.620838, 4.390526],
      playerId: ''
    }
  },
  computed: {
    ...mapGetters('/api/game/player_position', { players: 'find' })
  },
  mounted () {
    this.findPlayers()

    this.playerId = localStorage.getItem('_id')
    this.getPlayerPosition(this.playerId)
      .then((playerPosition) => {
        if (!playerPosition) {
          this.createPlayer({
            _id: this.playerId,
            latitude: 44.620838,
            longitude: 4.390526
          })
        }
      })
  },
  methods: {
    ...mapActions('/api/game/player_position', { createPlayer: 'create', findPlayers: 'find', patchPlayer: 'patch', getPlayerPosition: 'get' }),
    mapClick (event) {},
    playerMove (player, event) {
      this.patchPlayer([
        player._id,
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

  .vue2leaflet-map {
    z-index: 1;
  }
</style>
