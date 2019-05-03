export const convertFeedbackEntity = function(entity) {
    console.log('convert')
    return {
        id: entity.id,
        orderId: entity.order_id,
        authorId: entity.author_id,
        content: entity.content,
        isRead: entity.is_read,
        income: entity.income,
        outgoings: entity.outgoings,
        accountingDate: entity.accounting_date,
        updateTime: entity.update_time,
        createTime: entity.create_time
    }
}

export const convertFeedbackObject = function(obj) {
    console.log('convert')
    return {
        order_id: obj.orderId,
        author_id: obj.authorId,
        content: obj.content,
        isRead: obj.isRead,
        income: obj.income,
        outgoings: obj.outgoings,
        accounting_date: obj.accountingDate,
    }
}

export const convertFeedbackEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertFeedbackEntity(entities[i]))
    }
    console.log(result)
    return result;
}