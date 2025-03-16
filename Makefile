NAME=index

all: $(NAME).qmd
	quarto render $(NAME).qmd;

preview: $(NAME).qmd
	quarto preview $(NAME).qmd

show: $(NAME).pdf
	open $(NAME).pdf
