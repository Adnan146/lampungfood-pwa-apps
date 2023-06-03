import FavoriteFoodIdb from '../../data/food-idb';
import { createFoodItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <main tabindex="0" id="content" class="main-content>
    <section class="content">
        <h2 tabindex="0" class="explore-restaurant__label">
          Favorite
        </h2>
        <h2 class="restaurant-item__not__found">Tidak ada favorite </h2>
        <div id="list-food" class="list-food"></div>
    </section>
  </main>
        `;
  },

  async afterRender() {
    const foods = await FavoriteFoodIdb.getAllFood();
    const foodsContainer = document.querySelector('#list-food');

    foods.forEach((food) => {
      foodsContainer.innerHTML += createFoodItemTemplate(food);
    });
  },
};

export default Favorite;
