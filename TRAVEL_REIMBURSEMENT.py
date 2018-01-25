from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import StringIO, BytesIO
from PyPDF2 import PdfFileWriter, PdfFileReader
import csv


def createTravelReimbursment(date, description, price, payee, mailingAddress):
	fpath = "C:/Users/Ryan/Downloads/Documents/HackPSU/CHECK_REQUEST_FORM.pdf"
	packet = BytesIO()
	cv=canvas.Canvas(packet, pagesize=letter)
	    
	    #create a string
	cv.setFont('Helvetica', 11)
	    #date
	cv.drawString(100, 705, date)
	    
	#expense description
	cv.drawString(30, 385, description)

	#price
	cv.drawString(500, 385, price)  

	#total
	cv.drawString(500, 315, price)

	#payee
	cv.drawString(183, 284, payee) 

	#full Mailing Address 
	cv.setFont('Helvetica', 10)
	cv.drawString(30, 194, mailingAddress)


	    #save to string
	cv.save()
	    
	    #get back to 0
	packet.seek(0)

	new_pdf = PdfFileReader(packet)
		# read your existing PDF
	existing_pdf = PdfFileReader(open(fpath, "rb"))
	output = PdfFileWriter()
		# add the "watermark" (which is the new pdf) on the existing page
	page = existing_pdf.getPage(0)
	page.mergePage(new_pdf.getPage(0))
	output.addPage(page)
		# finally, write "output" to a real file
	outputStream = open("C:/Users/Ryan/Downloads/Documents/HackPSU/reimbursements/" + payee + "_Travel_Reimbursement.pdf", "wb")
	output.write(outputStream)
	outputStream.close()


with open("C:/Users/Ryan/Downloads/Documents/HackPSU/travel_Reimbursements.csv", "rt") as f:
	mycsv = csv.reader(f, quotechar='"', delimiter=',', quoting=csv.QUOTE_ALL, skipinitialspace=True)
	
	date = "04/07/2018"
	description = "GAS - Travel Reimbursement"

	next(mycsv)
	for row in mycsv:
		price = row[1]
		payee = row[0]
		mailingAddress = row[2]
		createTravelReimbursment(date, description, price, payee, mailingAddress)