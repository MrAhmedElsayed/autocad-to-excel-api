<template>
  <div class="mt-5">
    <input
      type="text"
      name="file-path"
      v-model="outputFilePath"
      class="form-control form-control-sm mb-3"
    />
    <input
      type="text"
      name="file-name"
      v-model="outputFileName"
      class="form-control form-control-sm mb-3"
    />
    <select
      name="file-format"
      class="form-control form-control-sm mb-3"
      v-model="outputFileFormat"
    >
      <option value="csv" selected>CSV</option>
      <option value="xlsx">Excel</option>
      <option value="txt">Text</option>
    </select>

    <p class="text-muted">full path: {{ outputFullPath }}</p>

    <button
      @click="recordPoint"
      :class="startBtnStatus ? 'disabled' : ''"
      class="btn btn-sm btn-outline-primary"
    >
      start
    </button>

    <hr class="my-4 text-danger" />

    <div class="mt-3">
      <div class="my-3">
        <button class="btn btn-success me-3">Excel</button>
        <button class="btn btn-info me-3">CSV</button>
        <button class="btn btn-dark me-3" @click="storeToLocalstorage">
          store data
        </button>
        <button class="btn btn-outline-danger me-3">clear data</button>
      </div>

      <table
        class="table table-bordered table-hover table-striped text-center mt-3"
      >
        <thead>
          <tr>
            <td>#</td>
            <td>Easting</td>
            <td>Northing</td>
            <td>Z</td>
            <td>D</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="point in recordedPoint" :key="point.pn">
            <td>{{ point.pn }}</td>
            <td>{{ point.x }}</td>
            <td>{{ point.y }}</td>
            <td>{{ point.z }}</td>
            <td>{{ point.c }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
export default {
  name: "HomeView",
  data: () => ({
    outputFilePath: "C:\\Users\\ultra\\Desktop\\",
    outputFileName: "points",
    outputFileFormat: "csv",
    startBtnStatus: false,
    recordedPoint: [
      { pn: 1, x: 777777.777, y: 22222222.222, z: 1600.213, c: "TP1" },
      { pn: 2, x: 777666.777, y: 22222111.222, z: 1601.213, c: "TP2" },
      { pn: 3, x: 777555.777, y: 22222000.222, z: 1602.213, c: "TP3" },
    ],
  }),
  computed: {
    outputFullPath() {
      return (
        this.outputFilePath + this.outputFileName + "." + this.outputFileFormat
      );
    },
  },
  methods: {
    recordPoint() {
      // https://docs.sheetjs.com/docs/getting-started/example

      // try localstorage ex: operationID: random character and then store points
      const worksheet = XLSX.utils.json_to_sheet(this.recordedPoint);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Points");
      XLSX.writeFile(workbook, "Points.xlsx");
      this.startBtnStatus = !this.startBtnStatus;
    },
    storeToLocalstorage() {
      localStorage.setItem("points", JSON.stringify(this.recordedPoint));
    },
  },
};
</script>
