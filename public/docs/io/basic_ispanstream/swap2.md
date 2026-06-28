# std::swap(std::basic_ispanstream)

Definido no cabeçalho `[<spanstream>](<#/doc/header/spanstream>)`

```c
template< class CharT, class Traits >
void swap( std::basic_ispanstream<CharT, Traits>& lhs,
std::basic_ispanstream<CharT, Traits>& rhs );
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para std::basic_ispanstream. Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — streams cujo estado será trocado

### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ swap](<#/doc/io/basic_ispanstream/swap>) | troca dois objetos `basic_ispanstream`
(função membro pública)