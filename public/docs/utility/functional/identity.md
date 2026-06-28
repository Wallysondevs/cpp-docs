# std::identity

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
struct identity;
```

`std::identity` é um tipo de objeto de função cujo operator() retorna seu argumento inalterado.

### Tipos Membro

Tipo | Definição
---|---
`is_transparent` | [não especificado](<#/doc/utility/functional>)

### Funções Membro

** operator()** | retorna o argumento inalterado
(função membro pública)

## std::identity::operator()

template< class T >
constexpr T&& operator()( T&& t ) const noexcept;

Retorna [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t).

### Parâmetros

- **t** — argumento a ser retornado

### Valor de Retorno

[std::forward](<#/doc/utility/forward>)&lt;T&gt;(t).

### Notas

`std::identity` serve como a projeção padrão em [algoritmos restritos](<#/doc/algorithm/ranges>). Seu uso direto geralmente não é necessário.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <functional>
    #include <iostream>
    #include <ranges>
    #include <string>
    
    struct Pair
    {
        int n;
        std::string s;
        friend std::ostream& operator<<(std::ostream& os, const Pair& p)
        {
            return os << '{' << p.n << ", " << p.s << '}';
        }
    };
    
    // Um "range-printer" que pode imprimir elementos projetados (modificados) de um range.
    template<std::ranges::input_range R,
             typename Projection = std::identity> //<- Observe a projeção padrão
    void print(std::string_view const rem, R&& range, Projection projection = {})
    {
        std::cout << rem << '{';
        std::ranges::for_each(
            range,
            O = 0 mutable { std::cout << (O++ ? ", " : "") << o; },
            projection
        );
        std::cout << "}\n";
    }
    
    int main()
    {
        const auto v = {Pair{1, "one"}, {2, "two"}, {3, "three"}};
    
        print("Imprimir usando std::identity como projeção: ", v);
        print("Projetar Pair::n: ", v, &Pair::n);
        print("Projetar Pair::s: ", v, &Pair::s);
        print("Imprimir usando closure personalizada como projeção: ", v,
             { return std::to_string(p.n) + ':' + p.s; });
    }
```

Saída:
```
    Print using std::identity as a projection: {{1, one}, {2, two}, {3, three}}
    Project the Pair::n: {1, 2, 3}
    Project the Pair::s: {one, two, three}
    Print using custom closure as a projection: {1:one, 2:two, 3:three}
```

### Veja também

[ type_identity](<#/doc/types/type_identity>)(C++20) | retorna o argumento de tipo inalterado
(modelo de classe)