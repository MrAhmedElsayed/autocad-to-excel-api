<template>
  <div class="mt-5">
    <div
      class="task-bar bg-white border border-2 text-danger mb-3 p-2"
      style="height: 60px"
    >
      <p style="height: 20px; width: auto">This is message</p>
    </div>
    <button class="btn btn-outline-danger">reload</button>
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
      class="form-select mb-3"
      name="file-format"
      v-model="outputFileFormat"
    >
      <option value="xlsx" selected>Excel</option>
      <option value="csv">CSV</option>
      <option value="txt">Text</option>
    </select>

    <p class="text-muted">full path: {{ outputFullPath }}</p>

    <!-- :class="startBtnStatus ? 'disabled' : ''"-->
    <button @click="recordPoint" class="btn btn-sm btn-outline-primary">
      start
    </button>

    <hr class="my-4 text-danger" />

    <!-- coord. table -->
    <div class="mt-3">
      <div class="my-3">
        <button class="btn btn-success me-3" @click="downloadPoints">
          Excel
        </button>
        <button class="btn btn-info me-3">CSV</button>
        <button class="btn btn-dark me-3" @click="storeToLocalstorage">
          store data
        </button>
        <button class="btn btn-outline-danger me-3" @click="testAlertClearData">
          clear data
        </button>
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

    <!--  Try capture screen in cad  -->
    <div class="capture">
      <button class="btn btn-outline-success" @click="capturePreview">
        Capture
      </button>
      <div class="images" id="imageContainer"></div>
    </div>

    <!--    try toast-->
    <button type="button" class="btn btn-primary" id="liveToastBtn">
      Show live toast
    </button>

    <div
      class="position-fixed bottom-0 end-0 p-3"
      style="z-index: 11"
      aria-atomic="true"
    >
      <div
        id="liveToast"
        class="toast hide"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <svg
            class="bd-placeholder-img rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>
          <strong class="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
    <!--    try toast-->

    <!-- test animation on api ==> ok it is work -->
    <!--  <div class="status-bar">
          <div class="blobs-container">
            <div class="blob white"></div>
            <div class="blob red"></div>
            <div class="blob orange"></div>
            <div class="blob yellow"></div>
            <div class="blob blue"></div>
            <div class="blob green"></div>
            <div class="blob purple"></div>
            <div class="blob"></div>
          </div>
        </div>

        <div class="square-spinner"></div>-->
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  name: "HomeView",
  data: () => ({
    outputFilePath: "C:\\Users\\ultra\\Desktop\\",
    outputFileName: "points",
    outputFileFormat: "xlsx",
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
    testAlertClearData() {
      const sureDelete = confirm("Test Delete Alert");
      console.log(sureDelete);
    },
    downloadPoints() {
      // https://docs.sheetjs.com/docs/getting-started/example
      // Acad.Application.activedocument.capturePreview(200, 200).then(success, error);
      // try localstorage ex: operationID: random character and then store points
      const worksheet = XLSX.utils.json_to_sheet(this.recordedPoint);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Points");
      XLSX.writeFile(workbook, "Points.xlsx");
      this.startBtnStatus = !this.startBtnStatus;
    },
    recordPoint() {
      // Prompt for the user for the first point
      // eslint-disable-next-line no-undef
      let options = new Acad.PromptPointOptions(
        "Specify the first point of the rectangle: "
      );
      // eslint-disable-next-line no-undef
      Acad.Editor.getPoint(options).then(
        this.onFirstPoint,
        this.takePointError
      );
    },
    onFirstPoint(arg) {
      console.log(typeof arg);
      console.log(arg);
      console.log(arg.value);
      let cleanObject = {
        x: String(arg.value.x.toFixed(3)),
        y: String(arg.value.y.toFixed(3)),
        z: String(arg.value.z.toFixed(3)),
        c: "none",
      };

      this.recordedPoint.push(cleanObject);
    },
    takePointError() {
      alert("Invalid point specified.");
    },
    storeToLocalstorage() {
      localStorage.setItem("points", JSON.stringify(this.recordedPoint));
    },
    //  capture active cad screen
    success(encodedbmp) {
      var container = document.getElementById("imageContainer");
      var img = document.createElement("img");
      var src = "data:image/bmp;base64," + encodedbmp;
      img.setAttribute("src", src);
      img.setAttribute("id", "previewImg");
      container.appendChild(img);
    },

    error() {
      alert("error");
    },
    capturePreview() {
      // eslint-disable-next-line no-undef
      Acad.Application.activedocument
        .capturePreview(200, 200)
        .then(this.success, this.error);
    },
  },
};
</script>

<style scoped>
.blobs-container {
  display: flex;
}

.blob {
  background: black;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  margin: 10px;
  height: 20px;
  width: 20px;
  transform: scale(1);
  animation: pulse-black 2s infinite;
}

@keyframes pulse-black {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}

.blob.white {
  background: white;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  animation: pulse-white 2s infinite;
}

@keyframes pulse-white {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.blob.red {
  background: rgba(255, 82, 82, 1);
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  animation: pulse-red 2s infinite;
}

@keyframes pulse-red {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}

.blob.orange {
  background: rgba(255, 121, 63, 1);
  box-shadow: 0 0 0 0 rgba(255, 121, 63, 1);
  animation: pulse-orange 2s infinite;
}

@keyframes pulse-orange {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 121, 63, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 121, 63, 0);
  }
}

.blob.yellow {
  background: rgba(255, 177, 66, 1);
  box-shadow: 0 0 0 0 rgba(255, 177, 66, 1);
  animation: pulse-yellow 2s infinite;
}

@keyframes pulse-yellow {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 177, 66, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 177, 66, 0);
  }
}

.blob.blue {
  background: rgba(52, 172, 224, 1);
  box-shadow: 0 0 0 0 rgba(52, 172, 224, 1);
  animation: pulse-blue 2s infinite;
}

@keyframes pulse-blue {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(52, 172, 224, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
  }
}

.blob.green {
  background: rgba(51, 217, 178, 1);
  box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
  animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
}

.blob.purple {
  background: rgba(142, 68, 173, 1);
  box-shadow: 0 0 0 0 rgba(142, 68, 173, 1);
  animation: pulse-purple 2s infinite;
}

@keyframes pulse-purple {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(142, 68, 173, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(142, 68, 173, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(142, 68, 173, 0);
  }
}

/* for css loader */

.square-spinner {
  width: 55px;
  display: block;
  background-color: #03a9f4;
  height: 55px;
  -webkit-animation: 3s rotate2 ease-in-out infinite;
  animation: 3s flip ease-in-out infinite;
}

@-webkit-keyframes flip {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  25% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
    transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
  }
  75% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(-180deg);
    transform: perspective(120px) rotateX(0deg) rotateY(-180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(-360deg);
    transform: perspective(120px) rotateX(0deg) rotateY(-360deg);
  }
}

@keyframes flip {
  0% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  25% {
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
    transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
  }
  75% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(-180deg);
    transform: perspective(120px) rotateX(0deg) rotateY(-180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(-360deg);
    transform: perspective(120px) rotateX(0deg) rotateY(-360deg);
  }
}
</style>
