import {
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
} from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteResto, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteResto = favoriteResto;
    await this._renderButton();
  },

  async _renderButton() {
    const {
      id,
    } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLikedButton();
    } else {
      this._renderLikeButton();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteResto.getFood(id);
    return !!restaurant;
  },

  _renderLikeButton() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.getElementById('likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteResto.putFood(this._restaurant);
      this._renderButton();
    });
  },

  _renderLikedButton() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const likedButton = document.getElementById('likeButton');
    likedButton.addEventListener('click', async () => {
      await this._favoriteResto.deleteFood(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
