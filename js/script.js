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
    const scoreNumberElem = document.querySelector('.score_number');
    const body = document.body;

    bonusGameBtnElem.addEventListener('click', () => {
        body.classList.toggle('bonus_game');
        scoreNumberElem.textContent = '0';
        if (bonusGameBtnElem.textContent == 'rps') {
            imgRulesElem.src = 'images/image-rules-bonus.svg';
            bonusGameBtnElem.textContent = 'rpsls';
        } else {
            bonusGameBtnElem.textContent = 'rps';
            imgRulesElem.src = 'images/image-rules.svg';
        }
    });

    // //////////////////////////////
    // game
    const game = () => {
        const optionElem = document.querySelectorAll('.option');
        const mainElem = document.querySelector('.main');
        const mainGameElem = document.querySelector('.main_game');
        const youPickedBlockElem = document.querySelector('.you_picked_block');
        const playAgainElem = document.getElementById('play_again');
        let btnElem;
        let truefalse = 1;
        const youWin = 'You Win';
        const youLose = 'You Lose';
        const itsATie = "IT'S A TIE";

        optionElem.forEach((item) => {
            item.addEventListener('click', () => {
                if (truefalse) {
                    mainElem.style.opacity = '0';

                    setTimeout(() => {
                        mainElem.style.display = 'none';
                    }, 500);

                    mainGameElem.style.display = 'flex';

                    setTimeout(() => {
                        mainGameElem.style.opacity = '1';
                    }, 800);

                    youPickedBlockElem.innerHTML = item.outerHTML;
                    btnElem = item.dataset.option;
                    truefalse = 0;
                }
            });
        });

        playAgainElem.addEventListener('click', () => {
            mainGameElem.style.opacity = '0';
            setTimeout(() => {
                mainGameElem.style.display = 'none';
            }, 500);

            setTimeout(() => {
                mainElem.style.display = 'block';
            }, 500);

            setTimeout(() => {
                mainElem.style.opacity = '1';
            }, 800);

            truefalse = 1;
        });
    };

    game();
});
