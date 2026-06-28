# std::ranges::destroy_n

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< no-throw-input-iterator I >
requires std::destructible<std::iter_value_t<I>>
constexpr I destroy_n( I first, std::iter_difference_t<I> n ) noexcept;
```

Destrói os n objetos no range começando em first, equivalente a
```
    return std::ranges::destroy(std::counted_iterator(first, n), std::default_sentinel).base();
```

As entidades tipo função descritas nesta página são [_objetos função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidos como _niebloids_), ou seja:

*   Listas explícitas de argumentos de template não podem ser especificadas ao chamar qualquer um deles.
*   Nenhum deles é visível para [pesquisa dependente de argumento](<#/doc/language/adl>).
*   Quando qualquer um deles é encontrado por [pesquisa não qualificada normal](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, a [pesquisa dependente de argumento](<#/doc/language/adl>) é inibida.

### Parâmetros

- **first** — o início do range de elementos a serem destruídos
- **n** — o número de elementos a serem destruídos

### Valor de retorno

O fim do range de objetos que foram destruídos.

### Complexidade

Linear em n.

### Possível implementação
```
    struct destroy_n_fn
    {
        template<no-throw-input-iterator I>
            requires std::destructible<std::iter_value_t<I>>
        constexpr I operator()(I first, std::iter_difference_t<I> n) const noexcept
        {
            for (; n != 0; (void)++first, --n)
                std::ranges::destroy_at(std::addressof(*first));
            return first;
        }
    };
     
    inline constexpr destroy_n_fn destroy_n{};
```

---

### Exemplo

O exemplo a seguir demonstra como usar `ranges::destroy_n` para destruir uma sequência contígua de elementos.

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
     
        std::ranges::destroy_n(ptr, 8);
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

### Veja também

[ ranges::destroy_at](<#/doc/memory/ranges/destroy_at>)(C++20) | destrói um objeto em um endereço fornecido
(objeto função de algoritmo)
[ ranges::destroy](<#/doc/memory/ranges/destroy>)(C++20) | destrói um range de objetos
(objeto função de algoritmo)
[ destroy_n](<#/doc/memory/destroy_n>)(C++17) | destrói um número de objetos em um range
(modelo de função)