<template>
    <v-footer padless app color="primary" absolute>
      <v-col class=" d-flex justify-end " cols="12">
        <div>&copy; {{ new Date().getFullYear() }} — <strong>{{footer}}</strong></div>

          <v-btn x-small small icon @click="openDialog" class="ml-5"><v-icon>mdi-grease-pencil</v-icon></v-btn>
          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-title>Footer 수정
                <v-spacer/>
                <v-btn icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
                <v-btn icon @click="dialog=false"><v-icon>mdi-close-box</v-icon></v-btn>
              </v-card-title>

              <v-card-text>
                <v-text-field v-model="text" outlined label="제목" @keypress.enter="save" hide-details=""/>
              </v-card-text>

          </v-card>
        </v-dialog>
      </v-col>
    </v-footer>
</template>
<script>
export default {
  props: ['footer'],
  data () {
    return {
      dialog: false,
      text: this.footer
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    async save () {
      try {
        await this.$firebase.database().ref().child('site').update({ footer: this.text })
      } finally {
        this.dialog = false
      }
    }
  }
}
</script>
