'use strict';

import { Selector, t } from 'testcafe';

class MainPage {
    constructor() {
        this.availableGenres = Selector('[data-genre-group="themes"] .popup_menu_item');
        this.categoriesMenu = '#genre_tab';
        this.logo = '#logo_holder';
        this.yourStoreMenu = '#foryou_tab';
        this.communityRecommendationsLink = '#foryou_flyout .popup_menu_item[href*="communityrecommendations"]';

    }


    async getGenresCount() {
        return await this.availableGenres.count;
    }

    async openCommunityRecommendations() {
        await t
            .hover(this.yourStoreMenu)
            .click(this.communityRecommendationsLink);
    }
}

export default new MainPage();
