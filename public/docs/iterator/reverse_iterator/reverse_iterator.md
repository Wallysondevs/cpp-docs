# std::reverse_iterator&lt;Iter&gt;::reverse_iterator

reverse_iterator(); | (1) | (constexpr desde C++17)
---|---|---
explicit reverse_iterator( iterator_type x ); | (2) | (constexpr desde C++17)
template< class U >
reverse_iterator( const reverse_iterator&lt;U&gt;& other ); | (3) | (constexpr desde C++17)

Constrói um novo `reverse_iterator`.

Sobrecarga | `[current](<#/doc/iterator/reverse_iterator>)`
---|---
(1) | [inicializado por valor](<#/doc/language/value_initialization>)
(2) | inicializado com x
(3) | inicializado com other.`[current](<#/doc/iterator/reverse_iterator>)`

3) O construtor de conversão. Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_same_v](<#/doc/types/is_same>)<U, Iter> for falso e [std::convertible_to](<#/doc/concepts/convertible_to>)&lt;const U&, Iter&gt; for modelado. | (desde C++20)

### Parâmetros

- **x** — iterator para adaptar
- **other** — adaptador de iterator para copiar

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <concepts>
    #include <iterator>
    #include <vector>
    
    int main()
    {
        std::vector v{0, 1, 2, 3, 4};
    
        using ReverseIt = std::reverse_iterator<std::vector<int>::const_iterator>;
    
        ReverseIt i1; // overload (1)
        i1 = v.crbegin();
        assert(*i1 == 4);
    
        ReverseIt i2(i1); // overload (2)
        assert(i2[0] == 4);
    
        int x[]{1, 2, 3};
        auto i3 = std::reverse_iterator<int*>(x + std::size(x)); // overload (1)
        i3[0] = -3;
        assert(x[2] == -3);
        std::reverse_iterator<int const*> i4(i3); // overload (3): int => const int
        static_assert(std::convertible_to<decltype(i3)::value_type,
                                          decltype(i4)::value_type>);
        // i4[0] = 5; // Error: assignment of read-only location
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 235](<https://cplusplus.github.io/LWG/issue235>) | C++98 | o efeito da sobrecarga ([1](<#/doc/iterator/reverse_iterator/reverse_iterator>)) não foi especificado | especificado
[LWG 1012](<https://cplusplus.github.io/LWG/issue1012>) | C++98 | a sobrecarga ([1](<#/doc/iterator/reverse_iterator/reverse_iterator>)) inicializava por padrão `[current](<#/doc/iterator/reverse_iterator>)` | é inicializado por valor
[LWG 3435](<https://cplusplus.github.io/LWG/issue3435>) | C++20 | a sobrecarga ([3](<#/doc/iterator/reverse_iterator/reverse_iterator>)) não era restrita | restrita

### Veja também

[ operator=](<#/>) | atribui outro adaptador de iterator
(função membro pública)
[ make_reverse_iterator](<#/doc/iterator/make_reverse_iterator>)(C++14) | cria um [std::reverse_iterator](<#/doc/iterator/reverse_iterator>) de tipo inferido a partir do argumento
(template de função)