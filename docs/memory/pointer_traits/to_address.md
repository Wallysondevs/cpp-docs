# std::pointer_traits&lt;Ptr&gt;::to_address

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
static element_type* to_address( pointer p ) noexcept;
(membro opcional de especialização definida pelo programa)
```

Constrói um ponteiro bruto que referencia o mesmo objeto que seu argumento tipo-ponteiro (["fancy pointer"](<#/doc/named_req/Allocator>)).

Esta função, se definida, é o inverso de [`pointer_to`](<#/doc/memory/pointer_traits/pointer_to>), e existe como o ponto de customização a ser chamado por [`std::to_address`](<#/doc/memory/to_address>).

### Parâmetros

- **p** — fancy pointer/objeto tipo-ponteiro

### Valor de retorno

Um ponteiro bruto do tipo element_type* que referencia a mesma localização de memória que o argumento p.

### Veja também

[ pointer_to](<#/doc/memory/pointer_traits/pointer_to>)[static] | obtém um ponteiro desreferenciável para seu argumento
(função membro estática pública)
[ to_address](<#/doc/memory/to_address>)(C++20) | obtém um ponteiro bruto de um tipo tipo-ponteiro
(modelo de função)