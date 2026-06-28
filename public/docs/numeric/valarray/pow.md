# std::pow(std::valarray)

Definido no cabeçalho `[<valarray>](<#/doc/header/valarray>)`

```c
template< class T >
std::valarray<T> pow( const std::valarray<T>& base, const std::valarray<T>& exp );
template< class T >
std::valarray<T> pow( const std::valarray<T>& base,
const typename std::valarray<T>::value_type& vexp );
template< class T >
std::valarray<T> pow( const typename std::valarray<T>::value_type& vbase,
const std::valarray<T>& exp );
```

Eleva um valor a uma potência.

1) Calcula os valores de cada elemento no array numérico `base` elevado à potência especificada pelo elemento correspondente do array numérico `exp`.

O comportamento é indefinido se `base.size() != exp.size()`.

2) Calcula os valores de cada elemento no array numérico `base` elevado à potência `vexp`.

3) Calcula os valores de `vbase` elevado à potência definida pelos elementos no array numérico `exp`.

### Parâmetros

base | \- | array numérico contendo os valores da base
---|---|---
exp | \- | array numérico contendo os valores do expoente
vbase | \- | um valor que define a base
vexp | \- | um valor que define o expoente

### Valor de retorno

Um array numérico contendo os resultados da exponenciação.

### Notas

A função não qualificada (`pow`) é usada para realizar o cálculo. Se tal função não estiver disponível, `std::pow` é usada devido à [argument-dependent lookup](<#/doc/language/adl>).

A função pode ser implementada com um tipo de retorno diferente de `[std::valarray](<#/doc/numeric/valarray>)`. Neste caso, o tipo de substituição possui as seguintes propriedades:

*   Todas as funções membro `const` de `[std::valarray](<#/doc/numeric/valarray>)` são fornecidas.
*   `[std::valarray](<#/doc/numeric/valarray>)`, `[std::slice_array](<#/doc/numeric/valarray/slice_array>)`, `[std::gslice_array](<#/doc/numeric/valarray/gslice_array>)`, `[std::mask_array](<#/doc/numeric/valarray/mask_array>)` e `[std::indirect_array](<#/doc/numeric/valarray/indirect_array>)` podem ser construídos a partir do tipo de substituição.
*   Para cada função que recebe um `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, exceto [`begin()`](<#/doc/numeric/valarray/begin2>) e [`end()`](<#/doc/numeric/valarray/end2>) (desde C++11), funções idênticas que recebem os tipos de substituição devem ser adicionadas;
*   Para cada função que recebe dois argumentos `const [std::valarray](<#/doc/numeric/valarray>)<T>&`, funções idênticas que recebem cada combinação de `const [std::valarray](<#/doc/numeric/valarray>)<T>&` e tipos de substituição devem ser adicionadas.
*   O tipo de retorno não adiciona mais de dois níveis de aninhamento de template sobre o tipo de argumento mais profundamente aninhado.

### Exemplo

Execute este código
```cpp
    #include <cmath>
    #include <cstddef>
    #include <iomanip>
    #include <iostream>
    #include <valarray>
     
    class show
    {
        friend std::ostream& operator<<(std::ostream& os, show const& r)
        {
            constexpr char const* sup[]
            {
                "\u2070", "\u00B9", "\u00B2", "\u00B3", "\u2074",
                "\u2075", "\u2076", "\u2077", "\u2078", "\u2079"
            };
     
            for (std::size_t n = 0; n != r.bases.size(); ++n)
            {
                os << std::left << r.bases[n] << std::left;
                if (n < r.exponents.size())
                    os << sup[r.exponents[n] % 10] << ' ';
                else
                    os << "  ";
            }
     
            if (r.results.size() != 0)
            {
                os << '=';
                for (std::size_t n = 0; n != r.results.size(); ++n)
                    os << ' ' << r.results[n];
            }
     
            return os << '\n';
        }
     
    public:
        std::valarray<int> bases{}, exponents{}, results{};
    };
     
    int main()
    {
        constexpr int base{2};
        constexpr int exponent{5};
        const std::valarray<int> bases{1, 2, 3, 4, 5, 6, 7};
        const std::valarray<int> exponents{0, 1, 2, 3, 4, 5, 6};
        const std::valarray<int> powers1 = std::pow(bases, exponents);
        const std::valarray<int> powers2 = std::pow(bases, exponent);
        const std::valarray<int> powers3 = std::pow(base, exponents);
     
        std::cout
            << "pow(const std::valarray<T>& base, const std::valarray<T>& exp); (1)\n"
            << "base : " << show{bases}
            << "exp  : " << show{exponents}
            << "pow  : " << show{bases, exponents, powers1}
            << '\n'
            << "pow(const std::valarray<T>& base, const value_type& vexp); (2)\n"
            << "base : " << show{bases}
            << "vexp : " << exponent << '\n'
            << "pow  : " << show{bases, std::valarray<int>(exponent, bases.size()), powers2}
            << '\n'
            << "pow(const value_type& vbase, const std::valarray<T>& exp); (3)\n"
            << "vbase: " << base << '\n'
            << "exp  : " << show{exponents}
            << "pow  : " << show{std::valarray<int>(base, bases.size()), exponents, powers3};
    }
```

Saída:
```
    pow(const std::valarray<T>& base, const std::valarray<T>& exp); (1)
    base : 1  2  3  4  5  6  7
    exp  : 0  1  2  3  4  5  6
    pow  : 1⁰ 2¹ 3² 4³ 5⁴ 6⁵ 7⁶ = 1 2 9 64 625 7776 117649
     
    pow(const std::valarray<T>& base, const value_type& vexp); (2)
    base : 1  2  3  4  5  6  7
    vexp : 5
    pow  : 1⁵ 2⁵ 3⁵ 4⁵ 5⁵ 6⁵ 7⁵ = 1 32 243 1024 3125 7776 16807
     
    pow(const value_type& vbase, const std::valarray<T>& exp); (3)
    vbase: 2
    exp  : 0  1  2  3  4  5  6
    pow  : 2⁰ 2¹ 2² 2³ 2⁴ 2⁵ 2⁶ = 1 2 4 8 16 32 64
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3074](<https://cplusplus.github.io/LWG/issue3074>) | C++98 | `T` é deduzido tanto do escalar quanto do `valarray` para (2,3), impedindo chamadas de tipos mistos | apenas deduzir `T` do `valarray`

### Veja também

[ sqrt(std::valarray)](<#/doc/numeric/valarray/sqrt>) | aplica a função `[std::sqrt](<#/doc/numeric/math/sqrt>)` a cada elemento de valarray
(modelo de função)
[ powpowfpowl](<#/doc/numeric/math/pow>)(C++11)(C++11) | eleva um número à potência dada (\\(\small{x^y}\\)xy)
(função)
[ pow(std::complex)](<#/doc/numeric/complex/pow>) | potência complexa, um ou ambos os argumentos podem ser um número complexo
(modelo de função)