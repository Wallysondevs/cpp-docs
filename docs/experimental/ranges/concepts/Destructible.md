# std::experimental::ranges::Destructible

Definido no cabeçalho `[<experimental/ranges/concepts>](<#/doc/header/experimental/ranges/concepts>)`

```c
template< class T >
concept bool Destructible = std::is_nothrow_destructible<T>::value;
```

  
O concept `Destructible` especifica o concept de todos os tipos cujas instâncias podem ser destruídas com segurança ao final de sua vida útil (incluindo tipos de referência).

Não é necessário que haja qualquer relação de subsunção entre `Destructible<T>` e [std::is_nothrow_destructible](<#/doc/types/is_destructible>)&lt;T&gt;::value.

### Notas

Ao contrário do requisito nomeado [Destructible](<#/doc/named_req/Destructible>) no padrão C++ principal, `Destructible` exige que o destrutor seja `noexcept(true)`, não meramente não-lançador quando invocado, e permite tipos de referência e tipos de array.

### Veja também

[ is_destructibleis_trivially_destructibleis_nothrow_destructible](<#/doc/types/is_destructible>)(C++11)(C++11)(C++11) |  verifica se um tipo possui um destrutor não-deletado   
(modelo de classe)  