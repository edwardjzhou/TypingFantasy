// THIS IS FOR NAMESPACING. UI HAS NO like "state" to track of. So constructor is unused

export default class UI {
  

    static styleTooltip (){
        const tooltipStyle = {
            position: `relative`,
            display: `inline-block`,
        }

        const tooltiptextStyle = {
            ...tooltipStyle,
            // visibility: `hidden`,
            display: `none`,
            // width: `150px`,
            backgroundColor: `black`,
            color: `#fff`,
            textAlign: `left`,
            borderRadius: `6px`,
            padding: `5px 0`,
            /* Position the tooltip */
            position: `absolute`,
            zIndex: `1`,
        }

        Object.assign(document.querySelector(`#cheat-tooltiptext`).style, tooltiptextStyle)
        Object.assign(document.querySelector(`#cheat-tooltip`).style, tooltipStyle)
    }

    static handleClipboard () {
        //one-time CLIPBOARD COPY MY EMAIL HANDLING
        function fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Fallback: Copying text command was ' + msg);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }

            document.body.removeChild(textArea);
        }

        function copyTextToClipboard(text) {
            if (!navigator.clipboard) {
                fallbackCopyTextToClipboard(text);
                return;
            }

            navigator.clipboard.writeText(text).then(() => {
                console.log('Async: Copying to clipboard was successful!');
            }, (err) => {
                console.error('Async: Could not copy text: ', err);
            });
        }

        const clipboardImage = document.querySelector(`#clipboard`)
        clipboardImage.addEventListener('click', function () {
            copyTextToClipboard('edward@utexas.edu');
            this.style.height = `30px`
            setTimeout(function () {
                this.style.height = `25px`
            }.bind(this), 500)
        });
    }

  
    static ensureSorted (scores)  {
        const sorted = scores.sort((a, b) => b[0] - a[0])

        return ({
            sorted,
            'noInconsistency': (JSON.stringify(sorted) === JSON.stringify(scores))
        })
    }

    static async fetchScores() {
        let data
        const defaultData = Object.freeze([[123, "Edward"], [50, "John"], [30, "Crono"], [25, "Scala"], [15, "Robo"]])
        try {
            // fetch(./highscore) in index.html
            data = await fetch(`highscore`).then(res => res.json()) // res is a response object and running res.json() returns a promsie on the body stream is async so cant access res
        } catch (err) {
            console.log(err)
            data = defaultData
        } finally {
            UI.createScoreTable(data)
        }
    };

    static createScoreTable (scores) {
        const { noInconsistency: noInconsistency, sorted } = this.ensureSorted(scores)
        if (!noInconsistency) throw `high scores' broken`
        const textNode = document.createTextNode.bind(document)
        const lineBreak = () => document.createElement(`br`)
        const table = document.querySelector(`#highscore`)

        for (let [index, [score, name]] of Object.entries(scores)) {
            table.appendChild(
                textNode(`${++index}. ${name} scored ${score}`)
            )
            table.appendChild(lineBreak())
        }
        table.style.position = `absolute`
        UI.attachTableToCanvasRight(table)
    };

    static attachTableToCanvasRight (table, yetToAttach = true)  {
        const canvas = document.getElementById(`canvas`)
        table.style.left = 10 + canvas.getBoundingClientRect().right + `px`
        table.style.top = canvas.getBoundingClientRect().y + `px`
        if (yetToAttach) window.addEventListener('resize', () => this.attachTableToCanvasRight(table, false));
    }

    static deleteScores() {
        console.log(`delete`,this)
        const table = document.querySelector(`#highscore`)
        table.innerHTML = table.innerHTML.split(`</h1>`)[0]
    }

    static destroyerOfObjects() {
        for (let prop in window.game) {
            eval(`delete window.game.${prop} `)
        }
    }



    static addCheats() {
        const qs = document.querySelector.bind(globalThis.document)

        const linkedin = qs("a[href='https://www.linkedin.com/in/edzhou/']");
        const github = qs("a[href='https://github.com/featurerich1/']");
        const email = qs("a[href^='mailto']");


        linkedin.addEventListener(`click`, () => {
            if (!window.game.onSplash) window.game.rate = 2 * window.game.rate

        }, false)

        email.addEventListener(`mouseenter`, () => {
            if (!window.game.onSplash) window.game.rate = .66 * window.game.rate
        }, false)
    }

}