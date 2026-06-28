# std::ranges::destroy

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-input-iterator I, no-throw-sentinel-for<I> S >
requires std::destructible<std::iter_value_t<I>>
constexpr I destroy( I first, S last ) noexcept;
template< no-throw-input-range R >
requires std::destructible<ranges::range_value_t<R>>
constexpr ranges::borrowed_iterator_t<R> destroy( R&& r ) noexcept;
```

1) Destrói os objetos no range `[`first`, `last`)`, como se por
```
    for (; first != last; ++first)
        std::ranges::destroy_at(std::addressof(*first));
    return first;
```

2) O mesmo que (1), mas usa r como o range de origem, como se usasse [ranges::begin](<#/doc/ranges/begin>)(r) como first e [ranges::end](<#/doc/ranges/end>)(r) como last.

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

  * Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
  * Nenhum deles é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer um deles é encontrado por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **first, last** — par de iterator-sentinel denotando o range de elementos a serem destruídos
- **r** — o range a ser destruído

### Valor de retorno

Um iterator que se compara igual a last.

### Complexidade

Linear na distância entre first e last.

### Possível implementação
```
    struct destroy_fn
    {
        template<no-throw-input-iterator I, no-throw-sentinel-for<I> S>
            requires std::destructible<std::iter_value_t<I>>
        constexpr I operator()(I first, S last) const noexcept
        {
            for (; first != last; ++first)
                std::ranges::destroy_at(std::addressof(*first));
            return first;
        }
    
        template<no-throw-input-range R>
            requires std::destructible<std::ranges::range_value_t<R>>
        constexpr std::ranges::borrowed_iterator_t<R> operator()(R&& r) const noexcept
        {
            return operator()(std::ranges::begin(r), std::ranges::end(r));
        }
    };
    
    inline constexpr destroy_fn destroy{};
```

---

### Exemplo

O exemplo a seguir demonstra como usar `ranges::destroy` para destruir uma sequência contígua de elementos.

Execute este código
```
    #include <iostream>
    #include <memory>
    #include <new>
    
    struct Tracer
    {
        int value;
        ~Tracer() { std::cout << value << " destructed\n"; }
    };
    
    int main()
    {
        alignas(Tracer) unsigned char buffer[sizeof(Tracer) * 8];
    
        for (int i = 0; i < 8; ++i)
            new(buffer + sizeof(Tracer) * i) Tracer{i}; //manually construct objects
    
        auto ptr = std::launder(reinterpret_cast<Tracer*>(buffer));
    
        std::ranges::destroy(ptr, ptr + 8);
    }
```

Saída:
```
    0 destructed
    1 destructed
    2 destructed
    3 destructed
    4 destructed
    5 destructed
    6 destructed
    7 destructed
```

### Ver também

[ ranges::destroy_n](<#/doc/memory/ranges/destroy_n>)(C++20) | destrói um número de objetos em um range
(objeto de função de algoritmo)
[ ranges::destroy_at](<#/doc/memory/ranges/destroy_at>)(C++20) | destrói um objeto em um endereço dado
(objeto de função de algoritmo)
[ destroy](<#/doc/memory/destroy>)(C++17) | destrói um range de objetos
(modelo de função)