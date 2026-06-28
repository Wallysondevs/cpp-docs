# std::basic_streambuf&lt;CharT,Traits&gt;::getloc

[std::locale](<#/doc/locale/locale>) getloc() const;

  
Retorna a localidade associada. 

A localidade associada é o valor fornecido a [pubimbue()](<#/doc/io/basic_streambuf/pubimbue>) na última chamada, ou, se essa função não tiver sido chamada, o valor da localidade global ([std::locale](<#/doc/locale/locale>)) no momento da construção do streambuf. 

### Parâmetros

(nenhum) 

### Valor de retorno

A localidade associada. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ pubimbue](<#/doc/io/basic_streambuf/pubimbue>) |  altera a localidade associada e invoca imbue()   
(função membro pública)  