//task 1
class Circle{
    #diameter;
    constructor(radius){
        this._radius = radius;
    }
    get radius(){
        return `Radius = ${this._radius}`
    }
    set radius(value){
        if (value<0){
            throw new Error ("Radius can not be negative")
        }
        this._radius = value
    }
    get diameter(){
        return `Diameter = ${this._radius * 2}`
    }
    area(){
        console.log(`Area of a circle = ${(3.1415 * this._radius).toFixed(2)}`)
    }
    circumference(){
                console.log(`Circumference = ${(3.1415 * this._radius * 2).toFixed(2)}`)
    }
}

const circle = new Circle(10)
console.log(circle.radius)
circle.radius = 20
console.log(circle.radius)
console.log(circle.diameter)
circle.area()
circle.circumference() 

//task 2

class HtmlElement{
    constructor(tagName, isSelfClosing = false, text=''){
        this.tagName = tagName;
        this.isSelfClosing = isSelfClosing;
        this.text = text;
        this.attributes = [];
        this.styles = [];
        this.innerElements = []
    }
    setStyle(name, value){
        const existingStyle = this.styles.find(style => style.name === name)
        if (existingStyle){
            existingStyle.value = value
        }
        else{
            this.styles.push({name, value})
        }
        return this
    }
    setAttribute(name, value){
        const existingAttribute = this.attributes.find(attribute => attribute.name === name)
        if (existingAttribute){
            existingAttribute.value = value
        }
        else{
            this.attributes.push({name, value})
        }
        return this
    }
    appendInnerElem(element){
        if (element instanceof HtmlElement){
            this.innerElements.unshift(element)
        }
        return this
    }
    prependInnerElem(element){
        if (element instanceof HtmlElement){
            this.innerElements.unshift(element)
        }
        return this
    }
    getHtml(){
        let attrString= "";
        let childrenContent = this.text
        if(this.styles.length > 0){
            const stylesString = this.styles.map(style => `${style.name}: ${style.value}`).join("; ")
            attrString += ` style="${stylesString};"`
        }
        if (this.attributes.length > 0){
            attrString += " " + this.attributes.map(atrr => `${atrr.name}="${atrr.value}"`).join(" ")
        }
        if (this.isSelfClosing){
            return `<${this.tagName}${attrString}>`
        }
        for(const child of this.innerElements){
            childrenContent += child.getHtml();
        }
        return `<${this.tagName}${attrString}>${childrenContent}</${this.tagName}>`
    }
}

//for task 2
/* const wrapper = new HtmlElement("div");
wrapper.setAttribute("id", "wrapper").setStyle("display", "flex");
const block = new HtmlElement("div");
block.setStyle("padding", "10px").setStyle("background-color", "#f0f0f0");
const title = new HtmlElement("h3", false, "Привіт, це заголовок!");
block.appendInnerElem(title);
const img = new HtmlElement("img", true);
img.setAttribute("src", "image.jpg").setAttribute("alt", "Довільне фото").setStyle("width", "100px");
block.appendInnerElem(img);
const paragraph = new HtmlElement("p", false, "Це текст, який стане першим в блоці.");
block.prependInnerElem(paragraph);
console.log(wrapper.getHtml()); */

function createBlock() {
    const blockDiv = new HtmlElement("div")
        .setStyle("width", "300px")
        .setStyle("margin", "10px");
    const h3 = new HtmlElement("h3", false, "What is Lorem Ipsum?");
    const img = new HtmlElement("img", true)
        .setStyle("width", "100%")
        .setAttribute("src", "lipsum.jpg")
        .setAttribute("alt", "Lorem Ipsum");
    const loremText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
    const p = new HtmlElement("p", false, loremText)
        .setStyle("text-align", "justify");
    const link = new HtmlElement("a", false, "More...")
        .setAttribute("href", "https://www.lipsum.com/")
        .setAttribute("target", "_blank");
    p.appendInnerElem(link);
    blockDiv.appendInnerElem(h3).appendInnerElem(img).appendInnerElem(p);
    return blockDiv;
}
/* wrapper.appendInnerElem(createBlock());
wrapper.appendInnerElem(createBlock());
document.write(wrapper.getHtml()); */

