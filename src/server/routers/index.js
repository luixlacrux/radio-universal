export default function (app, express) {

  // Configurations of views html
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')

  // Configurations static files
  app.use(express.static('public'))

  // Routers of the application
  app.get('/', (req, res) => {
    res.render('app/index')
  })

  app.get('/admin', (req, res) => {
    res.render('admin/index')
  })

  app.get('/blog', (req, res) => {
    res.render('app/blog')
  })

  app.get('/blog/new', (req, res) => {
    res.render('admin/blog-new')
  })

  app.get('/blog/:id/view', (req, res) => {
    res.render('app/blog_details')
  })

  app.get('/anuncio/new', (req, res) => {
    res.render('admin/anuncio-new')
  })

  app.get('/contacto', (req, res) => {
    res.render('app/contacto')
  })

  app.get('/nosotros', (req, res) => {
    res.render('app/nosotros')
  })
}
