import React from 'react';
import TestRenderer from 'react-test-renderer'
import { Author, GET_AUTHOR_QUERY }from './Author'
import { MockedProvider } from 'react-apollo/test-utils'
import wait from 'waait'

let mocks = [
  {
    request: {
      query: GET_AUTHOR_QUERY,
      variables: {
        id: 6,
      },
    },
    result: {
      data: {
        author: {
          id: 6,
          name: 'Halina Kowal',
          __typename: 'Author',
          books: [
            { title: 'C++ for dummies', __typename: 'Book' },
            { title: 'C# for bosses', __typename: 'Book' },
          ]
        }
      },
    },
  },
]

it('renders without crashing', async () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Author id={6} />
    </MockedProvider>
  )
  await wait(0);

  const titles = component.root.findAllByType('li').map(el => el.children[0])
  expect(titles).toContain('C# for bosses')
})
