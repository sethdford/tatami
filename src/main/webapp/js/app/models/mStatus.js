(function(Backbone, Tatami){

    var Status = Backbone.Model.extend({
        initialize: function(){
            var self = this;

            this.listenTo(Tatami.app, 'model:status:' + this.id, function(model){
                if(self !== model)
                    model.keys().forEach(function(key){
                        var value = model.get(key);
                        if (self.get(key) !== value) self.set(key, value);
                    });
            });
            // this.listenTo(this, 'change', function(){
            //     Tatami.app.trigger('model:status:' + self.id, self);
            // });
        },
        idAttribute: 'statusId',

        defaults: {
            timelineId: null,
            username: null,
            statusPrivate: '',
            groupId: '',
            groupName: '',
            publicGroup: false,
            attachmentIds: '',
            attachments: [],
            content: '',
            statusDate: 0,
            iso8601StatusDate: '',
            prettyPrintStatusDate: '',
            replyTo: '',
            replyToUsername: '',
            firstName: '',
            lastName: '',
            avatar: '',
            favorite: false,
            detailsAvailable: false,
            sharedByUsername: false, 
            root: true,
            first: false,
            last: false
        },

        urlRoot: '/tatami/rest/statuses/',

        toJSON: function(){
            var attr = Backbone.Model.prototype.toJSON.call(this);

            attr.fullName = this.getFullName();
            attr.avatarURL = this.getAvatarURL();
            attr.attachmentsImage = this.getImages();

            return attr;
        },

        getFullName: function(){
            var fullName = [];

            if (this.get('firstName')) fullName.push(this.get('firstName'));
            if (this.get('lastName')) fullName.push(this.get('lastName'));

            return fullName.join(' ');
        },

        getAvatarURL: function(){
            return (this.get('avatar'))? '/tatami/avatar/' + this.get('avatar') + '/photo.jpg': '/img/default_image_profile.png';
        }, 

        getImages: function(){
            if (this.get('attachments') != null) {
                var images = this.get('attachments').filter(function(element){
                    return element.filename.match(/jpg$|jpeg$|gif$|png$/i);
                });
                return images;
            }
        }
    });

    Tatami.Models.Status = Status;

})(Backbone, Tatami);