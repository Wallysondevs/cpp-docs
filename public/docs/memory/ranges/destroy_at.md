# std::ranges::destroy_at

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
Assinatura da chamada
template< std::destructible T >
constexpr void destroy_at( T* p ) noexcept;
```

Se `T` não for um tipo array, chama o destrutor do objeto apontado por p, como se fosse `p->~T()`. Caso contrário, destrói recursivamente os elementos de `*p` em ordem, como se chamasse [std::destroy](<#/doc/memory/destroy>)([std::begin](<#/doc/iterator/begin>)(*p), [std::end](<#/doc/iterator/end>)(*p)).

As entidades tipo função descritas nesta página são [_objetos de função de algoritmo_](<#/doc/algorithm/ranges>) (informalmente conhecidas como _niebloids_), ou seja:

  * Listas explícitas de argumentos template não podem ser especificadas ao chamar qualquer uma delas.
  * Nenhuma delas é visível para [argument-dependent lookup](<#/doc/language/adl>).
  * Quando qualquer uma delas é encontrada por [normal unqualified lookup](<#/doc/language/unqualified_lookup>) como o nome à esquerda do operador de chamada de função, [argument-dependent lookup](<#/doc/language/adl>) é inibido.

### Parâmetros

- **p** — um ponteiro para o objeto a ser destruído

### Valor de retorno

(nenhum)

### Possível implementação
```cpp
    struct destroy_at_fn
    {
        template<std::destructible T>
        constexpr void operator()(T *p) const noexcept
        {
            if constexpr (std::is_array_v<T>)
                for (auto &elem : *p)
                    operator()(std::addressof(elem));
            else
                p->~T();
        }
    };
    
    inline constexpr destroy_at_fn destroy_at{};
```

---

### Notas

`destroy_at` deduz o tipo do objeto a ser destruído e, portanto, evita escrevê-lo explicitamente na chamada do destrutor.

Quando `destroy_at` é chamado na avaliação de alguma [expressão constante](<#/doc/language/constant_expression>) `e`, o argumento `p` deve apontar para um objeto cuja vida útil começou dentro da avaliação de `e`.

### Exemplo

O exemplo a seguir demonstra como usar `ranges::destroy_at` para destruir uma sequência contígua de elementos.

Execute este código
```cpp
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
    
        for (int i = 0; i < 8; ++i)
            std::ranges::destroy_at(ptr + i);
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

[ ranges::destroy](<#/doc/memory/ranges/destroy>)(C++20) | destrói um range de objetos
(objeto de função de algoritmo)
[ ranges::destroy_n](<#/doc/memory/ranges/destroy_n>)(C++20) | destrói um número de objetos em um range
(objeto de função de algoritmo)
[ ranges::construct_at](<#/doc/memory/ranges/construct_at>)(C++20) | cria um objeto em um endereço dado
(objeto de função de algoritmo)
[ destroy_at](<#/doc/memory/destroy_at>)(C++17) | destrói um objeto em um endereço dado
(modelo de função)