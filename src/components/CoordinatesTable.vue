<template>
  <!-- table -->
  <section class="row">
    <div class="col-12">
      <table
        class="table table-bordered table-hover table-striped table-sm table-dark text-center mt-3"
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">X</th>
            <th scope="col">Y</th>
            <th scope="col">Z</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-show="points.length > 0"
            v-for="po in points"
            :key="po.pn"
            @dblclick="setSelectedPoint(po)"
            class="point-tr user-select-none"
            :class="selectedPoint.pn === po.pn ? 'selected-tr' : ''"
          >
            <th scope="row">{{ po.pn }}</th>
            <td>{{ po.x }}</td>
            <td>{{ po.y }}</td>
            <td>{{ po.z }}</td>
          </tr>
          <tr v-show="points.length === 0">
            <td colspan="4" class="text-muted user-select-none">No points</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: "CoordinatesTable",
  props: {
    points: [],
    selectedPoint: {},
    setSelectedPoint: {
      type: Function,
    },
  },
};
</script>

<style scoped></style>
