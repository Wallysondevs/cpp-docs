# std::swap(std::basic_ospanstream)

Definido no cabeçalho `[<spanstream>](<#/doc/header/spanstream>)`

```c
template< class CharT, class Traits >
void swap( std::basic_ospanstream<CharT, Traits>& lhs,
std::basic_ospanstream<CharT, Traits>& rhs );
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para std::basic_ospanstream. Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

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

[ swap](<#/doc/io/basic_ospanstream/swap>) | troca dois objetos `basic_ospanstream`
(função membro pública)