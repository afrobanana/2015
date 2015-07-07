module Jekyll
  module AssetFilter
    def to_array(hash)
      hash.each do |key, value|
        value["id"] = key
      end
      hash.values
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
