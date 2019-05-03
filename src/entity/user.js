export const convertUserEntity = function(entity) {
    console.log('convert')
    return {
        uid: entity.uid,
        name: entity.name,
        content: entity.content,
        phoneNumber: entity.phone_number,
        idCardNumber: entity.id_card_number
    }
}

export const convertUserObject = function(obj) {
    console.log('convert')
    return {
        uid: obj.uid,
        name: obj.name,
        content: obj.content,
        phone_number: obj.phoneNumber,
        id_card_number: obj.idCardNumber
    }
}

export const convertUserEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertUserEntity(entities[i]))
    }
    console.log(result)
    return result;
}