# std::basic_spanbuf&lt;CharT,Traits&gt;::swap

```cpp
void swap( basic_spanbuf& rhs );  // (desde C++23)
```

  
Troca o estado de *this e rhs.

Chama [std::basic_streambuf](<#/doc/io/basic_streambuf>)<Char, Traits>::swap(rhs), troca o modo de abertura de *this e rhs, e então faz com que eles usem o buffer subjacente um do outro.

### Parâmetros

rhs  |  \-  |  outro(a) `basic_stringbuf`  
  
### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Observações

Esta função é chamada automaticamente ao trocar objetos de stream, raramente é necessário chamá-la diretamente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator=](<#/>) |  atribui um objeto `basic_spanbuf`   
(função membro pública)  
[ swap](<#/doc/io/basic_ispanstream/swap>) |  troca dois objetos `basic_ispanstream`   
(função membro pública de `std::basic_ispanstream<CharT,Traits>`)  
[ swap](<#/doc/io/basic_ospanstream/swap>) |  troca dois objetos `basic_ospanstream`   
(função membro pública de `std::basic_ospanstream<CharT,Traits>`)  
[ swap](<#/doc/io/basic_spanstream/swap>) |  troca dois objetos `basic_spanstream`   
(função membro pública de `std::basic_spanstream<CharT,Traits>`)