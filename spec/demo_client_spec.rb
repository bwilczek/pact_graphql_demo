require_relative '../app/client/demo_client'

require 'pact/consumer/rspec'

Pact.service_consumer "DemoClient" do
  has_pact_with "AuthorProvider" do
    mock_service :author_provider do
      port 1234
      pact_specification_version "2.0.0"
    end
  end
end

RSpec.describe DemoClient, :pact => true do
  # DemoClient.new.qotd.data.qotd.author
  before do
    author_provider
      .given('No body is given')
      .upon_receiving('an empty request')
      .with(method: :post, path: '/graphql')
      .will_respond_with(
        status: 200,
        headers: { 'Content-Type' => 'application/json' },
        body: {
          data: {
            qotd: {
              author: Pact.like('Frank Kimono'),
              quote: Pact.like('King Bruce Lee')
            }
          }
        }
      )
  end

  let(:client) { DemoClient.new('http://localhost:1234/graphql') }

  it 'passes' do
    expect(client.qotd.data.qotd.author).to be('Franek Kimono')
  end
end
