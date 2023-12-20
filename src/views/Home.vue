<template>
  <div class="home">
    <div v-for="item in items" :key="item.id" class="image-item">
      <router-link :to="item.link">
        <div class="item-container">
          <img :src="item.image" :alt="item.name" />
          <button class="item-button">{{ item.name }}</button>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomePage', // change this line
  data() {
    return {
      items: [
        { id: 1, name: '上传产品', image: require('@/assets/home/home1.png'), link: '/product_management' },
        { id: 2, name: '商品管理', image: require('@/assets/home/home2.png'), link: '/coming-soon' },
        { id: 3, name: 'UinShop商城', image: require('@/assets/home/home3.png'), link: '/coming-soon' },
        { id: 4, name: '查看订单', image: require('@/assets/home/home4.png'), link: '/coming-soon' },
        { id: 5, name: '领取空投', image: require('@/assets/home/home5.png'), link: '/coming-soon' },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px 0;
}

.image-item {
  width: 90%;
  margin-bottom: 20px;
  text-align: center;
}

.image-item img {
  width: 44px; /* 调整图片宽度 */
  height: 44px; /* 调整图片高度 */
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.image-item router-link {
  text-decoration: none;
  color: #333;
}
.item-container {
  display: flex;
  flex-direction: row; /* 垂直堆叠元素 */
  align-items: center;
  background-color: #ccc; /* 灰色背景 */
  padding: 10px;
  border-radius: 10px;
}

.item-button {
  font-size: 1.9rem; /* 增大文字大小 */
  height: 72px; /* 设置按钮高度 */
  width: 100%; /* 按钮占据整个宽度 */
  background-color: #ccc; /* 设置按钮背景颜色与.item-container相同 */
  color: #333333;
  padding: 10px;
  border-radius: 5px;
  text-align: left; /* 文字靠左对齐 */


}

</style>