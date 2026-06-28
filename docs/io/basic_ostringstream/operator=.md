# std::basic_ostringstream::operator=

```cpp
basic_ostringstream& operator=( basic_ostringstream&& other );  // (desde C++11)
```

  
Atribui por movimento o string stream `other` a `*this`, efetivamente atribuindo por movimento tanto a classe base [std::basic_ostream](<#/doc/io/basic_ostream>) quanto o [std::basic_stringbuf](<#/doc/io/basic_stringbuf>) associado.

Note que a atribuição por movimento da classe base troca todas as variáveis de estado do stream (exceto `rdbuf`) entre `*this` e `other`.

### Parâmetros

other  |  \-  |  string stream para mover de   
  
### Valor de retorno

`*this`

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/io/basic_ostringstream/swap>)(C++11) |  troca dois string streams   
(função membro pública)  
[ operator=](<#/>)(C++11) |  atribui um objeto `basic_stringbuf`   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ operator=](<#/>)(C++11) |  atribui por movimento de outro `basic_ostream`   
(função membro protegida)