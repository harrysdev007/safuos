// Keep every app readable at full font size, using measured pages instead of scrolling.
function setupPages(w){
  const content=w.querySelector('.window-content');content.querySelectorAll('h2 br').forEach(br=>br.replaceWith(' '));
  content.querySelectorAll('details').forEach(detail=>{const article=document.createElement('article');article.className='answer-page';const title=document.createElement('h3');title.textContent=detail.querySelector('summary').textContent;article.append(title);detail.querySelectorAll('p').forEach(p=>article.append(p));detail.replaceWith(article)});
  content.querySelectorAll('.token-table').forEach(table=>table.replaceWith(...table.children));
  const blocks=[...content.children];
  content.replaceChildren();content.classList.add('paginated');
  const body=document.createElement('div');body.className='page-body';
  const nav=document.createElement('div');nav.className='page-nav';
  nav.innerHTML='<button class="page-prev" aria-label="Previous page">← BACK</button><span class="page-count" aria-live="polite"></span><button class="page-next" aria-label="Next page">NEXT →</button>';
  content.append(body,nav);let pages=[],index=0,scheduled=false;
  function show(){body.replaceChildren(...(pages[index]||[]));nav.querySelector('.page-count').textContent=`${String(index+1).padStart(2,'0')} / ${String(pages.length||1).padStart(2,'0')}`;nav.querySelector('.page-prev').disabled=index===0;nav.querySelector('.page-next').disabled=index>=pages.length-1;nav.classList.toggle('single-page',pages.length<=1)}
  function layout(){
    scheduled=false;if(w.hidden||!body.clientHeight)return;
    nav.classList.remove('single-page');pages=[];let current=[];body.replaceChildren();
    for(const block of blocks){
      body.append(block);
      if(body.scrollHeight>body.clientHeight+1&&current.length){block.remove();pages.push(current);current=[];body.replaceChildren(block)}
      current.push(block);
    }
    if(current.length)pages.push(current);index=Math.min(index,Math.max(0,pages.length-1));show();
  }
  nav.querySelector('.page-prev').onclick=()=>{if(index>0){index--;show()}};
  nav.querySelector('.page-next').onclick=()=>{if(index<pages.length-1){index++;show()}};
  const observer=new ResizeObserver(()=>{if(!scheduled){scheduled=true;requestAnimationFrame(layout)}});observer.observe(content);
  document.fonts.ready.then(layout);requestAnimationFrame(layout);
}
