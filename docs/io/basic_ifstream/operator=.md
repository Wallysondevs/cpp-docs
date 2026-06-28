# std::basic_ifstream&lt;CharT,Traits&gt;::operator=

```cpp
basic_ifstream& operator=( basic_ifstream&& other );  // (desde C++11)
```

  
Atribui por movimento o fluxo de arquivo `other` para `*this`, efetivamente atribuindo por movimento tanto a classe base [std::basic_istream](<#/doc/io/basic_istream>) quanto o [std::basic_filebuf](<#/doc/io/basic_filebuf>) associado.

`other` é deixado sem nenhum arquivo associado. Note que a atribuição por movimento da classe base troca todas as variáveis de estado do fluxo (exceto por `rdbuf`) entre `*this` e `other`.

### Parâmetros

other  |  \-  |  fluxo de arquivo a ser movido   
  
### Valor de retorno

`*this`

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/io/basic_ifstream/swap>)(desde C++11) |  troca dois fluxos de arquivo   
(função membro pública)  
[ operator=](<#/>)(desde C++11) |  atribui um objeto `basic_filebuf`   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)  
[ operator=](<#/>)(desde C++11) |  atribui por movimento de outro `basic_istream`   
(função membro protegida)