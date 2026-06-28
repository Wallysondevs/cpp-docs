# std::basic_streambuf&lt;CharT,Traits&gt;::pbase, std::basic_streambuf&lt;CharT,Traits&gt;::pptr, std::basic_streambuf&lt;CharT,Traits&gt;::epptr

protected:  
char_type* pbase() const; |  (1)  |   
protected:  
char_type* pptr() const; |  (2)  |   
protected:  
char_type* epptr() const; |  (3)  |   

  
Retorna ponteiros que definem a área de escrita (put area).

1) Retorna o ponteiro para o início ("base") da área de escrita.

2) Retorna o ponteiro para o caractere atual (_ponteiro de escrita_) na área de escrita.

3) Retorna o ponteiro para uma posição após o final da área de escrita.

### Parâmetros

(nenhum)

### Valor de retorno

1) O ponteiro para o início da área de escrita.

2) O ponteiro para o caractere atual (_ponteiro de escrita_) na área de escrita.

3) O ponteiro para uma posição após o final da área de escrita.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ ebackgptregptr](<#/doc/io/basic_streambuf/gptr>) | retorna um ponteiro para o início, caractere atual e o final da área de leitura (get area)   
(função membro protegida)  