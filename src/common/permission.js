
export const haveTodoPermission = (loginUserId) => {
    switch (loginUserId) {
        case 'director1':
        case 'director2':
        case 'director3':
        case 'manager':
        case 'admin':
            return true;
        default:
            return false;
    }
}

export const haveViewPermission = (loginUserId, todoUserId, flowId) => {
    let permission = false;

    switch (flowId) {
        case '12':
            if (loginUserId === 'director1') permission = true;
            break;
        case '22':
            if (loginUserId === 'director2') permission = true;
            break;
        case '32':
            if (loginUserId === 'director3') permission = true;
            break;
        case '13':
        case '23':
        case '33':
            if (loginUserId === 'manager') permission = true;
            break;
    }

    if (loginUserId === todoUserId || loginUserId === 'admin') {
        permission = true;
    }

    return permission;
}

export const getActionButtonName = (loginUserId, todoUserId, flowId) => {
    let result = '表單處理'
    if (loginUserId === todoUserId || loginUserId === 'admin') {
        if (loginUserId === 'manager' && ['13', '23', '33', '43'].includes(flowId)) {
            result = '表單處理'
        } else {
            result = '檢視'
        }
    }
    return result
}

export const haveExecutionPermission = (loginUserId, flowId) => {
    let permission = false;

    switch (flowId) {
        case '12':
            if (loginUserId === 'director1') permission = true;
            break;
        case '22':
            if (loginUserId === 'director2') permission = true;
            break;
        case '32':
            if (loginUserId === 'director3') permission = true;
            break;
        case '13':
        case '23':
        case '33':
            if (loginUserId === 'manager') permission = true;
            break;
    }

    return permission;
}