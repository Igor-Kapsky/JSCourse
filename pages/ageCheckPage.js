'use strict';

import { Selector, t } from 'testcafe';

class AgeCheckPage {
    constructor() {
        this.viewPageButton = '#view_product_page_btn';
        this.yearDropdown = '#ageYear';

    }

    async confirmAge() {
        await t.click(await Selector(this.viewPageButton));
    }

    async enterAge(year) {
        await t.click(await Selector(this.yearDropdown))
            .click(await Selector(this.yearDropdown).find('option').withText(year));
    }
}

export default new AgeCheckPage();
