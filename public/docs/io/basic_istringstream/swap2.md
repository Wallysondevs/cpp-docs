# std::swap(std::basic_istringstream)

Definido no cabeçalho `[<sstream>](<#/doc/header/sstream>)`

```c
template< class CharT, class Traits, class Alloc >
void swap( std::basic_istringstream<CharT,Traits,Alloc>& lhs,
std::basic_istringstream<CharT,Traits,Alloc>& rhs );
```

Sobrecarga do algoritmo [std::swap](<#/doc/utility/swap>) para [std::basic_istringstream](<#/doc/io/basic_istringstream>). Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — streams cujo estado deve ser trocado

### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/io/basic_istringstream/swap>)(C++11) | troca dois string streams
(função membro pública)