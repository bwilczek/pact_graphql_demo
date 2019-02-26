Types::QotdType = GraphQL::ObjectType.define do
  name "QuoteOfTheDay"
  field :author, types.String
  field :quote, types.String
end
