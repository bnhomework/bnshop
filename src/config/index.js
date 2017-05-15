const config={
  imgServer:'http://127.0.0.1:3009/',
  apiServer: 'http://127.0.0.1:3009/api/',


  categories:[{"t":"Apparel", "st":["T-Shirts","Dress Shirts","Uniforms","Polo Shirts","Outerwear","Other Apparel","Sweatshirts","Headwear","Women's Apparel","Sweaters & Cardigans","Athletic Apparel","Quick Links","Embroidered Apparel","Shop by Brand"]},{"t":"Auto, Home & Tools","st":["Auto Accessories","Key Tags","Living","Food & Lunch Containers","Pet Supplies","Flashlights","Kitchenware","Tape Measures","Key Lights","Lawn & Garden","Tools","Quick Links"]},{"t":"Bags","st":["Totes","Laptop & Tablet Bags","Travel","Coolers","Business Bags","Plastic Bags","Drawstring Sportpacks","Backpacks","Paper Bags","Duffels & Gym Bags","Wallets","Gift Bags","Embroidered Bags","Quick Links","Shop by Brand"]},{"t":"Drinkware","st":["Sport & Water Bottles","Travel Mugs & Tumblers","Plastic Cups","Beverage Holders","Glassware","Disposable Cups","Ceramic Mugs","Coasters","Quick Links","Shop by Brand"]},{"t":"Food & Candy","st":["Candy","Individually Wrapped","Bags","Chocolate","Cookies","Candy Jars","Gum","Mints","Tins","Nuts & Pretzels","Gift Boxes & Baskets","Packaged with Gift","Popcorn","Water & Beverages","BBQ Gifts","Mixed Assortment","Cheese & Meats","Wine Gifts","Quick Links","Shop by Brand"]},{"t":"Office & Awards","st":["Magnets","Stickers & Decals","Awards & Recognition","Desk Accessories","Stress Relievers","Business Card Holders","Picture Frames","Rulers","Clocks","Books & Bookmarks","Calculators","Watches","Quick Links"]},{"t":"Outdoor & Leisure","st":["Umbrellas","Team Spirit","Golf","Towels","Blankets","Chairs","Sunglasses","Sports","BBQ & Picnic","Hand Fans","Quick Links"]},{"t":"Stationery","st":["Padfolios","Cubes, Pads & Flags","Calendars","Notebooks & Journals","Marketing Materials","Planners & Diaries","Presentation Folders","Packaging","Greeting Cards","Document Holders","Binders","Clipboards","Quick Links","Shop by Brand"]},{"t":"Technology","st":["Power Banks","USB Flash Drives","Stylus Pens & Tools","Tech Accessories","Laptop Bags","Music & Audio","Mouse Pads","Quick Links"]},{"t":"Toys & Novelties","st":["Childrens Toys","Novelty & Sport Balls","Coloring & Art","Balloons","Flyers","Executive Toys","Noisemakers","Tattoos","Light Up Novelties","Quick Links"]},{"t":"Trade Show & Signage","st":["Table Covers & Throws","Banners, Flags & Signs","Lanyards & Badges","Lanyard & ID Holder Accessories","Display Accessories","Food Service Supplies","Table Top Displays","Trade Show Games","Floor Displays","Display Kits","Tents","Literature Displays","Giveaways","Quick Links"]},{"t":"Wellness & Safety","st":["Personal Care","First Aid","Safety","Healthcare","Hand Sanitizers","Fitness","Pedometers","Lip Balm","Sunscreen","Educational Guides","Awareness Bracelets","Buttons","Quick Links"]},{"t":"Writing","st":["Pens","Pencils","Multi Function Writing","Writing Sets","Executive Writing","Stylus Pens","Highlighters","Markers","Quick Links","Shop by Brand"]},{"t":"See More","st":["4imprint Shops","4imprint Quick Links","More Ways to Shop"]}],
  }
var install= function  (Vue){
 if (install.installed) return
  install.installed = true

  Object.defineProperty(Vue.prototype, '$appSetting', {
    get () { return config }
  })
} 

export default {
	install,
	config
}