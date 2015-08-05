
define(function() {

    var Camera = Class.extend({
        init: function(renderer) {
            this.renderer = renderer;
            this.x = 0;
            this.y = 0;
            this.gridX = 0;
            this.gridY = 0;
            this.offset = 0.5;
            this.rescale();
        },

        rescale: function() {
            var factor = this.renderer.getScaleFactor();
			
			var stageWidth = $('#stage').width();
			var stageHeight = $('#stage').height();
			
			// TODO: Figure out why this always is zero...
			if(!stageWidth || !stageHeight)
			{
				stageWidth = 640;
				stageHeight = 480;
			}
			
			console.log("The stage is", stageWidth, 'pixels wide, and the squares are each', (16 * factor), "px wide");
			console.log("The stage is", stageHeight, 'pixels high, and the squares are each', (16 * factor), "px high");
			
            var gridW = stageWidth / 16 / factor;
            var gridH = stageHeight / 16 / factor;

			console.log("Therefore, we can fit", gridW, "x", gridH, "squares on the stage");
			
			this.gridW = Math.ceil(gridW);
			this.gridH = Math.ceil(gridH);
			
			console.log("But since we can't handle partial squares, we'll draw", this.gridW, "x", this.gridH, "squares on the stage");
			
			var xOffset = Math.floor((this.gridW - gridW) / 2 * 16 * factor);
			var yOffset = Math.floor((this.gridH - gridH) / 2 * 16 * factor);
			
			console.log("And we'll offset the whole thing by ", xOffset, ",", yOffset, "px to re-center it.");
			
			$("#game").css('position', 'absolute');
			$("#game").css('left', -xOffset);
			$("#game").css('top', -yOffset);
			
        },

        setPosition: function(x, y) {
            this.x = x;
            this.y = y;

            this.gridX = Math.floor( x / 16 );
            this.gridY = Math.floor( y / 16 );
        },

        setGridPosition: function(x, y) {
            this.gridX = x;
            this.gridY = y;

            this.x = this.gridX * 16;
            this.y = this.gridY * 16;
        },

        lookAt: function(entity) {
            var r = this.renderer,
                x = Math.round( entity.x - (Math.floor(this.gridW / 2) * r.tilesize) ),
                y = Math.round( entity.y - (Math.floor(this.gridH / 2) * r.tilesize) );

            this.setPosition(x, y);
        },

        forEachVisiblePosition: function(callback, extra) {
            var extra = extra || 0;
            for(var y=this.gridY-extra, maxY=this.gridY+this.gridH+(extra*2); y < maxY; y += 1) {
                for(var x=this.gridX-extra, maxX=this.gridX+this.gridW+(extra*2); x < maxX; x += 1) {
                    callback(x, y);
                }
            }
        },

        isVisible: function(entity) {
            return this.isVisiblePosition(entity.gridX, entity.gridY);
        },

        isVisiblePosition: function(x, y) {
            if(y >= this.gridY && y < this.gridY + this.gridH
            && x >= this.gridX && x < this.gridX + this.gridW) {
                return true;
            } else {
                return false;
            }
        },

        focusEntity: function(entity) {
            var w = this.gridW - 2,
                h = this.gridH - 2,
                x = Math.floor((entity.gridX - 1) / w) * w,
                y = Math.floor((entity.gridY - 1) / h) * h;

            this.setGridPosition(x, y);
        }
    });

    return Camera;
});
