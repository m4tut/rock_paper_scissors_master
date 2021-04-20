document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // //////////////////////////////
    // rules
    const rulesBtnElem = document.getElementById('rules_btn');
    const rulesElem = document.querySelector('.rules');
    const rulesCloseElem = document.querySelector('.rules_close');

    const escapeHandler = (event) => {
        if (event.code == 'Escape') {
            rulesElem.classList.remove('rules_active');
        }
    };

    const openRules = () => {
        rulesBtnElem.addEventListener('click', () => {
            rulesElem.style.display = 'flex';
            setTimeout(() => {
                rulesElem.classList.add('rules_active');
            }, 1);
            document.addEventListener('keydown', escapeHandler);
        });
    };

    const closeRules = () => {
        rulesCloseElem.addEventListener('click', () => {
            rulesElem.classList.remove('rules_active');
            setTimeout(() => {
                rulesElem.style.display = 'none';
            }, 1000);
            document.removeEventListener('keydown', escapeHandler);
        });

        document.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('rules_active')) {
                rulesElem.classList.remove('rules_active');
                setTimeout(() => {
                    rulesElem.style.display = 'none';
                }, 1000);
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
    const optionElem = document.querySelectorAll('.option');
    const mainElem = document.querySelector('.main');
    const mainGameElem = document.querySelector('.main_game');
    const newGameBlockElem = document.querySelector('.new_game_block');
    const youPickedBlockElem = document.querySelector('.you_picked_block');
    const theHousePickedBlockElem = document.querySelector('.the_house_picked_block');
    const playAgainElem = document.getElementById('play_again');
    const totalTextElem = document.getElementById('total_text');
    let btnElem;
    let truefalse = 1;
    const youWin = 'You Win';
    const youLose = 'You Lose';
    const itsATie = "IT'S A TIE";

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function winLoseTie(win, lose) {
        let rand = randomInteger(0, 2);
        console.log(optionElem);
        youPickedBlockElem.classList.remove('win_option');
        theHousePickedBlockElem.classList.remove('win_option');
        if (optionElem[rand].dataset.option == win) {
            totalTextElem.textContent = youWin;
            setTimeout(() => {
                youPickedBlockElem.classList.add('win_option');
                scoreNumberElem.textContent = Number(scoreNumberElem.textContent) + Number(1);
            }, 3000);
        } else if (optionElem[rand].dataset.option == lose) {
            totalTextElem.textContent = youLose;
            setTimeout(() => {
                theHousePickedBlockElem.classList.add('win_option');
                scoreNumberElem.textContent = '0';
            }, 3000);
        } else {
            totalTextElem.textContent = itsATie;
        }

        setTimeout(() => {
            theHousePickedBlockElem.innerHTML = '<div></div>' + optionElem[rand].outerHTML;
        }, 1500);

        setTimeout(() => {
            mainGameElem.classList.add('active_new_game');
        }, 2000);

        setTimeout(() => {
            newGameBlockElem.style.opacity = '1';
        }, 3000);
    }

    const gameLogic = (btn) => {
        if (bonusGameBtnElem.textContent == 'rps') {
            switch (btn) {
                case 'paper-option':
                    winLoseTie('rock-option', 'scissors-option');
                    break;

                case 'scissors-option':
                    winLoseTie('paper-option', 'rock-option');
                    break;

                case 'rock-option':
                    winLoseTie('scissors-option', 'paper-option');
                    break;
            }
        } else {
            let rand = randomInteger(0, 4);
        }
    };

    const game = () => {
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
                    }, 600);

                    youPickedBlockElem.innerHTML = '<div></div>' + item.outerHTML;
                    gameLogic(item.dataset.option);
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
            }, 600);

            totalTextElem.textContent = '';
            mainGameElem.classList.remove('active_new_game');
            newGameBlockElem.style.opacity = '0';
            theHousePickedBlockElem.innerHTML = '<div class="black_circle"></div>';
            truefalse = 1;
        });
    };

    game();
});
