# std::swap(std::basic_spanbuf)

Definido no cabeçalho `[<spanstream>](<#/doc/header/spanstream>)`

```c
template< class CharT, class Traits >
void swap( std::basic_spanbuf<CharT, Traits>& lhs,
std::basic_spanbuf<CharT, Traits>& rhs );
```

Sobrecarga do algoritmo [std::swap](<#/doc/utility/swap>) para std::basic_spanbuf. Troca o estado de lhs com o de rhs. Equivalente a lhs.swap(rhs);.

### Parâmetros

- **lhs, rhs** — objetos std::basic_spanbuf cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Motivo: nenhum exemplo

### Veja também

[ swap](<#/doc/io/basic_spanbuf/swap>) | troca dois objetos `basic_spanbuf`
(função membro pública)
[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(modelo de função)