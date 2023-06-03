import FoodSource from '../../data/food-source';
import { createFoodItemTemplate } from '../templates/template-creator';

const Food = {
  async render() {
    return `
    <main tabindex="0" id="content" class="main-content>
      <section class="content">
        <h2 tabindex="0" class="main-resto_label">
          Explore Restaurant dan Caffe
        </h2>
        <div id="list-food" class="list-food"></div>
      </section>
    </main>
`;
  },

  async afterRender() {
    const foods = await FoodSource.foodList();
    const foodContainer = document.querySelector('.list-food');

    foods.forEach((food) => {
      foodContainer.innerHTML += createFoodItemTemplate(food);
    });
  },
};

export default Food;
