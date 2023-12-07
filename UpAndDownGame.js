const prefix = '!'; // 접두사 변경 선택 / Select Change Prefix

let isStart = false;
let answer = 0;
let count = 0;
let chance = 0;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

    if (room == 'your room name') {  //채팅방 이름 수정 필수 / Modifying chat room name is required

        if (msg == prefix + "업다운") {
            replier.reply(help());
        }

        start(msg, replier);

        isCorrectAnswer(msg, replier, sender);

        giveUp(msg, replier, sender);
    }

}

function start(msg, replier) {
    if (msg == prefix + "업다운시작" && !isStart) {
        answer = Math.floor(Math.random() * 99) + 1;
        replier.reply("정답이 정해졌습니다(기회 5번)\n1~100");
        isStart = true;
        count = 0;
        chance = 7;
    } else if (msg == prefix + "업다운" && isStart) {
        replier.reply("이미 게임이 진행중 입니다.");
    }
}

function isCorrectAnswer(msg, replier, sender) {
    if (isStart) {
        if (msg.startsWith(prefix + "업다운정답 ")) {
            let msgAnswer = Number(msg.substr(7));

            if (msgAnswer == answer) {
                count++;
                chance--;
                replier.reply(sender + " 님이 " + count + "번 만에 정답을 맞혔습니다!\n정답 : " + answer);
                isStart = false;
                count = 0;
                chance = 7;
            } else if (count == 6) {
                replier.reply("기회 7번을 모두 사용했습니다\n정답:" + answer);
                replier.reply("GAME OVER");
                isStart = false;
                count = 0;
                chance = 7;
            } else if (msgAnswer < answer) {
                count++;
                chance--;
                replier.reply("Up!\n남은기회:" + chance + "번");
            } else if (msgAnswer > answer) {
                count++;
                chance--;
                replier.reply("Down!\n남은기회:" + chance + "번");
            }
        }
    }
}

function giveUp(msg, replier, sender) {
    if (msg == prefix + "업다운포기" && isStart) {
        replier.reply(sender + " 님이 포기하셨습니다\n정답:" + answer);
        isStart = false;
        count = 0;
        chance = 7;
    }
}

function help() {
    let msg = '업다운 명령어\n\n';
    const help = [
        '!업다운시작',
        '!업다운정답 (숫자)',
        '!업다운포기'
    ];

    msg += help.join('\n');

    return msg;
}