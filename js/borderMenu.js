class Menu {
        constructor(inventory, jobs) {
            console.log("Menu Loading");
            this.eventType = this.mobileCheck() ? 'touchstart' : 'click';
            this.menu = $('#bt-menu');//$('#bt-menu');
            this.overlay = this.createOverlay();

            this.inventory = inventory;
            this.jobs = jobs;

            this.createMenu();
            this.createEvent();
        }

        // http://stackoverflow.com/a/11381730/989439
        mobileCheck() {
            let check = false;
            (function (a) {
                if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }

        resetMenu() {
            this.menu.removeClass('bt-menu-open');
            this.menu.addClass('bt-menu-close');
        }

        closeClickFn(ev) {
            this.resetMenu();
            this.overlay.removeEventListener(this.eventType, this.closeClickFn);
        };

        createOverlay() {
            let overlay = $('<div />').addClass('bt-overlay');
            this.menu.append(overlay);

            return overlay;
        }

        //Open panel
        openPanel(title, id) {
            let samePanel = this.overlay.hasClass(title);

            if (this.overlay.hasClass('bt-overlay-panel')) { //Si un panel est ouvert
                this.closeAll();
            }
            if (!samePanel) { //Si on ouvre pas le meme panel
                $('.' + id).css("display", "");
                this.overlay.addClass('bt-overlay-panel ' + title);
                //let header = document.createElement("H1");
                //let text = document.createTextNode(title);
                //header.appendChild(text);
                //overlay.appendChild(header);
                return true;
            }
            return false;
        }

        createMenu(){
            let createPanel = function (title){
                return $('<div />').addClass(title).css("display", "none");
            };

            /*##############################
            Create Job PANEL
            #############################"*/
            let jobsPanel = createPanel('jobs-panel');
            for (let i = 0; i < 8; i++) {
                let job = $('<div />').addClass("jobSkill");
                let exp = $('<div />').addClass("progress");
                let progress = $('<div />').addClass("progress-bar progress-bar-striped progress-bar-animated job" + i).css("width", i * (100 / 8) + "%").html(i * (100 / 8) + "%");
                exp.append(progress);
                //Add image skill
                let icon = $('<img />').attr("src", "img/jobs/lumberjack.png");
                job.append(exp);
                job.append(icon);
                jobsPanel.append(job);
            }

            /*##############################
            Create Inventory PANEL
            #############################"*/
            let inventoryPanel = createPanel('inventory-panel');

            let characterInventory = $('<div />').addClass("characterInventory");
            let resourcesInventory = $('<div />').addClass("resourcesInventory");
            let itemsInventory = $('<div />').addClass("itemsInventory");

            //CharacterInventory
            for (let i = 0; i < 8; i++) {
                let characterSlot = $('<div />').addClass("slot" + i);
                characterInventory.append(characterSlot);
            }

            inventoryPanel.append(characterInventory);
            inventoryPanel.append(resourcesInventory);
            inventoryPanel.append(itemsInventory);

            //itemInventory
            new Grid(10, 10, '.itemsInventory');

            /*##############################
            Create MAP PANEL
            #############################"*/
            let mapPanel = createPanel('map-panel');

            let map = $('<div />').attr('id','map');
            mapPanel.append(map);
            new Grid(30, 30, '#map');

            /*##############################
            Create SKILL PANEL
            #############################"*/
            let skillsPanel = createPanel('skills-panel');

            //Ajoute les panel dans l'Overlay
            this.overlay.append(jobsPanel);
            this.overlay.append(inventoryPanel);
            this.overlay.append(mapPanel);
            this.overlay.append(skillsPanel);
        }

        createEvent() {
            let self = this;
            //Open Menu
            $(".bt-menu-trigger").on(this.eventType, function () {
                if (self.menu.hasClass('bt-menu-open')) {
                    self.resetMenu();
                    self.closeAll();
                }
                else {
                    self.menu.removeClass('bt-menu-close');
                    self.menu.addClass('bt-menu-open');
                    //overlay.addEventListener(eventtype, closeClickFn );
                }
            });

            //Open Jobs Panel
            $("#bt-jobs").on(this.eventType, function () {
                if (self.openPanel("Jobs", "jobs-panel")) {
                    self.jobs[1].displayJob();
                    /*for (let job in self.jobs){
                        self.jobs[job].displayJob();
                    }*/
                }
            });

            //Open Inventory Panel
            $("#bt-inventory").on(this.eventType, function () {
                if (self.openPanel("Inventory", "inventory-panel")) {
                    self.inventory.displayResources();
                }
            });

            //Open Map Panel
            $("#bt-map").on(this.eventType, function () {
                if (self.openPanel("World Map", "map-panel")) {

                }
            });

            //Open Skills Panel
            $("#bt-skills").on(this.eventType, function () {
                self.openPanel("Skills", "skills-panel");
            });
        }

        closeAll() {
            if (this.overlay.hasClass("bt-overlay-panel")) {
                this.overlay.attr("class", "bt-overlay");
            }
            $('.bt-overlay').children().css("display", "none"); //Cache tous les panels
        };
    }