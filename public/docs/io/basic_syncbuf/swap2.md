# std::swap(std::basic_syncbuf)

```cpp
template< class CharT, class Traits, class Allocator >
void swap( std::basic_syncbuf<CharT, Traits, Allocator>& lhs,
std::basic_syncbuf<CharT, Traits, Allocator>& rhs );  // (desde C++20)
```

  
Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para std::basic_syncbuf. Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs). 

### Parâmetros

lhs, rhs  |  \-  |  objetos std::basic_syncbuf cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ swap](<#/doc/io/basic_syncbuf/swap>) |  troca dois objetos `basic_syncbuf`   
(função membro pública)  
[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(modelo de função)