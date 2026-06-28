# std::swap(std::basic_regex)

```cpp
template< class CharT, class Traits >
void swap( basic_regex<CharT, Traits>& lhs, basic_regex<CharT, Traits>& rhs ) noexcept;  // (desde C++11)
```

  
Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_regex](<#/doc/regex/basic_regex>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs). 

### Parâmetros

lhs, rhs  |  \-  |  expressões regulares a serem trocadas   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ swap](<#/doc/regex/basic_regex/swap>) |  troca o conteúdo   
(função membro pública)  