let page = 0
const html = $('html')
html.animate({ scrollTop: 0 }, 10)

window.addEventListener('wheel', (e) => {
	e.preventDefault()
}, { passive : false })

$(window).on('wheel', (e) => {
    if (html.is(":animated")) {
        return
    }

    if (e.originalEvent.deltaY > 0) {
        page = 1
        console.log('Down')
    } else if (e.originalEvent.deltaY < 0) {
        page = 0
        console.log('Up')
    }

    const targetPos = page * $(window).height();
    html.animate({ scrollTop: targetPos })
})


let cur_cookie_front = -1
let cur_cookie_back = -1
let cur_pet = -1
let cur_episode = -1

const cookies = [
    '용감한 쿠키군',
    '명랑한 쿠키양',
    '구름맛 쿠키',
    '딸기맛 쿠키',
    '버터크림 초코쿠키',
    '쿠키앤크림 쿠키',
    '공주맛 쿠키',
    '근육맛 쿠키',
    '보더맛 쿠키',
    '용사맛 쿠키',
    '좀비맛 쿠키',
    '커피맛 쿠키',
    '산타맛 쿠키',
    '닌자맛 쿠키',
    '천사맛 쿠키',
    '해적맛 쿠키',
    '피겨여왕맛 쿠키',
    '히어로맛 쿠키',
    '특전사맛 쿠키',
    '치어리더맛 쿠키',
    '악마맛 쿠키',
    '구미호맛 쿠키',
    '의적맛 쿠키',
    '마법사맛 쿠키',
    '요정맛 쿠키',
    '락스타맛 쿠키',
    '음유시인맛 쿠키',
    '체리맛 쿠키',
    '눈설탕맛 쿠키',
    '핑크초코쿠키',
    '예언자맛 쿠키',
    '피스타치오맛 쿠키',
    '연금술사맛 쿠키',
    '뱀파이어맛 쿠키',
    '풋사과맛 쿠키',
    '치즈케이크맛 쿠키',
    '소다맛 쿠키',
    '탐험가맛 쿠키',
    '블랙베리맛 쿠키',
    '키위맛 쿠키',
    '웨어울프맛 쿠키',
    '민트초코쿠키',
    '코코아맛 쿠키',
    '홍고추맛 쿠키',
    '슈크림맛 쿠키',
    '버블껌맛 쿠키',
    '벚꽃맛 쿠키',
    '레몬맛 쿠키',
    '오렌지맛 쿠키',
    '라임맛 쿠키',
    '박하사탕맛 쿠키',
    '대추맛 쿠키',
    '복숭아맛 쿠키',
    '양파맛 쿠키',
    '시나몬맛 쿠키',
    '마카롱맛 쿠키',
    '단팥맛 쿠키',
    '화이트초코맛 쿠키',
    '허브맛 쿠키',
    '다이노사워 쿠키',
    '솜사탕맛 쿠키',
    '롤케이크맛 쿠키',
    '바나나맛 쿠키',
    '팬케이크맛 쿠키',
    '달토끼맛 쿠키',
    '정글전사 쿠키',
    '불꽃정령 쿠키',
    '달빛술사 쿠키',
    '바다요정 쿠키',
    '바람궁수 쿠키',
    '딸기쇼트케이크맛 쿠키',
    '굴랍자문맛 쿠키',
    '카주카틀리맛 쿠키',
    '멜로우버니 쿠키'
]

const pets = [
    '초코방울',
    '치즈방울',
    '구름사탕',
    '산타양말',
    '조랭이젤리',
    '좋은손',
    '뭉치유니콘',
    '산타모자',
    '생크림 모카커피',
    '쌍둥이 덤벨',
    '포근실타래',
    '안깐 마늘',
    '테크노볼',
    '럭키다이스 형제',
    '브레인껌',
    '용의 꼬리',
    '천사의 별',
    '플라워콥터',
    '빛나는 럭키 호박',
    '공주의 장신구',
    '꼬마유령',
    '해적의 폭탄',
    '눈꽃송이',
    '젤리코 큐브',
    '건빵 보급병',
    '반짝이볼',
    '황금방울',
    '불꽃박쥐',
    '바람이',
    '여우구슬',
    '마법사전',
    '꽃봉오리',
    '스포트라이트',
    '로켓폭죽',
    '통나무케이크',
    '스노우 글로브',
    '복주머니',
    '핑크캔디',
    '보라보라 향초',
    '반딧불이',
    '젤리저울',
    '코인저울',
    '참나무 주스통',
    '토끼사과',
    '치즈뭉치 고양이',
    '조각레몬',
    '배낭이',
    '집사 유령',
    '키위새',
    '털뭉치 멍뭉이',
    '미스 도레미',
    '미스터 파솔라시',
    '마시멜로 햄찌',
    '파프리카 샌드백',
    '도토리 부엉이',
    '미니 잭슨 2호',
    '홍차 찻잔',
    '레몬 전지',
    '어린쥐',
    '백금방울',
    '미스터 삑',
    '종이배 선원',
    '판다만두',
    '식지 않는 찻잔',
    '양파 물고기',
    '시나몬롤 토끼',
    '파도방울',
    '캐스터네츠',
    '찹쌀 하프물범',
    '회중시계 심판',
    '허브티팟',
    '팝핑 용알',
    '솜사탕 비둘기',
    '라이트 형제',
    '사바나나 사자',
    '팬케이크 원반',
    '달절구',
    '초코 왕방울',
    '방울방울 콩콩이',
    '작은 케이크들개',
    '꼬마북',
    '앵무할아범',
    '말랑 에그버니'
]

