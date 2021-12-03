
// 인사이트
// 1 이벤트 위임을 어떻게 할 수 있는지?
// 2 요구사항을 전략적으로 단계적으로 접근하는지, 세세하게 나누는지
// 3. DOM 요소를 가져올 때 변수처럼 사용
// 4. 새롭게 알게 된 메서드


// todolist

// todo 메뉴
// [O] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
// [O] 메뉴의 이름을 입력 받고 엔터를 누르면 메뉴가 추가된다.
// [O] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// [O] 총 메뉴 갯수를 count 하여 상단에 보여준다.
// [O] 메뉴가 추가되고 나면, inpput은 빈 값으로 초기화 된다.
// [O] 사용자 입력값이 빈 값이라면 추가되지 않는다.


// todo LocalStorage Read & Write
// [] localStorage에 데이터를 저장한다.
// [] localStorage에 있는 데이터를 읽어온다.


// todo 메뉴판 관리
// [] 에스프레소, 프라푸치노, 블랜디드, 티바나, 디저트 메뉴판 관리

// todo 페이지 접근시 최초 데이터 Read & Rendering
// [] 페이지에 최초로 로딩될 때 LocalStorage 에스프레소 메뉴를 읽어온다
// [] 에스프레소 메뉴를 페이지에 그려준다.

// todo 품절 상태 관리
// [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out 클래스를 추가하여 상태를 변경한다.
// [] 품절 버튼을 추가한다.
// [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다
// [] 클릭이벤트에서 가장 가까운 li태그의 class 속성 값에 sold-out을 추가한다.



const $ = (selector) => document.querySelector(selector);

const store = {
    setLocalStorage(menu) {
        localStorage.setItem("menu", JSON.stringify(menu));
    },
    getLocalStorage() {
        getLocalStorage.getItem("menu");
    },
};

function App() {

    // 상태(변하는 데이터) - 갯수, 메뉴명

    this.menu = [];

    const updateMenuCaount = () => {
        const menuCount = $('#espresso-menu-list').querySelectorAll("li").length;
        $(".menu-count").innerText = `총 ${menuCount} 개`;
        $("#espresso-menu-name").value = "";
    }

    const updateMenuName = (e) => {
        const $menuName = e.target.closest("li").querySelector(".menu-name");
            const updatedMenuName = prompt(
                "메뉴명을 수정하세요.",
                $menuName.innerText
                );
                $menuName.innerText = updatedMenuName;
    }


    const removeMenuName = (e) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            e.target.closest("li").remove();
            updateMenuCaount();
        }
    };


    $("#espresso-menu-list")
    .addEventListener("click", (e) => {
        if (e.target.classList.contains("menu-edit-button")) {
            updateMenuName(e);
        }

        if (e.target.classList.contains("menu-remove-button")) {
            removeMenuName(e);
        }
    });


    // 중복되는 코드 줄이는 방법 참고하기

    // $("#espresso-menu-list")
    // .addEventListener("click", (e) => {
    //     if (e.target.classList.contains("menu-edit-button")) {
    //         const menuName = e.target
    //         .closest("li")
    //         .querySelector(".menu-name").innerText;

    //         const updatedMenuName =
    //         prompt("메뉴명을 수정하세요.", menuName);
    //         e.target
    //         .closest("li")
    //         .querySelector(".menu-name").innerText =
    //         updatedMenuName;
    //         }
    // })

    // .innerText를 넣어주지 않은 이유 물어보기 -> 다른 속성에도 접근하기 위해




    // form 태그가 자동으로 전송되는걸 막아준다.
    $("#espresso-menu-form")
        .addEventListener("submit", (e) => {
            e.preventDefault();
        });

    // 재사용되는 코드는 함수로 만들어준다.
    const addeMenuName = () => {
        if ($("#espresso-menu-name").value === ""){ //공백일 때 값을 입력해주세요.
            alert("값을 입력해주세요.");
            return;
        }

        const espressoMenuName = $("#espresso-menu-name").value;
        this.menu.push({ name: espressoMenuName });
        const template = this.menu.map((item) => {
            `
                <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                수정
                </button>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                삭제
                </button>
                </li>`;
            })
            .join("");


        const menuItemTemplate = (
            espressoMenuName
            ) => {
            return `
                <li class="menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
                >
                수정
                </button>
                <button
                type="button"
                class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
                >
                삭제
                </button>
                </li>`;
        };

        $("#espresso-menu-list").insertAdjacentHTML(
            "beforeend",
            menuItemTemplate(espressoMenuName)
        );
        // const menuCcount = li 갯수를 카운팅 한다. html class명을 활용하면 좋다.
        updateMenuCaount();
        $("#espresso-menu-name").value = "";

        console.log(menuItemTemplate(espressoMenuName));

    }

    $("#espresso-menu-submit-button").addEventListener("click", addeMenuName);


    // 메뉴의 이름을 입력
    $("#espresso-menu-name")
        .addEventListener("keypress", (e) => {
            if (e.key !== "Enter") { //key값이 아니면 엔터 노노해
                return;
            }
            addeMenuName()
            });
}

App();


