import { Selector } from 'testcafe';
import MainPage from './pages/mainPage.js';
import CommunityRecomendationPage from './pages/communityRecomendationPage.js';
import { getRandomIntInclusive } from './utils/helpers.js';

fixture`Getting Started`
    .page`https://store.steampowered.com/`;

test('Playtime filter test', async t => {
    await t.expect(Selector(MainPage.logo).exists).ok({ timeout: 3000 });

    await MainPage.openCommunityRecommendations();

    await t.expect(Selector(CommunityRecomendationPage.pageTitle).innerText).eql('THE COMMUNITY RECOMMENDS');

    await CommunityRecomendationPage.openFilters();

    await CommunityRecomendationPage.filtersVisible();

    const minTime = getRandomIntInclusive(0, 260);
    const maxTime = getRandomIntInclusive(0, (260 - minTime));

    await CommunityRecomendationPage.setTimeRange(minTime, maxTime);

    const minPlayedTime = CommunityRecomendationPage.getMinHours();
    const maxPlayedTime = CommunityRecomendationPage.getMaxHours();
    const reviewsCount = await CommunityRecomendationPage.getReviewsCount();

    await t.expect(await CommunityRecomendationPage.checkGameInInterval(minPlayedTime, maxPlayedTime, reviewsCount)).eql(reviewsCount);

});
