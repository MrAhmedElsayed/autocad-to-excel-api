// https://v2.vuejs.org/v2/guide/
var app = new Vue({
  el: "#app",
  data: {
    // output required info
    outputDirectory: "C:\\Users\\ahmed\\Desktop",
    fileName: "points",
    fileFormate: "csv", // file format
    showReloadToadt: false,
    selectedCoordinates: [
      {
        pn: 1,
        x: 776160.013,
        y: 2233695.263,
        z: 1604.234,
      },
      {
        pn: 2,
        x: 776160.013,
        y: 2233695.263,
        z: 1604.234,
      },
      {
        pn: 3,
        x: 776160.013,
        y: 2233695.263,
        z: 1604.234,
      },
      {
        pn: 4,
        x: 776160.013,
        y: 2233695.263,
        z: 1604.234,
      },
      {
        pn: 5,
        x: 776160.013,
        y: 2233695.263,
        z: 1604.234,
      },
      {
        pn: 6,
        x: 776160.013,
        y: 2233695.263,
        z: 1604.234,
      },
      {
        pn: 7,
        x: 776160.013,
        y: 2233695.263,
        z: 1604.234,
      },
    ],
  },
  computed: {
    outputFile() {
      return (
        this.outputDirectory + "\\" + this.fileName + "." + this.fileFormate
      );
    },
    pointsCount() {
      return this.selectedCoordinates.length;
    },
  },
  methods: {
    reverseMessage: function () { // just placeholder for methods
      this.fileName = this.fileName.split("").reverse().join("");
    },
  },
});
