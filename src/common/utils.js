export const startDeptFlowMap = {
    'jason.wang': '12', 'jessica.lee': '22', 'kevin.lin': '32', 'admin': '12',
    'director1': '13', 'director2': '23', 'director3': '33', 'manager': '43'
};

export const getFormTypeName = (id) => {
    switch (id) {
        case '1':
            return '帳號申請';
        case '2':
            return '資料服務單';
        case '3':
            return '變更單';
        default:
            return '不明';
    }
};

export const getStatusName = (value) => {
    switch (value) {
        case '1':
            return '審核中';
        case '2':
            return '審核完成';
        case '3':
            return '退回';
        default:
            return '不明';
    }
};


export const getFlowName = (value) => {
    switch (value) {
        case '12':
            return '資訊部-主管';
        case '22':
            return '人事部-主管';
        case '32':
            return '業務部-主管';
        case '13':
        case '23':
        case '33':
        case '43':
            return '總經理';
        case '14':
        case '24':
        case '34':
        case '44':
            return '';
        default:
            return '不明';
    }
};

export const goNextStatus = (value) => {
    if (value.endsWith("4")) {
        return '2'
    } else if (value === "r") {
        return '3'
    } else {
        return '1'
    }
}

export const goNextFlow = (value) => {
    // let result = (value * 1 + 1) + ""
    let result = String(parseInt(value) + 1)
    console.log('goFlowNext: ' + result)
    return result
}

export const getStatusColorClass = (status) => {
    switch (status) {
        case '1':
            return 'text-success';
        case '2':
            return 'text-secondary';
        case '3':
            return 'text-danger';
        default:
            return 'text-danger';
    }
};

export const getApplyDate = () => {
    const today = new Date();
    const rocYear = today.getFullYear() - 1911; // 民國年
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份從0開始
    const day = String(today.getDate()).padStart(2, '0');
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    const second = String(today.getSeconds()).padStart(2, '0');
    return `${rocYear}/${month}/${day} ${hour}:${minute}:${second}`;
};
