require 'active_record'
require 'logger'
require 'csv'

ActiveRecord::Base.logger = Logger.new(STDOUT)
ENV['DATABASE_URL'] ||= "postgres://localhost/coins?pool=5"

ActiveRecord::Base.establish_connection(ENV['DATABASE_URL'])

class Coin < ActiveRecord::Base
end

ActiveRecord::Schema.define do
  self.verbose = true # or false

  enable_extension "plpgsql"
  enable_extension "pgcrypto"

  create_table(:coins, force: true) do |t|
    t.string      :coin,       null: false
    t.float       :marketcap,  null: false
    t.float 	  :price,      null: false
    t.datetime    :date,       null: false
  end
end


# Parse CSV in ruby
# h = {}; (Dir.entries('all-coins') - ['.', '..']).map{|f| h[f.split('.')[0]] = CSV.read("all-coins/#{f}", headers: true).map(&:to_h)}

# psql
# COPY(SELECT date, SUM(marketcap) FROM coins GROUP BY date ORDER BY date;) To '/tmp/aggregated.csv' With CSV DELIMITER ',';

# date,txVolume(USD),adjustedTxVolume(USD),txCount,marketcap(USD),price(USD),exchangeVolume(USD),fees,activeAddresses,medianTxValue(USD),medianFee,paymentCount