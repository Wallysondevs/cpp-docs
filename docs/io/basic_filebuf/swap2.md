# std::swap(std::basic_filebuf)

```cpp
template< class CharT, class Traits >
void swap( std::basic_filebuf<CharT,Traits>& lhs,
std::basic_filebuf<CharT,Traits>& rhs );  // (desde C++11)
```

  
Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_filebuf](<#/doc/io/basic_filebuf>). Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  objetos [std::basic_filebuf](<#/doc/io/basic_filebuf>) cujos estados devem ser trocados   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ swap](<#/doc/io/basic_filebuf/swap>)(C++11) |  troca dois objetos `basic_filebuf`   
(função membro pública)  
[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(modelo de função)