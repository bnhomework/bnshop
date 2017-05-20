<template>
<div id="backToTop" style="display: block;">
            <a href="#"><img title="Back to Top" :src="iconUrl" alt="Icon backtotop"></a>
        </div>
</template>
<script>
import _ from 'underscore'
export default {
  name: 'languageSelect',
  data () {
    return {
      iconUrl:require('../assets/img/icon-backtotop.png')
}
  },
  created () {
  },
  methods: {
  },
  computed: {
    
  }
}
</script>
<style scoped>
  #backToTop{

  }
</style>

