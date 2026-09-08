// =====================================================
// ==================== 층 선택 ========================
// =====================================================

// 모든 층의 지도 가져오기
const floors = document.querySelectorAll(".map");

// 층 버튼 가져오기
const floorButtons = document.querySelectorAll(".floor-buttons button");



// =====================================================
// ==================== 층 표시 함수 ===================
// =====================================================

function showFloor(floorNumber) {

    // 모든 층 숨기기
    floors.forEach(function(floor) {
        floor.style.display = "none";
    });

    // 선택한 층만 표시
    if (floors[floorNumber - 1]) {
        floors[floorNumber - 1].style.display = "block";
    }
}



// =====================================================
// ==================== 층 버튼 ========================
// =====================================================

if (floorButtons[0]) {
    floorButtons[0].addEventListener("click", function() {
        showFloor(1);
    });
}

if (floorButtons[1]) {
    floorButtons[1].addEventListener("click", function() {
        showFloor(2);
    });
}

if (floorButtons[2]) {
    floorButtons[2].addEventListener("click", function() {
        showFloor(3);
    });
}

if (floorButtons[3]) {
    floorButtons[3].addEventListener("click", function() {
        showFloor(4);
    });
}



// =====================================================
// ==================== 처음 화면 ======================
// =====================================================

showFloor(1);



// =====================================================
// ==================== 교실 가져오기 ==================
// =====================================================

// 1~4층의 모든 교실 가져오기
const classrooms = document.querySelectorAll(".class-room");



// =====================================================
// ==================== 교실 이름 가져오기 ==============
// =====================================================

function getClassroomName(classroom) {

    // data-room-name이 있으면 우선 사용
    if (classroom.dataset.roomName) {
        return classroom.dataset.roomName.trim();
    }

    // 교실 안에 적힌 글씨 가져오기
    const text = classroom.innerText.trim();

    if (text !== "") {
        return text.replace(/\s+/g, " ");
    }

    return "이름이 지정되지 않은 교실";
}



// =====================================================
// ==================== 교실 클릭 ======================
// =====================================================

classrooms.forEach(function(classroom) {

    classroom.addEventListener("click", function() {

        const classroomName =
            getClassroomName(classroom);

        // 해당 교실이 들어있는 층 찾기
        const floorElement =
            classroom.closest(".map");

        const floorNumber =
            Array.from(floors).indexOf(floorElement) + 1;

        alert(
            floorNumber +
            "층 " +
            classroomName +
            " 교실입니다."
        );

    });

});



// =====================================================
// ==================== 드롭다운 생성 ===================
// =====================================================

const classroomSelector =
    document.createElement("select");


// 드롭다운 기본 옵션
const defaultOption =
    document.createElement("option");

defaultOption.value = "";

defaultOption.textContent =
    "교실을 선택하세요";

defaultOption.selected = true;

classroomSelector.appendChild(defaultOption);



// =====================================================
// ==================== 층별 교실 분류 ==================
// =====================================================

// 1~4층 각각 그룹 생성
for (let floorNumber = 1; floorNumber <= 4; floorNumber++) {

    // 해당 층의 교실만 가져오기
    const floorClassrooms =
        Array.from(classrooms).filter(function(classroom) {

            const floorElement =
                classroom.closest(".map");

            const classroomFloor =
                Array.from(floors).indexOf(floorElement) + 1;

            return classroomFloor === floorNumber;
        });


    // 해당 층에 교실이 없으면 그룹을 만들지 않음
    if (floorClassrooms.length === 0) {
        continue;
    }


    // optgroup 생성
    const group =
        document.createElement("optgroup");


    // 그룹 이름
    group.label =
        "──────── " +
        floorNumber +
        "층 ────────";


    // 해당 층 교실 추가
    floorClassrooms.forEach(function(classroom) {

        const option =
            document.createElement("option");


        const classroomName =
            getClassroomName(classroom);


        // classrooms 배열에서의 실제 위치
        const classroomIndex =
            Array.from(classrooms).indexOf(classroom);


        option.value =
            classroomIndex;


        option.textContent =
            classroomName;


        group.appendChild(option);

    });


    // 드롭다운에 층 그룹 추가
    classroomSelector.appendChild(group);

}



