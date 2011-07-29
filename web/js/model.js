App.Model.DNS.loadList = function()
{
    App.Ajax.request('DNS.getList', {}, App.View.listItems);
}

App.Model.IP.loadList = function()
{
    App.Ajax.request('IP.getList', {}, App.View.listItems);
}

App.Model.USER.loadList = function()
{
    App.Ajax.request('USER.getList', {}, App.View.listItems);
}

App.Model.WEB_DOMAIN.loadList = function()
{
    App.Ajax.request('WEB_DOMAIN.getList', {}, App.View.listItems);
}

App.Model.MAIL.loadList = function()
{
    App.Ajax.request('MAIL.getList', {}, App.View.listItems);
}

App.Model.DB.loadList = function()
{
    App.Ajax.request('DB.getList', {}, App.View.listItems);
}

App.Model.CRON.loadList = function()
{
    App.Ajax.request('CRON.getList', {}, App.View.listItems);
}


App.Model.add = function(values, source_json) 
{    
    var method = App.Settings.getMethodName('add');
    App.Ajax.request(method, {
        spell: $.toJSON(values)
    }, function(reply){
        if(!reply.result) {
            App.Helpers.Warn('Changes were not applied');
        }
        else {
            var build_method = App.Env.getWorldName() + '_entry';
            var tpl = App.HTML.Build[build_method](values, 'new');
            App.Ref.CONTENT..replaceWith(tpl);
            // todo: reply.data;
        }
    });
}

App.Model.remove = function(world, elm)
{
    var method = App.Settings.getMethodName('delete');     
    App.Ajax.request(method,
    {
        spell: $('.source', elm).val()
    },
    function(reply) 
    {
        if (!reply.result) {
            App.Helpers.Warn('Changes were not applied');
        }
        else {
            $(elm).remove();
        }
    });
}

App.Model.update = function(values, source_json, elm) 
{    alert(source_json);
    var method = App.Settings.getMethodName('update');
    var build_method = App.Env.getWorldName() + '_entry';
    App.Ajax.request(method, {
        'old': source_json,
        'new': App.Helpers.toJSON(values)
    }, function(reply){
        if(!reply.result) {
            var tpl = App.HTML.Build[build_method](App.Helpers.evalJSON(source_json));
            $(elm).replaceWith(tpl);
            App.Helpers.updateScreen();
            App.Helpers.Warn('Changes were not applied');            
        }
        else {
            var tpl = App.HTML.Build[build_method](reply.data);
            $(elm).replaceWith(tpl);
            App.Helpers.updateScreen();
        }
        // TODO: !
    });
}

/*
App.Model.IP.update = function(values, source_json) {
    App.Ajax.request('IP.update', {
        'source': source_json,
        'target': App.Helpers.toJSON(values)
    }, function(reply){
        if(!reply.result) {
            App.Pages.IP.ipNotSaved(reply);
        }
    });
}

App.Model.IP.add = function(values) {
    App.Ajax.request('IP.add', {
        'target': App.Helpers.toJSON(values)
    }, function(reply){
        if(!reply.result) {
            App.Helpers.alert(reply.message)
        }
    });
}

App.Model.IP.remove = function(values_json, elm) {
    App.Ajax.request('IP.remove', {
        'target': values_json
    }, function(reply){
        if(!reply.result) {
            App.Helpers.alert(reply.message);
        }
        else {
            elm.remove();
        }
    });
}*/
