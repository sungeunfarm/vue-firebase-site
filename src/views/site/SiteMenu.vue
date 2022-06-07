<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Application </v-list-item-title>
        <v-list-item-subtitle> subtext </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
          <!-- 쓰기 및 수정 아이콘 및 함수 -->
          <v-list-action>
            <v-btn icon @click="openDialogItem(i)" small><v-icon>mdi-pencil</v-icon></v-btn>
          </v-list-action>
        </template>
      <!-- 서브아이템 시작 -->
        <v-list-item
          v-for="(subItem, j) in item.subItems"
          :key="j"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
          <!-- subitem -->
          <!--  서브아이템 추가 -->
            </v-list-item>
            <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>서브 추가하기</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list-group>
      <!-- 서브아이템 마지막 -->
      <v-list-item @click="openDialogItem(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>추가하기</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- 추가 및 수정 다이얼로그창 -->
    <v-dialog v-model="dialogItem" max-width="400">
      <v-card>
        <v-card-title >
          수정하기
          <v-spacer/>
          <v-btn icon @click="saveItem"><v-icon>mdi-content-save</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formItem.title"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['items'],
  data () {
    return {
      dialogItem: false,
      dialogSubItem: false,
      formItem: {
        icon: '',
        title: ''
      },
      selectedItemIndex: -1
    }
  },
  methods: {
    openDialogItem (index) {
      this.selectedItemIndex = index
      this.dialogItem = true
      if (index < 0) {
        this.formItem.title = ''
      } else {
        this.formItem.title = this.items[index].title
      }
    },
    saveItem () {
      if (this.selectedItemIndex < 0) {
        this.$emit('update-item', this.formItem)
      } else {
        const index = [this.selectedItemIndex]
        this.$emit('else-item', [index, this.formItem])
      }
      this.save()
    },
    async save () {
      try {
        await this.$firebase.database().ref().child('site').update({ menu: this.items })
      } finally {
        this.dialogItem = false
      }
    }
  }
}
</script>