const episodes = [
    '마녀의 오븐',
    '원시림',
    '용의 협곡',
    '마법사들의 도시',
    '디저트 파라다이스'
]

const unknown = new Image();
unknown.src = './images/unknown.webp'

const cookies_image = Array.from({ length: cookies.length }, (_, idx) => {
    const img = new Image()
    img.src = `./images/cookies/${idx}.webp`

    return img
})

const pets_image = Array.from({ length: pets.length }, (_, idx) => {
    const img = new Image()
    img.src = `./images/pets/${idx}.webp`
    
    return img
})

const episodes_image = Array.from({ length: episodes.length }, (_, idx) => {
    const img = new Image()
    img.src = `./images/episodes/${idx}.webp`
    
    return img
})

const randrange = (range) => {
    const randomArr = new Uint32Array(1)

    window.crypto.getRandomValues(randomArr)

    return randomArr[0] % range
}

const choice = (prev, index, array) => {
    let rand = randrange(array.length)

    while (
        (rand === prev) || 
        (index === 1 && rand === cur_cookie_back) || 
        (index === 2 && rand == cur_cookie_front)
    ) {
        rand = randrange(array.length)
    }

    return rand
}

const randomCookieFront = (index) => {
    if (cur_cookie_front !== -1) {
        decreaseReroll();
    }

    cur_cookie_front = choice(cur_cookie_front, index, cookies)

    document.getElementById('img' + index).src = cookies_image[cur_cookie_front].src
    document.getElementById('name' + index).innerText = cookies[cur_cookie_front]
}

const randomCookieBack = (index) => {
    if (cur_cookie_back !== -1) {
        decreaseReroll();
    }

    cur_cookie_back = choice(cur_cookie_back, index, cookies)

    document.getElementById('img' + index).src = cookies_image[cur_cookie_back].src
    document.getElementById('name' + index).innerText = cookies[cur_cookie_back]
}

const randomPet = (index) => {
    if (cur_pet !== -1) {
        decreaseReroll();
    }

    cur_pet = choice(cur_pet, index, pets)

    document.getElementById('img' + index).src = pets_image[cur_pet].src
    document.getElementById('name' + index).innerText = pets[cur_pet]
}

const randomEpisode = (index) => {
    cur_episode = choice(cur_episode, index, episodes)

    document.getElementById('img' + index).src = episodes_image[cur_episode].src
    document.getElementById('name' + index).innerText = episodes[cur_episode]
}

const combiBonusEffect = () => {

    confetti({
        particleCount: 200,
        spread: 70,
        startVelocity: 80,
        scalar: 1,
        origin: {
            y: 1
        }
    });
}

const allClear = () => {
    cur_cookie_front = -1;
    cur_cookie_back = -1;
    cur_pet = -1;
    cur_episode = -1;
    
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`img${i}`).src = unknown.src;
        document.getElementById(`name${i}`).innerText = '지정되지 않음'
    }
}

const exchangeFrontBack = () => {

    if (cur_cookie_front === -1 || cur_cookie_back === -1) {
        return;
    }

    [cur_cookie_front, cur_cookie_back] = [cur_cookie_back, cur_cookie_front];

    document.getElementById('img1').src = cookies_image[cur_cookie_front].src
    document.getElementById('name1').innerText = cookies[cur_cookie_front]
    document.getElementById('img2').src = cookies_image[cur_cookie_back].src
    document.getElementById('name2').innerText = cookies[cur_cookie_back]
}

const increaseReroll = () =>{
    document.getElementById('reroll').value++;
}

const decreaseReroll = () =>{
    document.getElementById('reroll').value--;
}
