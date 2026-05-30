(function(){
    const projectName=location.pathname.split('/').filter(Boolean)[0]||'quartzvinil';
    const storageKey=projectName+'_products_localstorage_v1';

    const defaultProducts=[
        {id:1,group:'new',title:'SPC ЛАМИНАТ MODULEO LAYRED LAUREL OAK 51864',meta:'33 класс 6 мм',price:1890,oldPrice:2240,unit:'м²',image:'new-brown.png',imageHover:'new-brown.png',createdAt:new Date().toISOString(),isActive:true,sortOrder:10},
        {id:2,group:'new',title:'SPC ЛАМИНАТ MODULEO LAYRED CANTERA 46930',meta:'33 класс 6 мм',price:1790,oldPrice:2170,unit:'м²',image:'new-gray.png',imageHover:'new-gray.png',createdAt:new Date().toISOString(),isActive:true,sortOrder:20},
        {id:3,group:'new',title:'SPC ЛАМИНАТ MODULEO LAYRED MOUNTAIN OAK 56275',meta:'33 класс 6 мм',price:1850,oldPrice:2030,unit:'м²',image:'new-light.png',imageHover:'new-light.png',createdAt:new Date().toISOString(),isActive:true,sortOrder:30},
        {id:4,group:'new',title:'SPC ЛАМИНАТ MODULEO LAYRED LAUREL OAK 51864',meta:'33 класс 6 мм',price:1890,oldPrice:2240,unit:'м²',image:'new-brown.png',imageHover:'new-brown.png',createdAt:new Date().toISOString(),isActive:true,sortOrder:40},
        {id:5,group:'new',title:'SPC ЛАМИНАТ MODULEO LAYRED CANTERA 46930',meta:'33 класс 6 мм',price:1790,oldPrice:2170,unit:'м²',image:'new-gray.png',imageHover:'new-gray.png',createdAt:new Date().toISOString(),isActive:true,sortOrder:50},
        {id:6,group:'new',title:'SPC ЛАМИНАТ MODULEO LAYRED MOUNTAIN OAK 56275',meta:'33 класс 6 мм',price:1850,oldPrice:2030,unit:'м²',image:'new-light.png',imageHover:'new-light.png',createdAt:new Date().toISOString(),isActive:true,sortOrder:60},

        {id:101,group:'emotion',title:'SPC ЛАМИНАТ ROYCE EMOTION ДУБ МОКСИ EM-609',meta:'42 класс 4 мм',price:1590,oldPrice:'',unit:'м²',image:'collection-moksi.png',imageHover:'collection-moksi.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:10},
        {id:102,group:'emotion',title:'SPC ЛАМИНАТ ROYCE EMOTION ДУБ ГУСТО EM-604',meta:'42 класс 4 мм',price:1590,oldPrice:'',unit:'м²',image:'collection-gusto.png',imageHover:'collection-gusto.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:20},
        {id:103,group:'emotion',title:'SPC ЛАМИНАТ ROYCE EMOTION ДУБ СЬОРЕТИ EM-605',meta:'42 класс 4 мм',price:1590,oldPrice:'',unit:'м²',image:'collection-syoreti.png',imageHover:'collection-syoreti.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:30},
        {id:104,group:'emotion',title:'SPC ЛАМИНАТ ROYCE EMOTION ДУБ ТРАСТЕМ-603',meta:'42 класс 4 мм',price:1590,oldPrice:'',unit:'м²',image:'collection-trastem.png',imageHover:'collection-trastem.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:40},
        {id:105,group:'emotion',title:'SPC ЛАМИНАТ ROYCE EMOTION ДУБ МОКСИ EM-609',meta:'42 класс 4 мм',price:1590,oldPrice:'',unit:'м²',image:'collection-moksi.png',imageHover:'collection-moksi.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:50},
        {id:106,group:'emotion',title:'SPC ЛАМИНАТ ROYCE EMOTION ДУБ ГУСТО EM-604',meta:'42 класс 4 мм',price:1590,oldPrice:'',unit:'м²',image:'collection-gusto.png',imageHover:'collection-gusto.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:60},

        {id:201,group:'sense',title:'SPC ЛАМИНАТ ROYCE SENSE ДУБ АЙА SE-710',meta:'42 класс 4 мм',price:1620,oldPrice:'',unit:'м²',image:'collection-sense-aya.png',imageHover:'collection-sense-aya.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:10},
        {id:202,group:'sense',title:'SPC ЛАМИНАТ ROYCE SENSE ДУБ КААБА SE-705',meta:'42 класс 4 мм',price:1620,oldPrice:'',unit:'м²',image:'collection-sense-kaaba.png',imageHover:'collection-sense-kaaba.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:20},
        {id:203,group:'sense',title:'SPC ЛАМИНАТ ROYCE SENSE ДУБ СИНАЙ SE-706',meta:'42 класс 4 мм',price:1620,oldPrice:'',unit:'м²',image:'collection-sense-sinay.png',imageHover:'collection-sense-sinay.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:30},
        {id:204,group:'sense',title:'SPC ЛАМИНАТ ROYCE SENSE ДУБ ХАМПИ SE-708',meta:'42 класс 4 мм',price:1620,oldPrice:'',unit:'м²',image:'collection-sense-khampis.png',imageHover:'collection-sense-khampis.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:40},
        {id:205,group:'sense',title:'SPC ЛАМИНАТ ROYCE SENSE ДУБ АЙА SE-710',meta:'42 класс 4 мм',price:1620,oldPrice:'',unit:'м²',image:'collection-sense-aya.png',imageHover:'collection-sense-aya.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:50},
        {id:206,group:'sense',title:'SPC ЛАМИНАТ ROYCE SENSE ДУБ КААБА SE-705',meta:'42 класс 4 мм',price:1620,oldPrice:'',unit:'м²',image:'collection-sense-kaaba.png',imageHover:'collection-sense-kaaba.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:60},

        {id:301,group:'enjoy',title:'SPC ЛАМИНАТ ROYCE ENJOY ДУБ БЕРГ E301',meta:'42 класс 3.5 мм',price:1390,oldPrice:'',unit:'м²',image:'collection-enjoy-berg.png',imageHover:'collection-enjoy-berg.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:10},
        {id:302,group:'enjoy',title:'SPC ЛАМИНАТ ROYCE ENJOY ДУБ ЭШФОРД E310',meta:'42 класс 3.5 мм',price:1390,oldPrice:'',unit:'м²',image:'collection-enjoy-ashford.png',imageHover:'collection-enjoy-ashford.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:20},
        {id:303,group:'enjoy',title:'SPC ЛАМИНАТ ROYCE ENJOY ДУБ НОРДБОРГ E306',meta:'42 класс 3.5 мм',price:1390,oldPrice:'',unit:'м²',image:'collection-enjoy-nordborg.png',imageHover:'collection-enjoy-nordborg.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:30},
        {id:304,group:'enjoy',title:'SPC ЛАМИНАТ ROYCE ENJOY ДУБ БЛЭКРОК E308',meta:'42 класс 3.5 мм',price:1390,oldPrice:'',unit:'м²',image:'collection-enjoy-blackrock.png',imageHover:'collection-enjoy-blackrock.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:40},
        {id:305,group:'enjoy',title:'SPC ЛАМИНАТ ROYCE ENJOY ДУБ БЕРГ E301',meta:'42 класс 3.5 мм',price:1390,oldPrice:'',unit:'м²',image:'collection-enjoy-berg.png',imageHover:'collection-enjoy-berg.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:50},
        {id:306,group:'enjoy',title:'SPC ЛАМИНАТ ROYCE ENJOY ДУБ ЭШФОРД E310',meta:'42 класс 3.5 мм',price:1390,oldPrice:'',unit:'м²',image:'collection-enjoy-ashford.png',imageHover:'collection-enjoy-ashford.png',createdAt:'2025-01-10T10:00:00.000Z',isActive:true,sortOrder:60}
    ];

    function cloneDefaults(){return JSON.parse(JSON.stringify(defaultProducts));}

    function normalizeProduct(product){
        return {
            id:Number(product.id)||Date.now(),
            group:product.group||'new',
            title:product.title||'',
            meta:product.meta||'',
            price:product.price===''?'':Number(product.price)||0,
            oldPrice:product.oldPrice===''||product.oldPrice===null?'':Number(product.oldPrice)||'',
            unit:product.unit||'м²',
            image:product.image||'new-light.png',
            imageHover:product.imageHover||product.image||'new-light.png',
            createdAt:product.createdAt||new Date().toISOString(),
            isActive:product.isActive!==false,
            sortOrder:Number(product.sortOrder)||0
        };
    }

    function getAll(){
        const saved=localStorage.getItem(storageKey);
        if(saved===null){
            const defaults=cloneDefaults();
            localStorage.setItem(storageKey,JSON.stringify(defaults));
            return defaults;
        }
        try{
            const parsed=JSON.parse(saved);
            if(!Array.isArray(parsed))return [];
            return parsed.map(normalizeProduct);
        }catch(error){
            return [];
        }
    }

    function saveAll(products){
        localStorage.setItem(storageKey,JSON.stringify(products.map(normalizeProduct)));
    }

    function reset(){
        const defaults=cloneDefaults();
        saveAll(defaults);
        return defaults;
    }

    function getNextId(){
        const products=getAll();
        return products.length?Math.max(...products.map(product=>Number(product.id)||0))+1:1;
    }

    function formatPrice(value){
        if(value===''||value===null||typeof value==='undefined')return '';
        const number=Number(value);
        if(!number)return '';
        return number.toLocaleString('ru-RU',{maximumFractionDigits:0})+' ₽';
    }

    function imageSrc(value){
        if(!value)return 'assets/img/new-light.png';
        if(value.startsWith('data:')||value.startsWith('http://')||value.startsWith('https://')||value.startsWith('assets/'))return value;
        return 'assets/img/'+value;
    }

    function adminImageSrc(value){
        if(!value)return '../assets/img/new-light.png';
        if(value.startsWith('data:')||value.startsWith('http://')||value.startsWith('https://'))return value;
        if(value.startsWith('assets/'))return '../'+value;
        return '../assets/img/'+value;
    }

    function isNewByDate(product){
        if(!product.createdAt)return false;
        const created=new Date(product.createdAt).getTime();
        if(Number.isNaN(created))return false;
        const month=30*24*60*60*1000;
        return Date.now()-created<=month;
    }

    window.QVProducts={storageKey,defaultProducts,getAll,saveAll,reset,getNextId,formatPrice,imageSrc,adminImageSrc,isNewByDate};
})();
