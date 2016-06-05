dispatch( actionX_thunk(payload) );
doOtherStuff()

---------------------------

dispatch_doOtherStuff = ( actionX ) => {
    dispatch( actionX )
    doOtherStuff( actionX )
}

dispatchThenDoOtherStuff( actionX_Thug(payload) )


---------------------------

let dispatch = (action)=>{
    const dispatchResult = ...
    return dispatchResult
}

...

next = dispatch; // <---- monkeyPatch
dispatch = (action)=>{
    const dispatchResult = next()
    doOtherStuff (action)
    return dispatchResult;

}

dispatchThenDoOtherStuff( actionX_thunk(payload) )

---------------------------

let dispatch = (action)=>{
    const dispatchResult = ...
    doStuff1(action)
    return dispatchResult
}

...

let next = dispatch;
dispatch = (action)=>{
    const dispatchResult = next()
    doOtherStuff2 (action)
    return dispatchResult;
}


dispatch( actionX_thunk(payload) ) // same as dispatch_doOtherStuff


--------------------------- multiple monkey patch in a series


let dispatch = (action)=>{
    const dispatchResult = ...
    doStuff1(action) // [1]
    return dispatchResult
}

...

let next = dispatch;
dispatch = (action)=>{  //[2]
    const dispatchResult = next() // [1] exec
    doOtherStuff2 (action)
    return dispatchResult;
}

next = dispatch;
dispatch = (action)=>{ // [3]
    const dispatchResult = next() // [2] exec
    doOtherStuff3 (action)
    return dispatchResult;
}

dispatch(actionX_thunk(payload));   [3], [2], [1]exec,

----------------------------- monkey patch hidden

let dispatch = (action)=>{
    const dispatchResult = ...
    doStuff1(action) // [1]
    return dispatchResult
}

...

const patch_dispatchThenDoStuff2 = () {
    const next = dispatch;
    dispatch = (action)=>{  //[2]
        const dispatchResult = next() // [1] exec
        doOtherStuff2 (action)
        return dispatchResult;
    }
}

const patch_dispatchThenDoStuff3 = () {
    const next = dispatch;
    dispatch = (action)=>{ // [3]
        const dispatchResult = next() // [2] exec
        doOtherStuff3 (action)
        return dispatchResult;
    }
}

patch_dispatchThenDoStuff2();
patch_dispatchThenDoStuff3();


dispatch(actionX_thunk(payload));   [3], [2], [1]exec,


--------------------------- Better monkey patch


let dispatch = (action)=>{
    const dispatchResult = ...
    doStuff1(action) // [1]
    return dispatchResult
}

...

const thunk_patch_dispatchThenDoStuff2 = (_dispatch) {
    const next = _dispatch;
    _dispatch = (action)=>{  //[2]
        const dispatchResult = next() // [1] exec
        doOtherStuff2 (action)
        return dispatchResult;
    }
    return _dispatch;
}

const thunk_patch_dispatchThenDoStuff3 = (_dispatch) {
    const next = _dispatch;
    _dispatch = (action)=>{ // [3]
        const dispatchResult = next() // [2] exec
        doOtherStuff3 (action)
        return dispatchResult;
    }
    return _dispatch;
}

// patch_dispatchThenDoStuff2(dispatch);
// patch_dispatchThenDoStuff3(dispatch);

dispatch = _.flow([patch_dispatchThenDoStuff2, patch_dispatchThenDoStuff3])(dipatch)

dispatch(actionX_thunk(payload));   [3], [2], [1]exec,



