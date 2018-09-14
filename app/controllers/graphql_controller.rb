class GraphqlController < ApplicationController
  def execute
    body = request.body.read
    parsed_body = JSON.parse(body)
    variables = ensure_hash(parsed_body['variables'])
    query = parsed_body['query']
    operation_name = parsed_body['operationName']
    context = {
      # Query context goes here, for example:
      # current_user: current_user,
    }
    result = PactGraphqlDemoSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  end

  private

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
