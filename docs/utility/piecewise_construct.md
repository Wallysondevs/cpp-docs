# std::piecewise_construct, std::piecewise_construct_t

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
struct piecewise_construct_t { explicit piecewise_construct_t() = default; };
constexpr std::piecewise_construct_t piecewise_construct{};
(inline desde C++17)
```

1) `std::piecewise_construct_t` é um tipo de tag de classe vazia usado para desambiguar entre diferentes funções que recebem dois argumentos tuple.

2) A constante `std::piecewise_construct` é uma instância de (1).

As sobrecargas que não usam `std::piecewise_construct_t` assumem que cada argumento tuple se torna o elemento de um par. As sobrecargas que usam `std::piecewise_construct_t` assumem que cada argumento tuple é usado para construir, em partes, um novo objeto do tipo especificado, que se tornará o elemento do par.

### Biblioteca padrão

Os seguintes tipos e funções da biblioteca padrão o utilizam como uma tag de desambiguação:

[ pair](<#/doc/utility/pair>) | implementa uma tuple binária, ou seja, um par de valores
(modelo de classe)
[ uses_allocator_construction_args](<#/doc/memory/uses_allocator_construction_args>)(C++20) | prepara a lista de argumentos que corresponde ao tipo de construção uses-allocator exigido pelo tipo fornecido
(modelo de função)
[ ranges::repeat_viewviews::repeat](<#/doc/ranges/repeat_view>)(C++23) | uma [`view`](<#/doc/ranges/view>) que consiste em uma sequência gerada pela produção repetida do mesmo valor
(modelo de classe) (objeto de ponto de customização)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <tuple>
    #include <utility>
    
    struct Foo
    {
        Foo(std::tuple<int, float>)
        {
            std::cout << "Constructed a Foo from a tuple\n";
        }
    
        Foo(int, float)
        {
            std::cout << "Constructed a Foo from an int and a float\n";
        }
    };
    
    int main()
    {
        std::tuple<int, float> t(1, 3.14);
    
        std::cout << "Creating p1...\n";
        std::pair<Foo, Foo> p1(t, t);
    
        std::cout << "Creating p2...\n";
        std::pair<Foo, Foo> p2(std::piecewise_construct, t, t);
    }
```

Saída:
```
    Creating p1...
    Constructed a Foo from a tuple
    Constructed a Foo from a tuple
    Creating p2...
    Constructed a Foo from an int and a float
    Constructed a Foo from an int and a float
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2510](<https://cplusplus.github.io/LWG/issue2510>) | C++11 | o construtor padrão não era explícito, o que poderia levar à ambiguidade | tornado explícito

### Veja também

[ (constructor)](<#/doc/utility/pair/pair>) | constrói um novo par
(função membro pública de `std::pair<T1,T2>`)