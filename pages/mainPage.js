'use strict';

import { Selector, t } from 'testcafe';
import { getRandomInt } from '../utils/helpers.js'

class MainPage {
    constructor() {
        this.availableGenres = Selector('[data-genre-group="themes"] .popup_menu_item');
        this.categoriesMenu = '#genre_tab';
        this.logo = '#logo_holder';
        this.yourStoreMenu = '#foryou_tab';
        this.communityRecommendationsLink = '#foryou_flyout .popup_menu_item[href*="communityrecommendations"]';
    }

    async getGenresCount() {
        await t.hover(this.categoriesMenu);
        return await this.availableGenres.count;
    }

    async getGenreTitle() {
        const randomGenreNumber = getRandomInt(0, await this.getGenresCount());
        return await this.availableGenres.nth(randomGenreNumber).innerText;
    }

    async openPageFromTopBar(menu, option) {
        await t
            .hover(menu)
            .click(option);
    }
}

export default new MainPage();
