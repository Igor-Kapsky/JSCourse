import { Selector } from 'testcafe';
import MainPage from './pages/mainPage.js';
import CategoryPage from './pages/categoryPage.js';
import AgeCheckPage from './pages/ageCheckPage.js';
import GamePage from './pages/gamePage.js';
import { getRandomInt } from './utils/helpers.js';

fixture`Getting Started`
    .page`https://store.steampowered.com/`;

test('Cheapest game', async t => {

    const genresCount = await MainPage.getGenresCount();
    const randomGenreNumber = getRandomInt(0, genresCount);
    const themeTitle = await MainPage.availableGenres.nth(randomGenreNumber).innerText;

    await t
        .hover(MainPage.categoriesMenu)
        .click(MainPage.availableGenres.nth(randomGenreNumber));

    await t
        .expect(await CategoryPage.getTitle()).contains(themeTitle);

    await t.click(CategoryPage.topSellersTab);

    const topSellersCount = await CategoryPage.getGamesCount();
    const game = await CategoryPage.findCheapestGame(topSellersCount);

    await t.click(await Selector(CategoryPage.currentGamePrice).nth(game.number));

    if (await Selector(AgeCheckPage.viewPageButton).exists) {
        await AgeCheckPage.enterAge('1989');
        await AgeCheckPage.confirmAge();
    }

    await t.expect(Selector(GamePage.gameTitle).exists).ok({ timeout: 3000 });

    if (game.initialPrice) {
        await GamePage.checkPriceWithDiscount(game);
    } else {
        await GamePage.checkPrice(game);
    }
});
