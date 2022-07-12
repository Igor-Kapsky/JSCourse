'use strict';

import { Selector } from 'testcafe';

class CategoryPage {
    constructor() {
        this.categoryTitle = Selector('.page_contenthub_content .pageheader');
        this.topSellersTab = '#tab_select_TopSellers';
        this.currentGamePrice = '#TopSellersTable .discount_final_price';

    }


    async getTitle() {
        return await this.categoryTitle.innerText;
    }

    async getGamesCount() {
        return await Selector(this.currentGamePrice).count;
    }

    async findCheapestGame(gamesCount) {
        let cheapestGame = { };
        cheapestGame.currentPrice = parseFloat((await Selector(this.currentGamePrice).nth(0).innerText).replace(/[^\d,]/g, '').replace(',', '.'));
        if (isNaN(cheapestGame.currentPrice)) {
            cheapestGame.currentPrice = Infinity;
        }
        cheapestGame.number = 0;
        for (let i = 1; i < gamesCount; i++) {
            if (parseFloat((await Selector(this.currentGamePrice).nth(i).innerText).replace(/[^\d,]/g, '').replace(',', '.')) < cheapestGame.currentPrice) {
                cheapestGame.currentPrice = parseFloat((await Selector(this.currentGamePrice).nth(i).innerText).replace(/[^\d,]/g, '').replace(',', '.'));
                cheapestGame.number = i;
                if (await Selector(this.currentGamePrice).nth(i).prevSibling().exists) {
                    cheapestGame.initialPrice = parseFloat((await Selector(this.currentGamePrice).nth(i).prevSibling().innerText).replace(/[^\d,]/g, '').replace(',', '.'));
                } else {
                    delete cheapestGame.initialPrice;
                }
            }
        }
        return cheapestGame;
    }
}

export default new CategoryPage();
