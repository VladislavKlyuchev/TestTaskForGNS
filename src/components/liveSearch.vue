<template>
    <v-app>
        <v-container  fluid text-xs-center>
            <v-layout wrap justify-center>
                <v-flex xs12 md8 >
                    <v-text-field
                            v-model="search"
                            label="Live Search"
                            id="testing"
                    ></v-text-field>
                </v-flex>
                <v-flex x12 md8>
                    <v-layout row wrap justify-space-between>
                        <v-flex xs4>
                            <v-btn @click="exampleSort('name')">Name</v-btn>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn @click="exampleSort('location')">Location</v-btn>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn @click="exampleSort('currency')">Currency</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs12 md8>
                        <div class="max-height">
                            <div>
                            <v-container>
                                <template v-for="item in searchResult">
                                    <p class=".body-1">
                                        {{item}}
                                    </p>
                                </template>
                            </v-container>
                            </div>
                        </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
    export default {
        props: ['liveData'],
        data() {
            return {
                search: null,
                searchResult: null
            }
        },
        methods: {
            /**
             *
             * @param val {string} how sort
             * return void
             *
             */
          exampleSort: function(val) {
              this.searchResult = this.searchResult.sort((a, b) => {
                  return a[val] > b[val]
              })
          }
        },
        watch: {
            /**
             * trigger for change search
             *
             */
            search: function (val) {
                if(val.length > 1 ) {
                    const result = this.liveData.filter(obj => {
                        if(obj.id.indexOf(val) !== -1 ||
                            obj.name.indexOf(val) !== -1 ||
                            obj.location.indexOf(val) !== -1 ||
                            obj.currency == val) {
                            return obj;
                        }
                    });

                    this.searchResult = result;
                } else if(val.length === 0) {
                    this.searchResult = null;
                }
            }
        }
    }
</script>