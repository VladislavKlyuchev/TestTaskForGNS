<template>
  <v-app>
    <v-content >
      <v-container fluid text-xs-center>
        <v-layout  wrap justify-center>
          <v-flex xs12>
          <h1 class="display-1"> Total currency : {{total}}</h1>
          </v-flex>
          <v-flex xs12 md8>
            <v-table :tableData.sync="tableData"></v-table>
          </v-flex>
        </v-layout>
      </v-container>
      <v-live-search :liveData="tableData"></v-live-search>
    </v-content>
    <v-snackbar
            :timeout="2000"
            v-model="x"
    >
      Вы активировали пасхалку!  :)
    </v-snackbar>
  </v-app>
</template>

<script>
  import VTable from './components/table';
  import VLiveSearch from './components/liveSearch';
  import {FallingCoins} from '../pashalka/coin.js';

  export default {
      components: {
          'v-table': VTable,
          'v-live-search': VLiveSearch
      },
      data() {
          return {
              total: null,
              search: null,
              searchResult: null,
              tableData: this.$store.state.tableData,
              x:false
          }
      },
      methods: {
          /**
           * total currency
           * @param val {array[obj]}
           * return void
           */
          totalCurrency: function (val) {
              const total = val.reduce((total, curr) => {
                return  (total && total.currency)? +total.currency + +curr.currency : total + +curr.currency;
              })
              if(total > 7378895 && !this.x) {
                  const pashalka = new FallingCoins('http://joxi.ru/Y2L4LMltnlPDz2.png', 4, 7);

                  pashalka.run()
                  this.x = true;
              }
              this.total = total
          }
      },
      watch: {
          /**
           * trigger for watch change tableData
           * @params val {array[obj]} new tableData array
           * return void
           */
          tableData: {
              handler: function (val) {
                  this.totalCurrency(val)
              },
              deep: true
          }
      },
      mounted() {
          /**
           * Вызываем 1й раз при иницилизации компонента, вряд ли что то можно добавить =/
           */
          this.totalCurrency(this.tableData)
      }
  }
</script>
<style >
  .max-height {
    max-height: 600px;
  }
  #fallingCoins {
    display:block;
    pointer-events:none;
    position: fixed;
    top:0;
    left:0;
  }
</style>