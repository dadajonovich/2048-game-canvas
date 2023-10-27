var b=Object.defineProperty;var x=(u,o,t)=>o in u?b(u,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):u[o]=t;var r=(u,o,t)=>(x(u,typeof o!="symbol"?o+"":o,t),t);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&i(m)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const a=class a{static setCanvasSize(o,t,i=500){const e=o/t;o>=t?(a.board.width=Math.min(document.documentElement.clientWidth,i),a.board.height=a.board.width/e):(a.board.height=Math.min(document.documentElement.clientWidth,i),a.board.width=a.board.height*e)}get ctx(){return a.ctx}constructor(){if(!a.ctx){if(a.board=document.getElementById("board"),!a.board)throw new Error("Board missing!");a.ctx=a.board.getContext("2d")}}draw(){throw new Error("The draw method is not implemented")}drawRoundedRect(o,t,i){i=Math.max(i,0);const{x:e,y:s}=o,{x:m,y:g}=t,l=e+m,f=s+g;this.ctx.beginPath(),this.ctx.moveTo(e,s+i),this.ctx.arcTo(e,f,e+i,f,i),this.ctx.arcTo(l,f,l,f-i,i),this.ctx.arcTo(l,s,l-i,s,i),this.ctx.arcTo(e,s,e,s+i,i),this.ctx.fill()}};r(a,"board"),r(a,"ctx");let d=a;class c{constructor(o,t){r(this,"x");r(this,"y");this.x=o,this.y=t}get length(){return Math.sqrt(this.x**2+this.y**2)}}const v=class v extends d{constructor(t=0){super();r(this,"position",new c(0,0));r(this,"animatedPosition");r(this,"isAnimated",!1);r(this,"fixed",!1);r(this,"size",0);r(this,"value",0);r(this,"speed",.15);this.value=t}setPosition(t){this.position=t,this.animatedPosition=t}setSize(t){this.size=t}setValue(t){this.value=t}setFixed(t){this.fixed=t}unfix(){this.fixed=!1}mergeWith(t,i=!1){let e=0;if(this===t)return e;if(this.value===0&&t.value!==0&&(this.setValue(t.value),t.setValue(0),i||(this.animatedPosition=t.position),e=0),t.value===this.value){const s=t.value+this.value;this.setValue(s),t.setValue(0),this.fixed=!0,i||(this.animatedPosition=t.position),e=s}return e}draw(){if(this.value===0)return;const t=this.animatedPosition,i=new c(this.size,this.size),e=10;this.ctx.lineWidth=1,this.ctx.fillStyle=v.colors[this.value===0?0:Math.round(Math.log2(this.value))],this.drawRoundedRect(t,i,e),this.ctx.fillStyle="black",this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.font=`${.4*this.size}px 'LomoWebPixel LT Std 4'`,this.ctx.fillText(this.value,t.x+this.size/2,t.y+this.size/2)}animatedMove(){const t=new c(this.position.x-this.animatedPosition.x,this.position.y-this.animatedPosition.y);if(t.length<1||this.value===0){this.isAnimated=!1,this.animatedPosition=this.position;return}this.isAnimated=!0,this.animatedPosition=new c(this.animatedPosition.x+t.x*this.speed,this.animatedPosition.y+t.y*this.speed)}};r(v,"colors",["transparent","#ece2d7","#ebdec5","#f7b275","#fd9a5f","#c86948","#ea6133","#e6c361","#ddb954","#f1c34a","#f0bf38","#f0bc28"]);let p=v;class n{static rotate90Counterсlockwise(o){return o[0].map((t,i)=>o.map(e=>e[i]))}static flipVertically(o){return o.map(t=>t.toReversed())}static forEach(o,t){for(let i=0;i<o.length;i++)for(let e=0;e<o[i].length;e++){const s=o[i][e];t(s,i,e)}}static createArray(o,t){return new Array(o).fill(void 0).map((i,e)=>t(e))}static createMatrix(o,t){return n.createArray(o.y,i=>n.createArray(o.x,e=>t(i,e)))}static saveOnLocalStorage(o,t){localStorage.setItem(o,JSON.stringify(t))}}const h={up:Symbol("up"),right:Symbol("right"),down:Symbol("down"),left:Symbol("left")};class E extends d{constructor(){super();r(this,"rows",[]);r(this,"gap");r(this,"shouldAddCell",!1);r(this,"isAnimated",!1);r(this,"gridSize");r(this,"scoreElement");r(this,"score",0);r(this,"heightElement");r(this,"widthElement");r(this,"sizeSubmit");r(this,"isTesting",!1);r(this,"startPosition");r(this,"endPosition");r(this,"isGameOver",!1);if(document.documentElement.style.touchAction="none",document.documentElement.style.userSelect="none",document.documentElement.setAttribute("ondragstart","return false;"),this.heightElement=document.getElementById("height"),this.widthElement=document.getElementById("width"),this.sizeSubmit=document.getElementById("sumbit"),!(this.heightElement instanceof HTMLInputElement)||!(this.widthElement instanceof HTMLInputElement)||!(this.sizeSubmit instanceof HTMLButtonElement))throw new Error("Inputs element missing!");if(this.updateGridSize(),this.scoreElement=document.querySelector(".counter__score"),this.scoreElement)this.scoreElement.textContent=0;else throw new Error("Score missing!");this.loadFromLocalStorage(),window.requestAnimationFrame(this.tick.bind(this)),this.sizeSubmit.addEventListener("click",t=>{t.preventDefault(),this.updateGridSize(),this.restart()}),window.addEventListener("resize",this.resizeCanvasHandler.bind(this)),document.addEventListener("keydown",this.keyDownHandler.bind(this)),document.body.addEventListener("pointerdown",this.mouseDownHandler.bind(this)),document.body.addEventListener("pointerup",this.mouseUpHandler.bind(this)),this.resizeCanvasHandler()}draw(){this.ctx.clearRect(0,0,d.board.width,d.board.height),n.forEach(this.rows,t=>{t.draw()})}resizeCanvasHandler(){d.setCanvasSize(this.gridSize.x,this.gridSize.y),this.gap=Math.min(d.board.width*.05,d.board.height*.05),n.forEach(this.rows,(t,i,e)=>{const s=(Math.min(d.board.width,d.board.height)-this.gap)/Math.min(this.gridSize.x,this.gridSize.y);t.setPosition(new c(e*s+this.gap,i*s+this.gap)),t.setSize(s-this.gap)}),this.draw()}getGroups(t){switch(t){case h.up:return n.rotate90Counterсlockwise(this.rows);case h.left:return this.rows;case h.down:return n.flipVertically(n.rotate90Counterсlockwise(this.rows));default:return n.flipVertically(this.rows)}}keyDownHandler(t){switch(t.key){case"ArrowUp":this.move(h.up);break;case"ArrowLeft":this.move(h.left);break;case"ArrowDown":this.move(h.down);break;case"ArrowRight":this.move(h.right);break}}mouseUpHandler(t){this.endPosition=new c(t.clientX,t.clientY);const i=this.calcMouseMove();i&&this.move(i)}mouseDownHandler(t){this.startPosition=new c(t.clientX,t.clientY)}calcMouseMove(){let t;const i=new c(Math.abs(this.startPosition.x-this.endPosition.x),Math.abs(this.startPosition.y-this.endPosition.y));return i.length<1?null:(i.x>i.y?t=this.startPosition.x>this.endPosition.x?h.left:h.right:t=this.startPosition.y>this.endPosition.y?h.up:h.down,t)}move(t){if(this.isAnimated)return!1;const i=this.getGroups(t);let e=!1;return n.forEach(i,(s,m,g)=>{if(g!==0&&s.value!==0)for(let l=g;l>=0;l--){const f=i[m][l];if(l===0){f.mergeWith(s,this.isTesting);break}const w=i[m][l-1];if(w.value===0){e=!0;continue}if(w.value!==s.value||w.fixed){f.mergeWith(s,this.isTesting);break}const y=w.mergeWith(s,this.isTesting);this.isTesting||(this.score+=y,y===2048&&(this.isGameOver=!0)),e=!0;break}}),n.forEach(this.rows,s=>s.unfix()),!this.isTesting&&e&&(this.shouldAddCell=!0),e}getAnyEmptyCell(){const t=[];if(n.forEach(this.rows,e=>{e.value===0&&t.push(e)}),t.length===0)return;const i=Math.floor(Math.random()*t.length);return t[i]}tick(){this.update(),this.draw(),window.requestAnimationFrame(this.tick.bind(this))}update(){if(this.scoreElement.textContent=this.score,this.isAnimated=!1,n.forEach(this.rows,t=>{t.animatedMove(),t.isAnimated&&(this.isAnimated=!0)}),this.shouldAddCell&&!this.isAnimated){if(this.shouldAddCell=!1,this.isGameOver){alert("Уровень пройден"),this.restart();return}this.getAnyEmptyCell().setValue(Math.random()<.1?4:2);const t=this.getValues();n.saveOnLocalStorage("values",t),n.saveOnLocalStorage("score",this.score),this.checkGameOver()}}restart(){localStorage.clear(),this.score=0,this.rows=n.createMatrix(this.gridSize,()=>new p);for(let t=0;t<2;t++)this.getAnyEmptyCell().setValue(2);this.isGameOver=!1,this.resizeCanvasHandler()}loadFromLocalStorage(){const t=localStorage.getItem("values");if(t){this.rows=n.createMatrix(this.gridSize,()=>new p);const i=JSON.parse(t);this.score=Number(localStorage.getItem("score")),this.setValues(i)}else this.restart()}updateGridSize(){this.gridSize=new c(Math.max(2,Math.min(Number(this.widthElement.value),10)),Math.max(2,Math.min(Number(this.heightElement.value),10)))}canMove(t){this.isTesting=!0;const i=this.getValues(),e=this.move(t);return this.setValues(i),this.isTesting=!1,e}getValues(){return this.rows.map(t=>t.map(i=>i.value))}setValues(t){n.forEach(this.rows,(i,e,s)=>{i.setValue(t[e][s])}),this.isTesting||this.checkGameOver()}checkGameOver(){Object.values(h).find(t=>this.canMove(t))||setTimeout(()=>{alert("Нельзя сделать ход"),this.restart()},500)}}document.addEventListener("DOMContentLoaded",()=>new E);
