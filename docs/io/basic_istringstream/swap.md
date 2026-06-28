# std::basic_istringstream::swap

```cpp
void swap( basic_istringstream& other );  // (desde C++11)
```

  
Troca o estado do stream com o de `other`.

Isso é feito chamando basic_istream<CharT, Traits>::swap(other) e rdbuf()->swap(*other.rdbuf()).

### Parâmetros

other  |  \-  |  stream para trocar o estado   
  
### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ operator=](<#/>)(C++11) |  move o string stream   
(função membro pública)  
[ swap](<#/doc/io/basic_stringbuf/swap>)(C++11) |  troca dois objetos `basic_stringbuf`   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)