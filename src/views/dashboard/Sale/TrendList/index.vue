<template>
  <div>
    <h3>门店{{ title }}排名</h3>
    <ul>
      <li>
        <span class="rindex top">1</span>
        <span>肯德基</span>
        <span class="rvalue">123456</span>
      </li>
      <li>
        <span class="rindex top">2</span>
        <span>肯德基</span>
        <span class="rvalue">123456</span>
      </li>
      <li>
        <span class="rindex top">3</span>
        <span>肯德基</span>
        <span class="rvalue">123456</span>
      </li>
      <li>
        <span class="rindex">4</span>
        <span>肯德基</span>
        <span class="rvalue">123456</span>
      </li>
      <li>
        <span class="rindex">5</span>
        <span>肯德基</span>
        <span class="rvalue">123456</span>
      </li>
      <li>
        <span class="rindex">6</span>
        <span>肯德基</span>
        <span class="rvalue">123456</span>
      </li>
      <li>
        <span class="rindex">7</span>
        <span>肯德基</span>
        <span class="rvalue">123456</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TrendList',
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 20px;
}
li span {
  margin: 0px 15px;
}

.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  vertical-align: sub;
}
.top {
  background: black;
  color: white;
}
.rvalue {
  float: right;
}
</style>
