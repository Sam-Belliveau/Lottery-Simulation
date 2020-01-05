
class BallData {
    constructor(min, max) {
        this.min = Math.min(min, max)
        this.max = Math.max(min, max)
    }

    random() {
        return window.CryptoByte.getRange(this.min, this.max + 1)
    }

    cap(n) {
        if(n < this.min) return this.min
        if(n > this.max) return this.max
        return n
    }
}

WhiteBall = new BallData(1, 69)
RedBall = new BallData(1, 26)


class BallSet {
    constructor(b1, b2, b3, b4, b5, red) {
        this.whites = [
            WhiteBall.cap(b1),
            WhiteBall.cap(b2),
            WhiteBall.cap(b3),
            WhiteBall.cap(b4),
            WhiteBall.cap(b5)
        ]
        this.red = RedBall.cap(red)
    }

    checkLevel(other) {
        var mRed = this.red == other.red
        var mWhite = 0

        // Count number of matching whites
        // Its a little bit complicated
        var balls = other.whites.slice()
        for(const i of this.whites) {
            for(var goal of balls) {
                if(i == goal && goal != -1) {
                    mWhite += 1
                    goal = -1
                    break;
                }
            }
        }

        switch(mWhite) {
            case 0: return mRed ? 1 : 0
            case 1: return mRed ? 1 : 0
            case 2: return mRed ? 2 : 0
            case 3: return mRed ? 3 : 2
            case 4: return mRed ? 4 : 3
            case 5: return mRed ? 6 : 5
        }
    }

    checkPrise(prise) {
        var prises = [4, 7, 100, 50000, 1000000, 10000000]
        return prises[this.checkLevel(prise)]
    }

    get text() {
        return "[" +
            this.whites[0] + " " +
            this.whites[0] + " " +
            this.whites[0] + " " +
            this.whites[0] + " " +
            this.whites[0] + " (" +
            this.red + ")]"
    }
}

function getRandomBallSet() {
    return new BallSet(
        WhiteBall.random(), WhiteBall.random(),
        WhiteBall.random(), WhiteBall.random(),
        WhiteBall.random(), RedBall.random()
    )
}

function getBallSetFromUser() {
    var balls = document.getElementById("ball-entry")
    return new BallSet(
        balls.elements[0].value,
        balls.elements[1].value,
        balls.elements[2].value,
        balls.elements[3].value,
        balls.elements[4].value,
        balls.elements[5].value
    )
}