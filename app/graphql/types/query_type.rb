Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :book, Types::BookType do
    description "Find a book by ID"
    argument :id, types.ID
    resolve ->(_obj, args, _ctx) {
      Book.includes(:author).find(args[:id])
    }
  end

  field :author, Types::AuthorType do
    description "Find an author by ID"
    argument :id, types.ID
    resolve ->(_obj, args, _ctx) {
      Author.includes(:books).find(args[:id])
    }
  end

  field :qotd, Types::QotdType do
    description "Get a random quote of the day"
    resolve ->(_obj, _args, _ctx) {
      Struct.new(:author, :quote).new('Frank Sinatra', 'Do be do be do')
    }
  end
end
