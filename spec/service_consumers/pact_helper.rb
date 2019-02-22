require 'pact/provider/rspec'

Pact.service_provider 'AuthorProvider' do
  honours_pacts_from_pact_broker do
    pact_broker_base_url 'http://localhost:8080/'
    consumer_version_tags [{name: 'demo', all: false}]
  end
  app_version '0.2.0'
  publish_verification_results true
end
