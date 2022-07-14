'use strict';

import { Selector } from 'testcafe';

class CategoryPage {
    constructor() {
        this.categoryTitle = Selector('.page_contenthub_content .pageheader');
        this.topSellersTab = '#tab_select_TopSellers';
        this.availableTopSellersGames = '#TopSellersRows a';
        this.gameTitle = '.tab_item_name';
        this.gameCurrentPrice = '.discount_final_price';
        this.gameInitialPrice = '.discount_original_price';
        this.gameDiscount = ' .discount_pct';
    }

    async getTitle() {
        return await this.categoryTitle.innerText;
    }

    async findCheapestGame() {
        const currentPriceSelector = (i) => Selector(this.availableTopSellersGames).nth(i).find(this.gameCurrentPrice);
        const initialPriceSelector = (i) => Selector(this.availableTopSellersGames).nth(i).find(this.gameInitialPrice);
        const gamesAmount = await Selector(this.availableTopSellersGames).count;
        let availableGamesData = [];
        for (let i = 0; i < gamesAmount; i++) {
            const gameData = {};
            gameData.title = await Selector(await Selector(this.availableTopSellersGames).nth(i).find(this.gameTitle)).innerText;
            if (await currentPriceSelector(i).exists) {
                gameData.currentPrice = parseFloat((await currentPriceSelector(i).innerText).replace(/[^\d,]/g, '').replace(',', '.'));
                if (!gameData.currentPrice) {
                    gameData.currentPrice = undefined;
                }
            }
            if (await initialPriceSelector(i).exists) {
                gameData.initialPrice = parseFloat((await initialPriceSelector(i).innerText).replace(/[^\d,]/g, '').replace(',', '.'));
                gameData.discount = (await Selector(this.availableTopSellersGames).nth(i).find(this.gameDiscount).innerText).replace(/[^\d,]/g, '');
            }
            availableGamesData.push(gameData);
        }
        availableGamesData.sort((firstItem, secondItem) => firstItem.currentPrice - secondItem.currentPrice);
        return availableGamesData[0];
    }
}

export default new CategoryPage();
