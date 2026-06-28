# std::swap(std::match_results)

Definido no cabeçalho `[<regex>](<#/doc/header/regex>)`

```c
template< class BidirIt, class Alloc >
void swap( match_results<BidirIt,Alloc>& x1,
match_results<BidirIt,Alloc>& x2 ) noexcept;
```

Especializa o algoritmo [std::swap](<#/doc/utility/swap>) para [std::match_results](<#/doc/regex/match_results>). Troca o conteúdo de x1 com o de x2. Efetivamente chama x1.swap(x2).

### Parâmetros

- **x1, x2** — os objetos match_results cujo conteúdo será trocado
Requisitos de tipo
-`BidirIt` deve satisfazer os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>).
-`Alloc` deve satisfazer os requisitos de [Allocator](<#/doc/named_req/Allocator>).

### Valor de retorno

(nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ swap](<#/doc/regex/match_results/swap>) | troca o conteúdo
(função membro pública)