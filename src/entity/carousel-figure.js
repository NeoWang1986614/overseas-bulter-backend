export const convertCarouselFigureEntity = function(entity) {
    console.log('convert carousel figure entity')
    return {
        uid: entity.uid,
        imageUrl: entity.image_url,
        location: entity.location,
        desc: entity.desc
    }
}

export const convertCarouselFigureObject = function(obj) {
    console.log('convert carousel figure object')
    return {
        uid: obj.uid,
        image_url: obj.imageUrl,
        location: obj.location,
        desc: obj.desc
    }
}

export const convertCarouselFigureEntities = function(entities) {
    console.log('convert')
    var result = [];
    for (let i = 0; i < entities.length; i++) {
        result.push(convertCarouselFigureEntity(entities[i]))
    }
    console.log(result)
    return result;
}