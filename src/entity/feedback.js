export const convertFeedbackEntity = function(entity) {
    console.log('convert')
    return {
        id: entity.id,
        orderId: entity.order_id,
        authorId: entity.author_id,
        content: entity.content,
        isRead: entity.is_read,
        createTime: entity.create_time
    }
}

export const convertFeedbackObject = function(obj) {
    console.log('convert')
    return {
        order_id: obj.orderId,
        author_id: obj.authorId,
        content: obj.content
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