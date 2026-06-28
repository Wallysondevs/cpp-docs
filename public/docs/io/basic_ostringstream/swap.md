# std::basic_ostringstream::swap

```cpp
void swap( basic_ostringstream& other );  // (desde C++11)
```

  
Troca o estado do stream com o de `other`.

Isso é feito chamando basic_ostream<CharT, Traits>::swap(other) e rdbuf()->swap(*other.rdbuf()).

### Parâmetros

other  |  \-  |  stream para trocar o estado com   
  
### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator=](<#/>)(C++11) |  move o string stream   
(função membro pública)  
[ swap](<#/doc/io/basic_stringbuf/swap>)(C++11) |  troca dois objetos `basic_stringbuf`   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)