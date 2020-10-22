module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/variables/variables.scss";
          @import "~@/assets/styles/mixins/mixins.scss";
        `
      }
    }
  }
};
