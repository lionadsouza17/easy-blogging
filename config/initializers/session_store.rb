if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_easy_blogging", domain: "jdh-easy-blogging-react.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_easy_blogging"
end
