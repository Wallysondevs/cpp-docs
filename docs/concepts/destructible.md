# std::destructible

Definido no cabeçalho `[<concepts>](<#/doc/header/concepts>)`

```c
template< class T >
concept destructible = std::is_nothrow_destructible_v<T>;
```

O concept `destructible` especifica o concept de todos os tipos cujas instâncias podem ser destruídas com segurança ao final de sua vida útil (incluindo tipos de referência).

### Notas

Ao contrário do requisito nomeado [Destructible](<#/doc/named_req/Destructible>), `std::destructible` exige que o destrutor seja noexcept(true), não meramente não-lançador quando invocado, e permite tipos de referência e tipos de array.

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 18.4.10 Concept `destructible` [concept.destructible]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 18.4.10 Concept `destructible` [concept.destructible]

### Veja também

[ is_destructibleis_trivially_destructibleis_nothrow_destructible](<#/doc/types/is_destructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um destrutor não-deletado
(modelo de classe)