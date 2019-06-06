import images from './images';
export default {
    createTiles: function () {
        let tileArray = [];

    for(let i = 0; i < images.length;i++){
        tileArray[i] = {
            image:images[i].src,
            name: images[i].title,
            id:images[i].id
        }
    }
    return tileArray;
    } 
}
