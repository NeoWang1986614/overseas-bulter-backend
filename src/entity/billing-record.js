export const convertBillingRecordEntity = function(entity) {
    console.log('convert billing record entity')
    return {
        uid: entity.uid,
        orderId: entity.order_id,
        income: convertFeeEntities(JSON.parse(entity.income)),
        outgoings: convertFeeEntities(JSON.parse(entity.outgoings)),
        balance: entity.balance,
        comment: entity.comment,
        timeRange: convertTimeRangeEntity(JSON.parse(entity.time_range)),
        accountingDate: entity.accounting_date,
        updateTime: entity.update_time,
        createTime: entity.create_time,
    }
}

/* fee item */
export const convertFeeItemEntity = function(entity) {
    console.log('convert billing record entity')
    return {
        title: entity.title,
        amount: entity.amount,
    }
}

export const convertFeeEntities = function(entities) {
    console.log('convert Fee entities')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertFeeItemEntity(entities[i]))
    }
    console.log(result)
    return result;
}

/* time rang*/
export const convertTimeRangeEntity = function(entity) {
    console.log('convert billing record entity')
    return {
        from: entity.from,
        to: entity.to,
    }
}


export const convertBillingRecordObject = function(obj) {
    console.log('convert Billing Record object')
    return {
        order_id: obj.orderId,
        income: obj.income,
        outgoings: obj.outgoings,
        balance: obj.balance,
        comment: obj.comment,
        time_range: obj.timeRange,
        accounting_date: obj.accountingDate
    }
}

export const convertBillingRecordEntities = function(entities) {
    // console.log('convert BillingRecord entities')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertBillingRecordEntity(entities[i]))
    }
    console.log(result)
    return result;
}