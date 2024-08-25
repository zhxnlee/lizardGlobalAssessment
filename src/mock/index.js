import { createServer, Response } from 'miragejs';
import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';


    this.get('/posts', () => {
      return { posts: data.posts }; 
    });

    this.get('/posts/:id', (schema, request) => {
      const id = request.params.id;
      const post = data.posts.find(post => post.id === id);

      if (post) {
        return post;
      } else {
        return new Response(404, {}, { error: "Post not found" });
      }
    });
  },
});