// =====================================================
// ==================== 드롭다운 스타일 =================
// =====================================================

classroomSelector.style.display = "block";

classroomSelector.style.margin =
    "15px 0 15px auto";

classroomSelector.style.padding =
    "10px 15px";

classroomSelector.style.fontSize =
    "16px";

classroomSelector.style.border =
    "1px solid #555";

classroomSelector.style.borderRadius =
    "5px";

classroomSelector.style.backgroundColor =
    "white";

classroomSelector.style.cursor =
    "pointer";

classroomSelector.style.minWidth =
    "240px";



// =====================================================
// ==================== 드롭다운 위치 ===================
// =====================================================

const floorButtonsContainer =
    document.querySelector(".floor-buttons");

if (floorButtonsContainer) {

    floorButtonsContainer.appendChild(
        classroomSelector
    );

}



// =====================================================
// ==================== 드롭다운 선택 ==================
// =====================================================

classroomSelector.addEventListener(
    "change",
    function() {

        // 기본 선택 상태
        if (this.value === "") {
            return;
        }


        // 선택된 교실 번호
        const classroomIndex =
            Number(this.value);


        // 실제 교실
        const selectedClassroom =
            classrooms[classroomIndex];


        if (!selectedClassroom) {
            return;
        }


        // 해당 교실이 있는 층
        const floorElement =
            selectedClassroom.closest(".map");


        const floorNumber =
            Array.from(floors).indexOf(
                floorElement
            ) + 1;


        // 해당 층으로 이동
        showFloor(floorNumber);


        // 교실 이름
        const classroomName =
            getClassroomName(
                selectedClassroom
            );


        


        // =================================================
        // 선택한 교실 강조
        // =================================================

        selectedClassroom.style.outline =
            "4px solid red";


        selectedClassroom.style.outlineOffset =
            "-2px";


        // 3초 후 제거
        setTimeout(function() {

            selectedClassroom.style.outline = "";

            selectedClassroom.style.outlineOffset = "";

        }, 3000);

    }
);



// =====================================================
// ==================== 시설 클릭 기능 ==================
// =====================================================

const facilityNames = {

    "bio-education-room": "환경교육부",

    "teacher-document-office": "교무자료실",

    "printing-room": "인쇄실",

    "overnight-room": "숙직실",

    "administration-office": "행정실",

    "library": "도서관",

    "left-stair": "좌측계단",

    "central-stair": "중앙계단",

    "right-stair": "우측계단",

    "lobby": "로비",

    "weeclass": "위클래스",

    "bigdata-room": "빅데이터 교실",

    "counseling-room": "진로진학 상담실",

    "hospital": "보건실",

    "toilet": "화장실",

    "career-center": "진로상담실",

    "education-center": "진학진로 교육실",

    "education-support": "교육지원센터",

    "music-room": "음악실",

    "chairman-office": "이사장실",

    "substation-room": "변전실",

    "right-toilet": "우측 화장실",

    "conference-room": "컨퍼런스룸",

    "robot-room": "로봇중점교실",

    "principal-office": "교장실",

    "cafe": "카페 이랑",

};



// =====================================================
// ==================== 시설 클릭 이벤트 ================
// =====================================================

Object.keys(facilityNames).forEach(function(className) {

    // 같은 클래스가 여러 개 있을 수도 있으므로 전부 가져오기
    const facilities =
        document.querySelectorAll("." + className);


    facilities.forEach(function(facility) {

        facility.addEventListener(
            "click",
            function() {

                const facilityName =
                    facilityNames[className];


                // 시설이 있는 층
                const floorElement =
                    facility.closest(".map");


                const floorNumber =
                    Array.from(floors).indexOf(
                        floorElement
                    ) + 1;


                alert(
                    floorNumber +
                    "층 " +
                    facilityName +
                    "입니다."
                );

            }
        );

    });

});



// =====================================================
// ==================== 끝 ==============================
// =====================================================