'use strict';

import { Selector, t } from 'testcafe';

class GamePage {
    constructor() {
        this.gameTitle = '.apphub_HeaderStandardTop .apphub_AppName';
        this.gamePriceInitialSelector = '.game_area_purchase .discount_prices .discount_original_price';
        this.gamePriceDiscountedSelector = '.game_area_purchase .discount_prices .discount_final_price';
        this.gamePriceSelector = '.game_area_purchase_game_wrapper .game_purchase_action .game_purchase_price';

    }

    async checkPriceWithDiscount(game) {
        await t
            .expect(parseFloat((await Selector(this.gamePriceDiscountedSelector).innerText).replace(/[^\d,]/g, '').replace(',', '.'))).eql(game.currentPrice)
            .expect(parseFloat((await Selector(this.gamePriceInitialSelector).innerText).replace(/[^\d,]/g, '').replace(',', '.'))).eql(game.initialPrice);
    }

    async checkPrice(game) {
        await t
            .expect(parseFloat((await Selector(this.gamePriceSelector).innerText).replace(/[^\d,]/g, '').replace(',', '.'))).eql(game.currentPrice);
    }

}

export default new GamePage();
