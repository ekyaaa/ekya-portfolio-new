CC = pdflatex
JOBNAME = Ekya_Muhammad_CV
SOURCE = main.tex
SECTIONS = $(wildcard sections/*.tex)

.PHONY: all clean distclean

all: $(JOBNAME).pdf

$(JOBNAME).pdf: $(SOURCE) $(SECTIONS)
	$(CC) -jobname=$(JOBNAME) -interaction=nonstopmode $(SOURCE)
	$(CC) -jobname=$(JOBNAME) -interaction=nonstopmode $(SOURCE)

clean:
	rm -f *.aux *.log *.out *.toc *.fls *.fdb_latexmk *.synctex.gz *.bbl *.blg sections/*.aux

distclean: clean
	rm -f $(JOBNAME).pdf main.pdf
