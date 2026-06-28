# std::basic_ospanstream&lt;CharT,Traits&gt;::swap

```cpp
void swap( basic_ospanstream& other );  // (desde C++23)
```

  
Troca o estado do stream com o de `other`.

Isso é feito chamando [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>::swap(other) e trocando os objetos std::basic_spanbuf encapsulados (acessíveis através de *rdbuf()).

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

[ swap](<#/doc/io/basic_spanbuf/swap>) |  troca dois objetos `basic_spanbuf`   
(função membro pública de `std::basic_spanbuf<CharT,Traits>`)  