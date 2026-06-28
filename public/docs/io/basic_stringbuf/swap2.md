# std::swap(std::basic_stringbuf)

Definido no cabeçalho `[<sstream>](<#/doc/header/sstream>)`

```c
template< class CharT, class Traits, class Alloc >
void swap( std::basic_stringbuf<CharT,Traits,Alloc>& lhs,
std::basic_stringbuf<CharT,Traits,Alloc>& rhs );
(até C++20)
template< class CharT, class Traits, class Alloc >
void swap( std::basic_stringbuf<CharT,Traits,Alloc>& lhs,
std::basic_stringbuf<CharT,Traits,Alloc>& rhs )
noexcept(noexcept(lhs.swap(rhs)));
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_stringbuf](<#/doc/io/basic_stringbuf>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — objetos [std::basic_stringbuf](<#/doc/io/basic_stringbuf>) cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/io/basic_stringbuf/swap>)(C++11) | troca dois objetos `basic_stringbuf`
(função membro pública)
[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)