const menuButton=document.querySelector('.mobile-menu-button');
const nav=document.querySelector('.main-nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>nav.classList.toggle('open'))}

const heroDots=document.querySelectorAll('.hero-dots button');
heroDots.forEach(dot=>{dot.addEventListener('click',()=>{heroDots.forEach(item=>item.classList.remove('active'));dot.classList.add('active')})});

function escapeHtml(value){
    return String(value??'').replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[char]));
}

function renderNewProduct(product){
    const image=QVProducts.imageSrc(product.image);
    const imageHover=QVProducts.imageSrc(product.imageHover||product.image);
    const oldPrice=QVProducts.formatPrice(product.oldPrice);
    const newBadge=QVProducts.isNewByDate(product);
    return `<article class="product-card" data-product-card data-id="${product.id}">
        <div class="product-image-slider" data-product-image-slider>
            <div class="product-image-track" data-product-image-track>
                <div class="product-image-frame"><img src="${image}" alt="${escapeHtml(product.title)}"></div>
                <div class="product-image-frame"><img class="product-image-zoom" src="${imageHover}" alt="${escapeHtml(product.title)}"></div>
            </div>
            <div class="product-badges">
                ${oldPrice?'<span class="product-badge-sale">%</span>':''}
                ${newBadge?'<span class="product-badge-new">New</span>':''}
            </div>
            <div class="product-image-dots">
                <button class="active" type="button" data-product-dot="0" aria-label="Фото 1"></button>
                <button type="button" data-product-dot="1" aria-label="Фото 2"></button>
            </div>
        </div>
        <div class="product-info">
            <h3>${escapeHtml(product.title)}</h3>
            <p>${escapeHtml(product.meta)}</p>
            <div class="product-price-line">
                <strong>${QVProducts.formatPrice(product.price)}</strong>
                ${oldPrice?`<span>${oldPrice}</span>`:''}
                <b>/ ${escapeHtml(product.unit||'м²')}</b>
            </div>
            <button type="button">Купить</button>
        </div>
    </article>`;
}

function renderCollectionProduct(product){
    const image=QVProducts.imageSrc(product.image);
    const imageHover=QVProducts.imageSrc(product.imageHover||product.image);
    return `<article class="collection-product-card" data-id="${product.id}">
        <div class="collection-product-image" data-collection-image-switcher>
            <img class="collection-product-img-main active" src="${image}" alt="${escapeHtml(product.title)}">
            <img class="collection-product-img-hover" src="${imageHover}" alt="${escapeHtml(product.title)}">
            <div class="collection-product-dots">
                <button class="active" type="button" data-collection-image-dot="0" aria-label="Фото 1"></button>
                <button type="button" data-collection-image-dot="1" aria-label="Фото 2"></button>
            </div>
        </div>
        <div class="collection-product-info">
            <h3>${escapeHtml(product.title)}</h3>
            <p>${escapeHtml(product.meta)}</p>
            <div class="collection-product-price">
                <strong>${QVProducts.formatPrice(product.price)}</strong>
                <b>/ ${escapeHtml(product.unit||'м²')}</b>
            </div>
            <button type="button">Купить</button>
        </div>
    </article>`;
}

function renderProductsFromStorage(){
    if(!window.QVProducts)return;
    const products=QVProducts.getAll().filter(product=>product.isActive!==false).sort((a,b)=>(Number(a.sortOrder)||0)-(Number(b.sortOrder)||0)||Number(a.id)-Number(b.id));
    document.querySelectorAll('[data-products-render]').forEach(track=>{
        const group=track.dataset.productsRender;
        const groupProducts=products.filter(product=>product.group===group);
        if(!groupProducts.length){
            track.innerHTML='<div class="products-empty">Товары не добавлены</div>';
            return;
        }
        track.innerHTML=groupProducts.map(product=>group==='new'?renderNewProduct(product):renderCollectionProduct(product)).join('');
    });
}

