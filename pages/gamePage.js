'use strict';

import { Selector } from 'testcafe';

class GamePage {
    constructor() {
        this.gameTitle = '.apphub_HeaderStandardTop .apphub_AppName';
        this.gamePriceInitialSelector = '.game_area_purchase .discount_prices .discount_original_price';
        this.gamePriceDiscountedSelector = '.game_area_purchase .discount_prices .discount_final_price';
        this.gameDiscountSelector = '.game_area_purchase .discount_pct';
        this.gamePriceSelector = '.game_area_purchase_game_wrapper .game_purchase_action .game_purchase_price';
    }

    async getGameDetailsWithDiscount() {
        const game = {};
        game.title = await Selector(this.gameTitle).innerText;
        if (await Selector(this.gamePriceInitialSelector).exists) {
            game.currentPrice = parseFloat((await Selector(this.gamePriceDiscountedSelector).innerText).replace(/[^\d,]/g, '').replace(',', '.'));
            game.initialPrice = parseFloat((await Selector(this.gamePriceInitialSelector).innerText).replace(/[^\d,]/g, '').replace(',', '.'));
            game.discount = (await Selector(this.gameDiscountSelector).innerText).replace(/[^\d,]/g, '');
        } else {
            game.currentPrice = parseFloat((await Selector(this.gamePriceSelector).innerText).replace(/[^\d,]/g, '').replace(',', '.'));
        }
        return game;
    }
}

export default new GamePage();
