var Shape = function(el) {
    this.element = document.querySelector(el) || document.querySelector('body');
}
Shape.prototype.rgb = function(r, g, b, a) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a || 1;
    return "rgb("+this.red+", "+this.green+", "+this.blue+", "+this.alpha+")";
};
Shape.prototype.rotate = function(el, angle) {
    this.angle = angle;
    return document.querySelectorAll(el).style.transform = 'rotate('+this.angle+'deg)';
};
Shape.prototype.rect = function(x, y, w, h, color, r) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.radius = r || 0;
    this.color = color;

    var myRect = document.createElement("div");
    myRect.style.borderRadius = this.radius+"px";
    myRect.style.position = "absolute";
    myRect.style.top = this.y+"px";
    myRect.style.left = this.x+"px";
    myRect.style.width = this.width+"px";
    myRect.style.height = this.height+"px";
    myRect.style.background = this.color;
    this.element.appendChild(myRect);
    return myRect;
};
Shape.prototype.square = function(x, y, side, color, r) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.radius = r || 0;
    this.color = color;
    return this.rect(this.x, this.y, this.side, this.side, this.color, this.radius);
};
Shape.prototype.ellipse = function(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = color;
    return this.rect(this.x, this.y, this.width, this.height, this.color, 100);

};
Shape.prototype.circle = function(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color;
    return this.ellipse(this.x, this.y, this.radius*2, this.radius*2, this.color);
};

Shape.prototype.text = function(message, x, y, size, color, background) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.fontSize = size || 15;
    this.color = color || "black";
    this.background = background;

    if (this.background === undefined) {
        var myText = document.createElement("p");
        myText.innerHTML = this.message;
        myText.style.position = "absolute";
        myText.style.top = this.y+"px";
        myText.style.left = this.x+"px";
        myText.style.fontSize = this.fontSize+"px";
        myText.style.color = this.color;
        this.element.appendChild(myText);
        return myText;
    } else {
        var myText = document.createElement("p");
        myText.innerHTML = this.message;
        myText.style.position = "absolute";
        myText.style.top = this.y+"px";
        myText.style.left = this.x+"px";
        myText.style.fontSize = this.fontSize;
        myText.style.color = this.color;
        myText.style.background = this.background;
        myText.style.padding = "5px";
        this.element.appendChild(myText);
        return myText;
    }
};
Shape.prototype.innerText = function(el, message, top) {
    this.textBlock = document.querySelector(el);
    this.innerMessage = message;
    this.textBlock.style.textAlign = "center";
    var myInnerText = document.createElement("p");
    myInnerText.innerHTML = this.innerMessage;
    myInnerText.style.marginTop = (top || parseFloat(this.textBlock.offsetHeight)/2.5)+"px";
    this.textBlock.appendChild(myInnerText);
};
Shape.prototype.textInput = function(x, y, w, h, r, borderColor, placeholder, value) {
    this.x = x;
    this.y = y;
    this.width = w || 150;
    this.height = h || 20;
    this.borderColor = borderColor || "black";
    this.placeholder = placeholder || "";
    this.value = value || "";
    this.radius = r || 5;
    var myTextInput = document.createElement("input");
    myTextInput.style.position = "absolute";
    myTextInput.style.top = this.y+"px";
    myTextInput.style.left = this.x+"px";
    myTextInput.style.width = this.width+"px";
    myTextInput.style.height = this.height+"px";
    myTextInput.style.borderRadius = this.radius+"px";
    myTextInput.style.border = "1px solid "+this.borderColor;
    myTextInput.style.paddingLeft = "5px";
    myTextInput.setAttribute("placeholder", this.placeholder);
    myTextInput.setAttribute("value", this.value)
    this.element.appendChild(myTextInput);
};
Shape.prototype.dropdownInput = function(x, y, label, choices) {
    this.x = x;
    this.y = y;
    this.label = label+" " || "";
    this.choices = choices || [];

    var myLabel = document.createElement("label");
    myLabel.style.position = "absolute";
    myLabel.style.top = this.y+"px";
    myLabel.style.left = this.x+"px";
    myLabel.innerHTML = this.label;
    this.element.appendChild(myLabel);
    var mySelect = document.createElement("select");
    myLabel.appendChild(mySelect);
    var myOption;
    for (var i = 0; i < this.choices.length; i++) {
        myOption = document.createElement("option");
        myOption.innerHTML = this.choices[i];
        myOption.setAttribute("value", "option"+(i+1));
        mySelect.appendChild(myOption);
    }
    return myLabel;
};
Shape.prototype.image = function(source, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w || 150;
    this.height = h || 100;
    this.source = source;

    var myImage = document.createElement("img");
    myImage.setAttribute("src", this.source);
    myImage.style.width = this.width + "px";
    myImage.style.height = this.height + "px";
    myImage.style.position = "absolute";
    myImage.style.top = this.y+"px";
    myImage.style.left = this.x+"px";
    this.element.appendChild(myImage);
    return myImage;
};
Shape.prototype.pageView = function(source, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w || 150;
    this.height = h || 100;
    this.source = source;

    var myPage = document.createElement("iframe");
    myPage.setAttribute("src", this.source);
    myPage.style.width = this.width + "px";
    myPage.style.height = this.height + "px";
    myPage.style.position = "absolute";
    myPage.style.top = this.y+"px";
    myPage.style.left = this.x+"px";
    this.element.appendChild(myPage);
    return myPage;
};
Shape.prototype.animate = function(action, frameRate) {
    this.animateFrameRate = frameRate || 1;
    this.animation = window.setInterval(action, this.animateFrameRate*1000);
};
Shape.prototype.clearAnimation = function() {
    window.clearInterval(this.animation);
};
Shape.prototype.remove = function(el) {
    el.remove();
};
