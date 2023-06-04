import FoodSource from '../../data/food-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteFoodIdb from '../../data/food-idb';
import { createFoodDetailTemplate } from '../templates/template-creator';
import PostReview from '../../utils/post-review';

const Detail = {
  async render() {
    return `
      <div tabindex="0" class="main">
        <h2 tabindex="0" class="explore-restaurant__label">Detail Restaurant dan Caffe</h2>
        <section id="detail-rest"></section>
        <div class="like" id="likeButtonContainer"></div>
      </div>
  
      <div class="form-review">
            <form>
              <div class="mb-3">
                <label for="inputName" class="form-label">Name</label>
                <input name="inputName" type="text" class="form-control" id="inputName">
              </div>
              <div class="mb-3">
                <label for="inputReview" class="form-label">Review</label>
                <input name="inputReview" type="text" class="form-control" id="inputReview">
              </div>
              <button id="submit-review" type="submit" class="btn">Submit</button>
            </form>
          </div>
      </div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await FoodSource.foodDetail(url.id);
    const restaurantContainer = document.querySelector('#detail-rest');
    restaurantContainer.innerHTML = createFoodDetailTemplate(
      restaurant.restaurant,
    );

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteResto: FavoriteFoodIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    const submitReview = document.getElementById('submit-review');
    submitReview.addEventListener('click', (event) => {
      event.preventDefault();
      PostReview();
    });
  },
};
export default Detail;