//task 3

class CssClass{
    constructor(className){
        this.className = className;
        this.styles = [];
    }
    setStyle(name, value){
        const existingStyle = this.styles.find(style => style.name === name);
        if (existingStyle) {
            existingStyle.value = value;
        } else {
            this.styles.push({ name, value });
        }
        return this;
    }
    removeStyle(name){
        const styleIndex = this.styles.findIndex(style => style.name === name)
        if (styleIndex !== -1) {
            this.styles.splice(styleIndex, 1);
        }
        return this;
    }
    getCss(){
        if (this.styles.length === 0) {
            return `.${this.className} {}`;
        }
        const stylesString = this.styles.map(style => `${style.name}: ${style.value};`).join("\n");
        return `.${this.className} {\n${stylesString}\n}`;
    }
}
const buttonStyle = new CssClass("main-btn");
buttonStyle.setStyle("background-color", "#007bff")
           .setStyle("color", "#ffffff")
           .setStyle("padding", "10px 20px")
           .setStyle("border", "none")
           .setStyle("border-radius", "5px");

console.log(buttonStyle.getCss());
buttonStyle.removeStyle("border-radius");
console.log(buttonStyle.getCss());


//task 4

function createLoremBlock() {
    const blockDiv = new HtmlElement("div").setAttribute("class", "block");
    const h3 = new HtmlElement("h3", false, "What is Lorem Ipsum?");
    
    const img = new HtmlElement("img", true)
        .setAttribute("class", "img")
        .setAttribute("src", "lipsum.jpg")
        .setAttribute("alt", "Lorem Ipsum");
        
    const loremText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
    
    const p = new HtmlElement("p").setAttribute("class", "text");
    p.text = loremText;
    
    const link = new HtmlElement("a", false, "More...")
        .setAttribute("href", "https://www.lipsum.com/")
        .setAttribute("target", "_blank");
        
    p.appendInnerElem(link);
    
    blockDiv.appendInnerElem(h3).appendInnerElem(img).appendInnerElem(p);
    return blockDiv;
}

class HtmlBlock{
    constructor(rootElement){
        this.СssClasses = [];
        if (rootElement instanceof HtmlElement){
            this.rootElement = rootElement;
        }else{
            this.rootElement = null;
        }
    }
    addCssClass(cssClassObject){
        if (cssClassObject instanceof CssClass){
            const exists = this.СssClasses.some(c => c.className === cssClassObject.className);
            if (!exists){
                this.СssClasses.push(cssClassObject);
            }
        }
        return this;
    }
    getCode() {
        let styleCode = "";
        if (this.СssClasses.length > 0) {
            const allStyles = this.СssClasses.map(c => c.getCss()).join("\n");
            styleCode = `<style>\n${allStyles}\n</style>\n`;
        }
        const htmlCode = this.rootElement ? this.rootElement.getHtml() : "";
        return `${styleCode}${htmlCode}`;
    }
}

const wrapClass = new CssClass("wrap").setStyle("display", "flex");
const blockClass = new CssClass("block").setStyle("width", "300px").setStyle("margin", "10px");
const imgClass = new CssClass("img").setStyle("width", "100%");
const textClass = new CssClass("text").setStyle("text-align", "justify");

const wrapper = new HtmlElement("div").setAttribute("id", "wrapper").setAttribute("class", "wrap");
wrapper.appendInnerElem(createLoremBlock());
wrapper.appendInnerElem(createLoremBlock());

const htmlBlock = new HtmlBlock(wrapper);
htmlBlock.addCssClass(wrapClass)
         .addCssClass(blockClass)
         .addCssClass(imgClass)
         .addCssClass(textClass);

document.write(htmlBlock.getCode());