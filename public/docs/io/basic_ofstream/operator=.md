# std::basic_ofstream&lt;CharT,Traits&gt;::operator=

```cpp
basic_ofstream& operator=( basic_ofstream&& other );  // (desde C++11)
```

  
Move-atribui o stream de arquivo other para *this, efetivamente move-atribuindo tanto a classe base [std::basic_ostream](<#/doc/io/basic_ostream>) quanto o [std::basic_filebuf](<#/doc/io/basic_filebuf>) associado.

other fica sem arquivo associado. Note que a atribuição por movimento da classe base troca todas as variáveis de estado do stream (exceto por rdbuf) entre *this e other.

### Parâmetros

other  |  \-  |  stream de arquivo a ser movido   
  
### Valor de retorno

*this

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/io/basic_ofstream/swap>)(C++11) |  troca dois streams de arquivo   
(função membro pública)  
[ operator=](<#/>)(C++11) |  atribui um objeto `basic_filebuf`   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)  
[ operator=](<#/>)(C++11) |  move-atribui de outro `basic_ostream`   
(função membro protegida)