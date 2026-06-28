# std::basic_istringstream::operator=

```cpp
basic_istringstream& operator=( basic_istringstream&& other );  // (desde C++11)
```

  
Atribui por movimento o stream de string `other` para `*this`, efetivamente atribuindo por movimento tanto a classe base [std::basic_istream](<#/doc/io/basic_istream>) quanto o [std::basic_stringbuf](<#/doc/io/basic_stringbuf>) associado.

Note que a atribuição por movimento da classe base troca todas as variáveis de estado do stream (exceto `rdbuf`) entre `*this` e `other`.

### Parâmetros

other  |  \-  |  stream de string para mover de   
  
### Valor de retorno

`*this`

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/io/basic_istringstream/swap>)(C++11) |  troca dois streams de string   
(função membro pública)  
[ operator=](<#/>)(C++11) |  atribui um objeto `basic_stringbuf`   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ operator=](<#/>)(C++11) |  atribui por movimento de outro `basic_istream`   
(função membro protegida)