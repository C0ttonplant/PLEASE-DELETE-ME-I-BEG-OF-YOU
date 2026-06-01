import socketserver
import http.server
import urllib
import cgi
import email

PORT = 8000

class ServerHandler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        self.parse_request()
        # form = cgi.FieldStorage(
        #     fp=self.rfile,
        #     headers=self.headers,
        #     environ={'REQUEST_METHOD':'POST',
        #              'CONTENT_TYPE':self.headers['Content-Type'],
        #              })
        # for item in form.list:
        #     logging.error(item)
        # http.server.SimpleHTTPRequestHandler.do_GET(self)

        # with open("data.txt", "w") as file:
        #     for key in form.keys(): 
        #         file.write(str(form.getvalue(str(key))) + ",")
        print(self.request)
        print(self.headers)

Handler = ServerHandler

httpd = socketserver.TCPServer(("localhost", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()