
define(['/browserquest/js/player.js'], function(Player) {

    var Warrior = Player.extend({
        init: function(id, name) {
            this._super(id, name, Types.Entities.WARRIOR);
        },
    });

    return Warrior;
});
