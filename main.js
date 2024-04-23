window.addEventListener('load', ()=> {
    const jsmediatags = window.jsmediatags
    
    const fTime = document.querySelector('.fTime')
    const tTime = document.querySelector('.tTime')
    const tPlayed = document.querySelector('.tplayed')
    const prog = document.querySelector('.progress')
    const hr = document.querySelector('.hr')
    const min = document.querySelector('.min')
    const sec = document.querySelector('.sec')

    const fsec = document.querySelector('.f_sec')
    const fmin = document.querySelector('.f_min')
    const fhr = document.querySelector('.f_hr')
    
    const heart = document.querySelector('.love')
    const cover = document.querySelector('.cover')
    const title = document.querySelector('.title')
    const artist = document.querySelector('.artist')
    const genre = document.querySelector('.genre')
    const mini_img = document.querySelector('.mini_img')
    const mini_name = document.querySelector('.mini_name')
    
    const play = document.querySelectorAll('.p')
    const next = document.querySelectorAll('.next')
    const prev = document.querySelector('.prev')
    
    const mini_prog = document.querySelector('.mini_prog')
    
    let playIndex = 0
    const MUSIC = [
      {
        index: 0,
        src: 'audio/Good Life - G-Eazy & Kehlani (from The Fate of the Furious_ The Album)(Lyrics)_wZs8LxMCzNw.mp3',
        name: 'Good Life - G-Eazy & Kehlani (from The Fate of the Furious: The Album)(Lyrics)',
        artist: 'DopeLyrics',
        like: false
      },
      {
        index: 1,
        src: 'audio/GabbyBarrett_I_Hope.mp3',
        name: 'Gabby Barrett - I Hope (ft. Charlie Puth) (Audio)',
        artist: 'Gabby Barrett',
        like: false
      },
      {
        index: 2,
        src: 'audio/NF - Returns (Audio)_TkiDouBnDrU.mp3',
        name: 'NF - Returns (Audio)',
        artist: 'NFVEVO',
        like: false
      },
      {
        index: 2,
        src: 'audio/NF - Returns (Audio)_TkiDouBnDrU.mp3',
        name: 'NF - Returns (Audio)',
        artist: 'NFVEVO',
        like: false
      }
      ]
    let c = 0
    let isPlaying = false
    musicList()
    const musi = document.querySelectorAll('.musi')
    const mInfo = document.querySelectorAll('.mInfo')
    const li_heart = document.querySelectorAll('.li_love')
    musi[0].setAttribute('current','true')
    const totalSong = document.querySelector('.total')
    totalSong.textContent = MUSIC.length
    
    //full length  155s
    /* calc the width of progress in rel to fulltime

       barWidth * progress
       ———————————————————   =  progwidth
             fullTime
     */

     /* get the exact seconds when u jump progress

       fullTime * progwidth
       ————————————————————  =  progress
             barWidth
    */

    const mp3 = document.getElementById("mp3")
    mp3.src = MUSIC[playIndex].src
    
    mp3.addEventListener('loadeddata', (e)=>{
      metadata()
      let m = parseInt(e.target.duration / 60)
      let s = parseInt(e.target.duration % 60)
      tTime.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+ s : s}`
      console.log(e.target.duration)
      
      mp3.addEventListener('timeupdate', (e)=>{
        prog.style.width = parseInt(fTime.clientWidth * e.target.currentTime / e.target.duration)+'px'
        
        mini_prog.style.strokeDashoffset = 94 -(94 * e.target.currentTime) / e.target.duration
        
        let m = parseInt(e.target.currentTime / 60)
        let s = parseInt(e.target.currentTime % 60)
        tPlayed.innerText = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+ s : s}`
      })
      
    })
    mp3.addEventListener('ended', ()=>{
      playIndex < MUSIC.length-1 ? playIndex +=1 : playIndex = 0
      mp3.src = MUSIC[playIndex].src
      li_heart[playIndex].classList.contains('on') ? heart.classList.add('on') : heart.classList.remove('on')
      mp3.play()
      })
    fTime.addEventListener('click', (e)=>{
      mp3.currentTime = parseInt(mp3.duration * e.offsetX / fTime.clientWidth)
      
      prog.style.width = parseInt(fTime.clientWidth * mp3.currentTime / mp3.duration) +'px'
    })
    for(let i=0; i<play.length; i++){
      play[i].addEventListener('click', ()=>{
      let cl = play[i].classList
      if(isPlaying){
        mp3.pause()
        isPlaying = false
        playIcon()
        
        cl.contains('x') ? play[i+1].innerHTML = `<i class="fa fa-play"></i>` : play[i-1].innerHTML = `<i class="fa fa-play"></i>`
        return
      }
      mp3.play()
      isPlaying = true
      pauseIcon()
      cl.contains('x') ? play[i+1].innerHTML = `<i class="fa fa-pause"></i>` : play[i-1].innerHTML = `<i class="fa fa-pause"></i>`
      return
    })
    }
    
    for(let n = 0; n < next.length; n ++){
      next[n].addEventListener('click', ()=>{
        playIndex = playIndex < MUSIC.length-1 ? playIndex += 1 : playIndex = 0
        mp3.src = MUSIC[playIndex].src
        mp3.play()
        isPlaying = true
        pauseIcon()
        musi.forEach(m =>{
          m.setAttribute('current','false')
        })
        musi[playIndex].setAttribute('current', 'true')
        c = 0
        li_heart[playIndex].classList.contains('on') ? heart.classList.add('on') : heart.classList.remove('on')
        console.log(playIndex)
    })
    }
    prev.addEventListener('click', ()=>{
      playIndex = playIndex > 0 ? playIndex -= 1 : playIndex = 0
      mp3.src = MUSIC[playIndex].src
      mp3.play()
      musi[playIndex].setAttribute('current', 'true')
      c = 0
      li_heart[playIndex].classList.contains('on') ? heart.classList.add('on') : heart.classList.remove('on')
    })
    
    function metadata() {
        fetch(mp3.src).
        then(response => response.blob()).
        then(response => jsmediatags.read(response, {
            onSuccess: function(tag) {
               const data = tag.tags.picture.data
               const format = tag.tags.picture.format
               let base64String = ''
               
               for(let i=0; i<data.length; i++){
                 base64String += String.fromCharCode(data[i])
               }
                
                cover.style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`
                mini_img.style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`
                title.textContent = tag.tags.title
                mini_name.textContent = tag.tags.title
                artist.textContent = tag.tags.artist
                genre.textContent = tag.tags.genre
            },
            onError: function(error) {
                //console.log(error)
            }
        })
        )
    }
    
    function musicList(){
      const mList = document.querySelector('.mList')
      let musii = ''
      for(let i=0; i< MUSIC.length; i++){
        musii = `
        <div class="musi" src = '${MUSIC[i].src}' current = 'false'>
          <div class="mInfo">
            <p class="mName">${MUSIC[i].name}</p>
            <p class="mArt">${MUSIC[i].artist}</p>
         </div>
         <i class="fa fa-heart li_love"></i>
        </div>
        `
        mList.innerHTML += musii
      }
    }
    const drop = document.querySelector('.list')
    const mList = document.querySelector('.mList')
    const music = document.querySelector('.music')
    const mini_co = document.querySelector('.mini_cont')
    const mini_nam = document.querySelector('.mini_name')
    drop.addEventListener("click", ()=>{
      mList.classList.toggle('active')
      music.classList.toggle('down')
      mini_co.classList.toggle('show')
    })
    
    for (let i = 0; i < mInfo.length; i++) {
    mInfo[i].addEventListener('click', ()=>{
      li_heart[i].classList.contains('on') ? heart.classList.add('on') : heart.classList.remove('on')
      if(musi[i].getAttribute('current') == 'true' ){
        playIndex = i
        music.classList.toggle('down')
        mList.classList.toggle('active')
        mini_co.classList.toggle('show')
        isPlaying = true
        pauseIcon()
        mp3.play()
      }else{
        musi.forEach(m =>{
          m.setAttribute('current','false')
        })
        c = 0
        musi[i].setAttribute('current','true')
        console.log(musi[i].getAttribute('src'))
        mp3.src = musi[i].getAttribute('src')
        playIndex = i
        music.classList.toggle('down')
        mList.classList.toggle('active')
        mini_co.classList.toggle('show')
        isPlaying = true
        pauseIcon()
        mp3.play()
      }
    })
    }
    
    mini_nam.addEventListener('click', ()=>{
      mList.classList.toggle('active')
      music.classList.toggle('down')
      mini_co.classList.toggle('show')
      for (let i = 0; i < li_heart.length; i++) {
        li_heart[playIndex].classList.contains('on') ? heart.classList.add('on') : heart.classList.remove('on')
      }
    })
    
    for(let i=0; i < li_heart.length; i++){
      li_heart[i].addEventListener('click', ()=>{
        li_heart[i].classList.toggle('on')
      })
    }
  
    heart.addEventListener('click', ()=>{
      c ++
      for(let i=0; i<musi.length; i++){
        if(musi[i].getAttribute('current') == 'true' && c == 1){
          li_heart[i].classList.toggle('on')
          heart.classList.toggle('on')
        }
        else if(musi[i].getAttribute('current') == 'true' && c > 1){
          li_heart[i].classList.toggle('on')
          heart.classList.toggle('on')
          c = 0
        }
      }
    })
    function pauseIcon(){
      for(let i = 0; i < play.length; i++){
        play[i].innerHTML = `<i class="fa fa-pause"></i>`
      }
    }
    function playIcon(){
      for(let i = 0; i < play.length; i++){
        play[i].innerHTML = `<i class="fa fa-play"></i>`
      }
    }
    
 })