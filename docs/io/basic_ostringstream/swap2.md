# std::swap(std::basic_ostringstream)

Definido no cabeçalho `[<sstream>](<#/doc/header/sstream>)`

```c
template< class CharT, class Traits, class Alloc >
void swap( std::basic_ostringstream<CharT,Traits,Alloc>& lhs,
std::basic_ostringstream<CharT,Traits,Alloc>& rhs );
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_ostringstream](<#/doc/io/basic_ostringstream>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — streams cujo estado será trocado

### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Ver também

[ swap](<#/doc/io/basic_ostringstream/swap>)(C++11) | troca dois string streams
(função membro pública)