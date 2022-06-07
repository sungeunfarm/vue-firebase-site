<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"  />
        <SiteTitle :title="$store.state.site.title"/>
        <v-spacer />
        <SiteSign />
        <!-- <v-btn @click="save"><v-icon>mdi-check</v-icon></v-btn>
        <v-btn @click="read" class="ml-3"><v-icon small >리드</v-icon></v-btn>
        <v-icon small @click="readOne" class="ml-3">mdi-check</v-icon> -->

    </v-app-bar>
    <v-content>
      <v-navigation-drawer app v-model="drawer" width="400">
        <SiteMenu :items="$store.state.site.menu" />
      </v-navigation-drawer>
      <router-view />
    </v-content>
    <FooterView :footer="$store.state.site.footer"/>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/ToolbarTitle'
import FooterView from '@/views/site/FooterView'
import SiteMenu from '@/views/site/SiteMenu'
import SiteSign from '@/views/site/SignView'
export default {
  name: 'App',
  components: { SiteTitle, FooterView, SiteMenu, SiteSign },
  data () {
    return {
      drawer: false
    }
  },
  created () {
    this.subscribe()
  },
  mounted () {
    console.log(this.$firebase)
  },
  methods: {
    subscribe () {
      // 리스너 형태는 트라이캐치로 에러처리가 안되고 마지막 에러메세지 확인을 만들어놓는다.
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.$store.state.site)
          return
        }
        this.$store.state.site = v
        console.log(this.site)
      }, (e) => {
        console.log(e.message)
      })
    }

    // save () {
    //   console.log('save@@@')
    //   this.$firebase.database().ref().child('abcd').set({
    //     title: 'abcd', text: 'tttttt'
    //   })
    // }, // 실시간 리스닝
    // read () {
    //   this.$firebase.database().ref().child('abcd').on('value', (sn) => {
    //     console.log(sn)
    //     console.log(sn.val())
    //   })
    // },
    // // readOne 한번만 읽어온다
    // async readOne () {
    //   const sn = await this.$firebase.database().ref().child('abcd').once('value')
    //   console.log(sn.val())
    // }
  }
}
</script>