function getGap(track){
    const styles=getComputedStyle(track);
    return parseFloat(styles.columnGap||styles.gap||0)||0;
}

function initPagedCarousel(options){
    const carousels=document.querySelectorAll(options.carousel);
    if(!carousels.length)return;

    carousels.forEach(carousel=>{
        const root=options.scope?carousel.closest(options.scope):document;
        const track=root?root.querySelector(options.track):null;
        const prev=root?root.querySelector(options.prev):null;
        const next=root?root.querySelector(options.next):null;
        const dots=options.dots&&root?root.querySelector(options.dots):null;
        const cardSelector=options.card;
        if(!carousel||!track||!prev||!next)return;

        let page=0;

        function getCardWidth(){
            const card=track.querySelector(cardSelector);
            return card?card.offsetWidth+getGap(track):1;
        }

        function getVisibleCount(){
            const card=track.querySelector(cardSelector);
            if(!card)return 1;
            const cardFull=card.offsetWidth+getGap(track);
            return Math.max(1,Math.floor((carousel.offsetWidth+getGap(track))/cardFull));
        }

        function getPages(){
            const total=track.querySelectorAll(cardSelector).length;
            const visible=getVisibleCount();
            return Math.max(1,Math.ceil(total/visible));
        }

        function getMaxShift(){
            return Math.max(0,track.scrollWidth-carousel.offsetWidth);
        }

        function renderDots(){
            if(!dots)return;
            const pages=getPages();
            dots.innerHTML='';
            for(let i=0;i<pages;i++){
                const button=document.createElement('button');
                button.type='button';
                if(i===page)button.classList.add('active');
                button.addEventListener('click',()=>{page=i;update()});
                dots.appendChild(button);
            }
        }

        function update(){
            const pages=getPages();
            if(page<0)page=pages-1;
            if(page>=pages)page=0;
            const shift=Math.min(page*getVisibleCount()*getCardWidth(),getMaxShift());
            track.style.transform=`translateX(-${shift}px)`;
            if(dots){Array.from(dots.children).forEach((dot,index)=>dot.classList.toggle('active',index===page))}
        }

        prev.addEventListener('click',()=>{page--;update()});
        next.addEventListener('click',()=>{page++;update()});

        let isDown=false;
        let startX=0;
        let currentX=0;
        carousel.addEventListener('pointerdown',event=>{isDown=true;startX=event.clientX;currentX=event.clientX;carousel.setPointerCapture(event.pointerId)});
        carousel.addEventListener('pointermove',event=>{if(!isDown)return;currentX=event.clientX});
        carousel.addEventListener('pointerup',()=>{if(!isDown)return;isDown=false;const diff=currentX-startX;if(Math.abs(diff)>40){if(diff<0)page++;else page--;update()}});
        window.addEventListener('resize',()=>{const pages=getPages();if(page>=pages)page=pages-1;renderDots();update()});

        renderDots();
        update();
    });
}

function initProductImageSliders(){
    document.querySelectorAll('[data-product-image-slider]').forEach(slider=>{
        const track=slider.querySelector('[data-product-image-track]');
        const imageDots=slider.querySelectorAll('[data-product-dot]');
        if(!track)return;
        let imageIndex=0;
        function updateImage(){
            track.style.transform=`translateX(-${imageIndex*slider.offsetWidth}px)`;
            imageDots.forEach((dot,index)=>dot.classList.toggle('active',index===imageIndex));
        }
        imageDots.forEach(dot=>{
            dot.addEventListener('click',event=>{
                event.stopPropagation();
                imageIndex=Number(dot.dataset.productDot);
                updateImage();
            });
        });
        let startX=0;
        let endX=0;
        slider.addEventListener('pointerdown',event=>{startX=event.clientX;endX=event.clientX});
        slider.addEventListener('pointermove',event=>{endX=event.clientX});
        slider.addEventListener('pointerup',()=>{
            const diff=endX-startX;
            if(Math.abs(diff)>25){
                imageIndex=diff<0?1:0;
                updateImage();
            }
        });
    });
}

