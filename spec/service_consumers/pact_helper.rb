require 'pact/provider/rspec'

Pact.service_provider 'AuthorProvider' do
  honours_pact_with 'AuthorConsumer' do
    pact_uri "#{__dir__}/../../pacts/authorconsumer-authorprovider.json"
  end
end
