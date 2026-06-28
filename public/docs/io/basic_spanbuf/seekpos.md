# std::basic_spanbuf&lt;CharT,Traits&gt;::seekpos

protected:  
pos_type seekpos( pos_type sp, [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) which =  
[std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ) override; |  |  (desde C++23)  

  
Reposiciona o próximo ponteiro para a área de leitura e/ou escrita, se possível, para a posição indicada por `sp`.

Equivalente a return seekoff(off_type(sp), [std::ios_base::beg](<#/doc/io/ios_base/seekdir>), which);.

### Parâmetros

sp  |  \-  |  posição do stream, como uma obtida por seekoff() ou `seekpos()` which  |  \-  |  define se as sequências de entrada, a sequência de saída, ou ambas são afetadas. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação [`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada
---|---
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Valor de retorno

`sp` em caso de sucesso ou pos_type(off_type(-1)) em caso de falha.

### Observações

`seekpos()` é chamado por [std::basic_streambuf::pubseekpos()](<#/doc/io/basic_streambuf/pubseekpos>), que é chamado pelas versões de argumento único de [std::basic_istream::seekg()](<#/doc/io/basic_istream/seekg>) e [std::basic_ostream::seekp()](<#/doc/io/basic_ostream/seekp>).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) |  invoca seekpos()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ seekpos](<#/doc/io/basic_stringbuf/seekpos>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas usando endereçamento absoluto   
(função membro protegida virtual de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ seekpos](<#/doc/io/strstreambuf/seekpos>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas usando endereçamento absoluto   
(função membro protegida virtual de `std::strstreambuf`)