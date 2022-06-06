<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
        <SiteTitle :title="title"/>
        <v-spacer/>
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-navigation-drawer app v-model="drawer">
        <SiteMenu />
      </v-navigation-drawer>
      <router-view />
    </v-content>
    <FooterView :footer="footer"/>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/ToolbarTitle'
import FooterView from '@/views/site/FooterView'
import SiteMenu from '@/views/site/SiteMenu.vue'
export default {
  name: 'App',
  components: { SiteTitle, FooterView, SiteMenu },
  data () {
    return {
      drawer: false,
      title: '나만의 사이트 만들기',
      footer: 'CodeEats Company.'
    }
  }
  // components: { SiteTitle, FooterView, SiteMenu }
}
</script>
