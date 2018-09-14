Types::BookType = GraphQL::ObjectType.define do
  name "Book"
  field :id, types.ID
  field :title, types.String
  field :pages, types.Int
  field :author, Types::AuthorType
end
