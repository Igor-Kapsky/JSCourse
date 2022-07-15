import { Selector } from 'testcafe';
import MainPage from './pages/mainPage.js';
import CategoryPage from './pages/categoryPage.js';
import AgeCheckPage from './pages/ageCheckPage.js';
import GamePage from './pages/gamePage.js';

fixture`Getting Started`
    .page`https://store.steampowered.com/`;

test('Check prices for cheapest game', async t => {

    const themeTitle = await MainPage.getGenreTitle();

    await MainPage.openPageFromTopBar(MainPage.categoriesMenu, MainPage.availableGenres.withText(themeTitle));
    await t
        .expect(await CategoryPage.getTitle()).contains(themeTitle);
    await t.click(CategoryPage.topSellersTab);

    const cheapestGame = await CategoryPage.findCheapestGame();

    await t.click(await Selector(CategoryPage.availableTopSellersGames).find(CategoryPage.gameTitle).withText(cheapestGame.title));

    if (await Selector(AgeCheckPage.viewPageButton).exists) {
        await AgeCheckPage.enterAge('1989');
        await AgeCheckPage.confirmAge();
    }

    await t.expect(Selector(GamePage.gameTitle).exists).ok();

    let gameCard = await GamePage.getGameDetailsWithDiscount();

    await t.expect(cheapestGame).eql(gameCard);
});
