document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // //////////////////////////////
    // rules
    const rulesBtnElem = document.getElementById('rules_btn');
    const rulesElem = document.querySelector('.rules');
    const rulesCloseElem = document.querySelector('.rules_close');

    const escapeHandler = (event) => {
        console.log('gg');
        if (event.code == 'Escape') {
            rulesElem.classList.remove('rules_active');
        }
    };

    const openRules = () => {
        rulesBtnElem.addEventListener('click', () => {
            rulesElem.classList.add('rules_active');
            document.addEventListener('keydown', escapeHandler);
        });
    };

    const closeRules = () => {
        rulesCloseElem.addEventListener('click', () => {
            rulesElem.classList.remove('rules_active');
            document.removeEventListener('keydown', escapeHandler);
        });

        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('rules_active')) {
                rulesElem.classList.remove('rules_active');
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    };

    openRules();
    closeRules();

    // //////////////////////////////
    // bonus game
    const bonusGameBtnElem = document.getElementById('bonusGame_btn');
    const imgRulesElem = document.querySelector('.img_rules');
    const body = document.body;

    bonusGameBtnElem.addEventListener('click', () => {
        body.classList.toggle('bonus_game');
        if (bonusGameBtnElem.textContent == 'rps') {
            imgRulesElem.src = 'images/image-rules-bonus.svg';
            bonusGameBtnElem.textContent = 'rpsls';
        } else {
            bonusGameBtnElem.textContent = 'rps';
            imgRulesElem.src = 'images/image-rules.svg';
        }
    });
});
