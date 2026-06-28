# std::basic_fstream&lt;CharT,Traits&gt;::operator=

```cpp
basic_fstream& operator=( basic_fstream&& other );  // (desde C++11)
```

  
Move-atribui o fluxo de arquivo `other` para `*this`, efetivamente move-atribuindo tanto a classe base [std::basic_iostream](<#/doc/io/basic_iostream>) quanto o [std::basic_filebuf](<#/doc/io/basic_filebuf>) associado.

`other` é deixado sem arquivo associado. Note que a atribuição por movimento da classe base troca todas as variáveis de estado do fluxo (exceto `rdbuf`) entre `*this` e `other`.

### Parâmetros

other  |  \-  |  fluxo de arquivo a ser movido   
  
### Valor de retorno

`*this`

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/io/basic_fstream/swap>)(C++11) |  troca dois fluxos de arquivo   
(função membro pública)  
[ operator=](<#/>)(C++11) |  atribui um objeto `basic_filebuf`   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)  
[ operator=](<#/>)(C++11) |  move-atribui outro `basic_iostream`   
(função membro protegida)