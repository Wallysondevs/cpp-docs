# std::destroy_at

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
void destroy_at( T* p );
(até C++20)
template< class T >
constexpr void destroy_at( T* p );
```

Se `T` não for um tipo array, chama o destrutor do objeto apontado por p, como se fosse p->~T().

Se `T` for um tipo array, o programa é malformado (até C++20) destrói recursivamente os elementos de *p em ordem, como se chamasse [std::destroy](<#/doc/memory/destroy>)([std::begin](<#/doc/iterator/begin>)(*p), [std::end](<#/doc/iterator/end>)(*p)) (desde C++20).

### Parâmetros

- **p** — um ponteiro para o objeto a ser destruído

### Valor de retorno

(nenhum)

### Possível implementação
```cpp
    template<class T>
    constexpr void destroy_at(T* p) 
    {
        if constexpr (std::is_array_v<T>)
            for (auto &elem : *p)
                (destroy_at)(std::addressof(elem));
        else
            p->~T(); 
    }
    // C++17 version:
    // template<class T> void destroy_at(T* p) { p->~T(); }
```

---

### Observações

`destroy_at` deduz o tipo do objeto a ser destruído e, portanto, evita escrevê-lo explicitamente na chamada do destrutor.

Quando `destroy_at` é chamado na avaliação de alguma [expressão constante](<#/doc/language/constant_expression>) e, o argumento p deve apontar para um objeto cuja vida útil começou dentro da avaliação de e. | (desde C++20)

### Exemplo

O exemplo a seguir demonstra como usar `destroy_at` para destruir uma sequência contígua de elementos.

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
            std::destroy_at(ptr + i);
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

[ destroy](<#/doc/memory/destroy>)(C++17) | destrói um range de objetos
(modelo de função)
[ destroy_n](<#/doc/memory/destroy_n>)(C++17) | destrói um número de objetos em um range
(modelo de função)
[ construct_at](<#/doc/memory/construct_at>)(C++20) | cria um objeto em um endereço dado
(modelo de função)
[ ranges::destroy_at](<#/doc/memory/ranges/destroy_at>)(C++20) | destrói um objeto em um endereço dado
(objeto de função de algoritmo)