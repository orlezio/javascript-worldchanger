$(function(){

    function getPost(ctx) {
        var params = Common.parseQS(window.location.search.substring(1));
        return Common.getDocById(params.id, ctx);
    }

    Common.getCtx().then(function(ctx) {

        getPost(ctx).then(function(post) {
            Common.getDocById(post.get('blog.author').document.id, ctx).then(function(author) {

                var relatedDocIds = (post.fragments['blog.relatedpost'] || []).map(function(link) {
                    return link.value.document.id;
                });

                Common.getDocsById(relatedDocIds, ctx).then(function(relatedposts) {
                    
                    var infos = {
                        post: post,
                        author: author,
                        ctx: ctx,
                        relatedposts: relatedposts,
                        page: 'blogpost',
                        params: Common.parseQS(window.location.search.substring(1))
                    }

                    Common.insertTmpl('#blogpost',infos);

                    Common.insertTmplFromFile('#blogsearch',infos,'layout/blogsearch.tpl');
                    Common.insertTmplFromFile('#menu',infos,'layout/menu.tpl');
                    Common.insertTmplFromFile('#footer',infos,'layout/footer.tpl');
                    Common.insertTmplFromFile('#disqus_thread', {}, 'layout/disqus_thread.tpl');

                    $('h1 ~ p img').parents().addClass('image');
                    
                });
            });
        });

    });

});