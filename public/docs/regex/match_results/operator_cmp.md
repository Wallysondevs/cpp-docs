Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class BidirIt, class Alloc >
bool operator==( match_results<BidirIt,Alloc>& lhs,
match_results<BidirIt,Alloc>& rhs );
template< class BidirIt, class Alloc >
bool operator!=( match_results<BidirIt,Alloc>& lhs,
match_results<BidirIt,Alloc>& rhs );
(até C++20)
```

Compara dois objetos `match_results`.

Dois `match_results` são iguais se as seguintes condições forem satisfeitas:

*   nenhum dos objetos está _pronto_, _ou_
*   ambos os match results estão _prontos_ e as seguintes condições são satisfeitas:

    *   lhs.empty() e rhs.empty(), _ou_
    *   !lhs.empty() e !rhs.empty() e as seguintes condições são satisfeitas:

        *   lhs.prefix() == rhs.prefix()
        *   lhs.size() == rhs.size() && [std::equal](<#/doc/algorithm/equal>)(lhs.begin(), lhs.end(), rhs.begin())
        *   lhs.suffix() == rhs.suffix()

1) Verifica se lhs e rhs são iguais.

2) Verifica se lhs e rhs não são iguais.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **lhs, rhs** — match results para comparar
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
-`Alloc` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).

### Valor de retorno

1) `true` se lhs e rhs forem iguais, `false` caso contrário.

2) `true` se lhs e rhs não forem iguais, `false` caso contrário.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo