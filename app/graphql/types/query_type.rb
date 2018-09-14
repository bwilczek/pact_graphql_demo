Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :book, Types::BookType do
    description "Find a book by ID"
    argument :id, types.ID
    resolve ->(obj, args, ctx) {
      Book.includes(:author).find(args[:id])
    }
  end

  field :author, Types::AuthorType do
    description "Find an author by ID"
    argument :id, types.ID
    resolve ->(obj, args, ctx) {
      Author.includes(:books).find(args[:id])
    }
  end
end
