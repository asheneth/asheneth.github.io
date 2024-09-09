(function(){
    window.addEventListener('load', () => {
        Array.from(document.getElementsByClassName('project-container')).forEach((container) => {
            let scroll_start = -1;
            let scroll = 0;
            let right = container.scrollWidth - container.clientWidth;
            let last_x = -1;

            function touch_start(e){
                last_x = e.touches[0].screenX;

                scroll_start = last_x;
            }
            
            function touch_end(){
                if(scroll_start != -1){
                    scroll += last_x - scroll_start;
    
                    if(-scroll < 0){
                        scroll = 0;
                    }else if(-scroll > right){
                        scroll = -right;
                    }
    
                    scroll_start = -1;
                }
            }

            function touch_move(e){
                last_x = e.touches[0].screenX;
                
                if(scroll_start != -1){
                    Array.from(container.children).forEach((project) => {
                        let new_scroll = scroll + last_x - scroll_start;
                        
                        if(0 >= -new_scroll){
                            new_scroll = 0;
                        }
                        
                        if(-new_scroll >= right){
                            new_scroll = -right;
                        }

                        project.style.transform = `translateX(${new_scroll}px)`;
                    });
                }
            }

            function mouse_down(e){
                scroll_start = e.screenX;
            }

            function mouse_up(e){
                if(scroll_start != -1){
                    scroll += e.screenX - scroll_start;
    
                    if(-scroll < 0){
                        scroll = 0;
                    }else if(-scroll > right){
                        scroll = -right;
                    }
    
                    scroll_start = -1;
                }
            }

            function mouse_move(e){
                if(scroll_start != -1){
                    Array.from(container.children).forEach((project) => {
                        let new_scroll = scroll + e.screenX - scroll_start;
                        
                        if(0 >= -new_scroll){
                            new_scroll = 0;
                        }
                        
                        if(-new_scroll >= right){
                            new_scroll = -right;
                        }

                        project.style.transform = `translateX(${new_scroll}px)`;
                    });
                }
            }

            window.addEventListener('resize', () => {
                scroll /= right;

                right = container.scrollWidth - container.clientWidth;

                scroll *= right;
                scroll = Math.round(scroll);

                Array.from(container.children).forEach((project) => {
                    project.style.transform = `translateX(${scroll}px)`;
                });
            });
            
            container.addEventListener('click', (e) => {
                console.log(e);
            });

            //Mouse

            container.addEventListener('mousedown', mouse_down);

            window.addEventListener('mouseup', mouse_up);

            window.addEventListener('mouseout', mouse_up);

            window.addEventListener('mousemove', mouse_move);
            
            //Touch Screen

            container.addEventListener('touchstart', touch_start);

            window.addEventListener('touchend', touch_end);

            window.addEventListener('touchcancel', touch_end);

            window.addEventListener('touchmove', touch_move);
        });
    });
})()