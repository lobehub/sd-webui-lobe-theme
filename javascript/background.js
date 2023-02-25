class InjectBackground{
    constructor(){
        this.image;
    }
    async init(selector="div[class^=mx-auto][class*=container]"){
        this.element = undefined
        while(true){
            this.element = gradioApp().querySelector(selector)
            if (this.element){
                break
            }
            await delay(500)
        }
        this.element.setAttribute("style", "background-image: url(file=static/background.png); background-size: contain; background-attachment: fixed; background-position: center; background-repeat: no-repeat")
    }
    removeStyle(){
        this.element.removeStyle()
    }
    removeImage(){
        this.element.style['background-image'] = ""
    }
    updateImage(path){
        this.element.style['background-image'] = `url(file=${path})`
    }
    //destroy not necessarily needed at this time, it's to keep the api similar
    destroy(){
        this.removeStyle()
    }
    async refreshImage(file_name){
        setTimeout(location.reload(), 200)
        //this.updateImage("static/background.png")
        console.log(file_name)
        return file_name
    }
}
/*
element.style {
    background-image: url(file=logo.png);
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}
*/

let injectBackground = new InjectBackground()
async function registerInjectHandler(){
    await injectBackground.init()
    while(true){
        if(injectBackground.element){
            break
        }
        await delay(500)
    }
    qkcssImagemap.injectBackground = injectBackground
}

function delay(ms){return new Promise(resolve => setTimeout(resolve, ms))}
document.addEventListener("DOMContentLoaded", async function (){await registerInjectHandler()})