function initCollectionImageSwitchers(){
    document.querySelectorAll('[data-collection-image-switcher]').forEach(block=>{
        const dots=block.querySelectorAll('[data-collection-image-dot]');
        const main=block.querySelector('.collection-product-img-main');
        const hover=block.querySelector('.collection-product-img-hover');
        let index=0;
        function update(){
            if(main)main.classList.toggle('active',index===0);
            if(hover)hover.classList.toggle('active',index===1);
            dots.forEach((dot,dotIndex)=>dot.classList.toggle('active',dotIndex===index));
        }
        dots.forEach(dot=>{
            dot.addEventListener('click',event=>{
                event.stopPropagation();
                index=Number(dot.dataset.collectionImageDot)||0;
                update();
            });
        });
        let startX=0;
        let endX=0;
        block.addEventListener('pointerdown',event=>{startX=event.clientX;endX=event.clientX});
        block.addEventListener('pointermove',event=>{endX=event.clientX});
        block.addEventListener('pointerup',()=>{
            const diff=endX-startX;
            if(Math.abs(diff)>25){
                index=diff<0?1:0;
                update();
            }
        });
        update();
    });
}

renderProductsFromStorage();
initProductImageSliders();
initCollectionImageSwitchers();

initPagedCarousel({
    scope:'.new-products-layout',
    carousel:'[data-new-carousel]',
    track:'[data-new-track]',
    prev:'[data-new-prev]',
    next:'[data-new-next]',
    dots:'[data-new-dots]',
    card:'.product-card'
});

initPagedCarousel({
    scope:'.pluses-section',
    carousel:'[data-pluses-carousel]',
    track:'[data-pluses-track]',
    prev:'[data-pluses-prev]',
    next:'[data-pluses-next]',
    dots:null,
    card:'.plus-card'
});

initPagedCarousel({
    scope:'.collection-products-wrap',
    carousel:'[data-collection-carousel]',
    track:'[data-collection-track]',
    prev:'[data-collection-prev]',
    next:'[data-collection-next]',
    dots:null,
    card:'.collection-product-card'
});

const comparisonTable=document.querySelector('[data-comparison-table]');
const comparisonButtons=document.querySelectorAll('[data-comparison-toggle]');
const comparisonColumns={
    'laminate':3,
    'linoleum':4,
    'porcelain':5,
    'parquet-board':6,
    'parquet':7
};
if(comparisonTable&&comparisonButtons.length){
    function setComparisonColumn(material,hidden){
        const columnIndex=comparisonColumns[material];
        const button=document.querySelector(`[data-comparison-toggle="${material}"]`);
        const col=comparisonTable.querySelector(`[data-comparison-col="${material}"]`);
        if(!columnIndex||!button)return;
        button.classList.toggle('is-hidden',hidden);
        button.setAttribute('aria-pressed',hidden?'false':'true');
        if(col)col.classList.toggle('comparison-col-hidden',hidden);
        comparisonTable.querySelectorAll(`tr > *:nth-child(${columnIndex})`).forEach(cell=>{
            cell.classList.toggle('comparison-cell-hidden',hidden);
        });
    }
    comparisonButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            const material=button.dataset.comparisonToggle;
            const hidden=!button.classList.contains('is-hidden');
            setComparisonColumn(material,hidden);
        });
    });
}

const faqItems=document.querySelectorAll('.faq-item');
faqItems.forEach(item=>{
    const button=item.querySelector('.faq-question');
    if(!button)return;
    button.addEventListener('click',()=>{
        const isOpen=item.classList.contains('open');
        item.classList.toggle('open',!isOpen);
        button.setAttribute('aria-expanded',isOpen?'false':'true');
    });
});
