'use strict';

import { Selector, t } from 'testcafe';

class CommunityRecomendationPage {
    constructor() {
        this.pageTitle = '.pageheader';
        this.filtersButton = '#ShowAdvancedControls';
        this.filterSection ='.show_advanced_controls';
        this.ownRangeRadioButton = '#review_playtime_preset_custom';
        this.slider = '#app_reviews_playtime_slider .ui-slider-handle';
        this.minPlayedTimeLabel = '#app_reviews_playtime_range_text_min';
        this.maxPlayedTimeLabel = '#app_reviews_playtime_range_text_max';
        this.playedTime = '.hours';
    }

    async openFilters() {
        await t.click(this.filtersButton);
    }

    async filtersVisible() {
        await t.expect(Selector('.show_advanced_controls').exists).ok();
    }

    async setTimeRange(minTime, maxTime) {
        await t
            .click(this.ownRangeRadioButton)
            .drag(Selector(this.slider).nth(0), minTime, 0)
            .drag(Selector(this.slider).nth(1), - (maxTime), 0);
    }

    async getMinHours() {
        return parseInt((await Selector(this.minPlayedTimeLabel).innerText).replace(/[^\d]/g, ''));
    }

    async getMaxHours() {
        return parseInt((await Selector(this.maxPlayedTimeLabel).innerText).replace(/[^\d]/g, ''));
    }

    async getReviewsCount() {
        return await Selector(this.playedTime).count;
    }

    async countGamesInInterval(min, max, reviewsCount) {
        let i = 0;
        while (i < reviewsCount) {
            const hoursSpent = parseFloat((await Selector(this.playedTime).nth(i).innerText).replace(/[^\d.]/g, ''));
            if ( hoursSpent <= min && max <= hoursSpent) {
                break;
            }
            i++;
        }
        return i;
    }
}

export default new CommunityRecomendationPage();
