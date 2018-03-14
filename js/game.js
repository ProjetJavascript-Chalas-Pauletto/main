class Game {
        constructor() {
            this.jobs = []; //Contient les différents métiers
            this.inventory = new Inventory();
            this.menu = null;

            this.init();
        }

        init() {
            let self = this;
            console.log("loading jobs");
            $.ajax({
                url: '/json/loadJobs.php'
            })
                .done(function (data) {
                    for (let job in data.jobs) {
                        self.jobs.push(new Job(data.jobs[job], data.playerJobs[job]));
                        console.log(data.jobs[job] + " loaded with : " + data.playerJobs[job] + " exp");
                    }
                    console.log("All Jobs loaded successfully !");
                    console.log(self.jobs);
                    self.menu = new Menu(self.inventory, self.jobs);
                })
                .fail(function () {
                    $('body').html(data.msg);
                })
            ;

            $("#click").click(function () {
                self.jobs[0].addExp(1);
                self.inventory.setResource(1,1);
                $("#click").html(self.jobs[0].exp);
            });
        }
    }