// Schrijf hier je code
function onMouseDown (count, args){
    return count + 1;
}
function onMouseDown2 (state, args){
 return {count: state.count + 1};
}

function counter3(){

    function onMouseDown(state,args){
        return {count:state.count + 1};
    }

    return {controller: {onMouseDown}};
}

function counter4() {

    function onMouseDown(state, args) {
        let result = {...state};
        result.count++;
        return result;
    }

    function onKeyDown(state, args) {
        let result = {...state};
        result.count = 0;
        return result;
    }

    return {controller: {onMouseDown, onKeyDown}};
}

function counter5() {

    function onMouseDown(state, args) {
        if (args.shift && state.count > 0)
            return {count: state.count -1};
        else if (args.shift && state.count === 0){
            return {count: state.count = 0};
        }

        else {
            return {count: state.count +1};

        }
    }

    function onKeyDown(state, args) {
     if (args.key === "ArrowDown") {
         if (state.count > 0)
             return {count: state.count-1};
         return {count: state.count = 0};
       }
       else if (args.key === "ArrowUp") {
            return {count: state.count +1};
        }
       else if (args.key === "0") {
           return {count: 0};
       }
       else{
           return {count: state.count}
     }
    }
    return {controller: {onMouseDown, onKeyDown}};
}

function counter6(){

    function increment(state){
        return {count: state.count +1}
    }
    function decrement(state) {
        if (state.count > 0)
            return {count: state.count -1};
        return {count: 0}
    }
    function reset(state) {
        return {count: 0}
    }

    function onMouseDown(state, args) {
        if (args.shift) {
            if (state.count > 0)
             return {count: state.count -1};
           return {count: 0}
        }
         else {
             return {count: state.count +1}
        }
    }

    function onKeyDown(state, args) {
        if (args.key === "ArrowDown") {
           return decrement(state);
        }
        else if (args.key === "ArrowUp" || args.key === " ") {
            return increment(state)
        }
        else if (args.key === "0") {
            return reset(state);
        }
        else{
            return {count: state.count}
        }
        }
    const controller = { onMouseDown, onKeyDown };
    const model = { increment, decrement, reset };
    return {controller, model}
}
function counter7(){

    function add(state, amount){

        if (state.count + amount < 0) {
            return {count: 0};
        }
        else {
            return {count: state.count + amount}
        }
    }
    function reset(state) {
        return {count: 0}
    }

    function onMouseDown(state, args) {

       if (args.ctrl){
           if (args.shift){
            return   add(state, -5)
           }
            return   add(state, 5)
       }
       if (args.shift){
           if (state.count > 0) {
           return add(state, -1)
               }
           return reset(state)
       }

        else if (args.ctrl){
            return add(state, 5)
        }
        else {
            return {count: state.count +1};

        }
    }
    function onKeyDown (state, args){
        if (args.key === "0"){
            return reset(state)
        }
        else if (args.key === " " || args.key==="ArrowUp"){
            if (args.ctrl){
                return add(state, 5)
            }
            return add(state, 1)
        }
        else if (args.key==="ArrowDown"){
            if (args.ctrl){
                return add(state, -5)
            }
            return add(state, -1)
        }
        else {
            return {count: state.count}
        }
    }

    const controller = {onMouseDown, onKeyDown}
    const model = {add, reset};
    return {model, controller}
}
function chronometer(state, dt) {
    function timePassed(state, dt) {
    return {elapsedTime: state.elapsedTime + dt}
    }
    function onTimerTick(state, dt) {
        return timePassed(state,dt);
    }
    const model = {timePassed};
    const controller = {onTimerTick};
    return {model, controller};
}
function chronometer2(state,args,dt,active){
    function timePassed(state, dt, active) {
        if (state.active){
            return {elapsedTime: state.elapsedTime + dt,active: state.active}
            }
        return {elapsedTime: state.elapsedTime + 0, active: state.active};
    }
    function toggle(state, active) {
        return {elapsedTime: state.elapsedTime, active: !state.active}
    }
    function reset(state, active) {
        return {elapsedTime:  0, active: state.active}
    }
    function onTimerTick(state,dt,active) {
        return timePassed(state,dt, active);
    }
    function onKeyDown(state,args,active){
        if (args.key=== " "){
            return toggle(state, active)
        }
        else if (args.key=== "0"){
            return reset(state,active)
        }
        return {elapsedTime: state.elapsedTime, active: state.active}
    }


    const controller = {onTimerTick, onKeyDown}
    const model = {timePassed, toggle, reset}
    return {model,  controller}
}

function circle() {
    function render(state) {
        return [{type: "circle", center: {x: 100, y: 100}, radius: 10, color: "red"}]
    }

    const view = {render};
    return {view};
}
function circle2() {

    function moveTo(state, position) {
        return {position: position};
    }
    function render(state) {
        return [{type: "circle", center: state.position, radius: 10, color: "red"}]
    }
    function onMouseDown(state, args) {
        return moveTo(state, args.position);
    }

    const controller = {onMouseDown};
    const model = {moveTo};
    const view= {render};
    return {view, controller, model};
}
function circle3() {


    function moveTo(state, position) {
        return {position: position};
    }
    function render(state) {
        return [{type: "circle", center: state.position, radius: 10, color: "red"}]
    }
    function onMouseMove(state, args) {
        return moveTo(state, args.position);
    }

    const model = {moveTo};
    const view = {render};
    const controller = {onMouseMove};
    return {view, model, controller}
}

function drawing() {

    function moveTo(state, position) {

        let dots = state.dots;
        if ( state.addMode )
        {
            dots = [ ...dots, position ];
        }

        return { ...state, position, dots };
    }
    function setAddMode(state, addMode) {
        return {position: state.position, dots: state.dots ,addMode: addMode};
    }
    function onMouseMove(state, args) {
        return moveTo(state, args.position)
    }
    function onMouseDown(state, args) {
        return setAddMode(state, true);
    }
    function onMouseUp(state,args) {
        return setAddMode(state, false);
    }
    function render(state) {
        const dotCircles = state.dots.map( dot => {
            return {type: "circle", center: dot, radius: 2, color: "green"};
        });

        if (state.addMode === true) {
            return [...dotCircles, {type: "circle", center: state.position, radius: 2, color: "red"}];
        }
        else if (state.addMode === false){
            return [...dotCircles, {type: "circle", center: state.position, radius: 5, color: "red"}]
        }
    }

    const model = {moveTo, setAddMode};
    const controller = {onMouseMove, onMouseDown, onMouseUp};
    const view = {render}
    return {model, controller, view};
}

function random(){



    function throwDie(rng, dieValue)
    {
        return {rng: ((4578 * rng.rng ** 2 - 976161 * rng.rng + 6156489) % 79729693), dieValue: ((4578 * rng.rng ** 2 - 976161 * rng.rng + 6156489) % 79729693)%6 +1}
    }
    function onKeyDown(rng, dieValue) {
            return throwDie(rng, dieValue)
    }
    function render(rng, dieValue) {
        return [{type: "text", position: {x: 50, y: 50}, string: (rng.dieValue.toString())}]
    }

    const model = {throwDie}
    const controller = {onKeyDown}
    const view = {render}
    return {model, controller, view}
}
function random2() {
    function nextRandom(n) {

        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693
    }
    function throwDie(rng, state) {
        return [nextRandom(rng.rng)%6 +1, {rng: ((4578 * rng.rng ** 2 - 976161 * rng.rng + 6156489) % 79729693), grade: 0}]
    }

    const model = {nextRandom, throwDie};

    return {model}
}
