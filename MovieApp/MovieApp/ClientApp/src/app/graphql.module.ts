import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpClientModule } from '@angular/common/http';

const uri = 'graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext(() => {
    const headerToken = localStorage.getItem('authToken');

    if (headerToken === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${headerToken}`,
        },
      };
    }
  });

  const link = ApolloLink.from([auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
    connectToDevTools: true,
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
